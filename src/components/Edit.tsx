import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { sharedStylesForms } from './styles/sharedStylesForms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/AlarmesService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

export const Edit = () => {
  const { navigate } = useNavigation();
  const [cep, setCep] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cpf = await AsyncStorage.getItem('CPF');
        console.log('Consultando o CPF para edição: ', cpf);
        const response = await api.get(`/usuarios/${cpf}`);

        if (response.status === 200) {
          const userData = response.data[0];

          console.log("Seus dados são: ", userData.user_cep, ' e ', new Date(userData.user_dtnascimento).toISOString().split('T')[0])
          setCep(userData.user_cep);
          setBirthDate(new Date(userData.user_dtnascimento));

        } else {
          console.log('Usuário não encontrado ou erro na solicitação à API.');
          setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error('Erro ao conectar com a base de dados:', error);
        setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
      }
    };

    loadData();
  }, []);

  const handleSaveData = async () => {
    try {
      const cpf = await AsyncStorage.getItem('CPF');

      const updatedData = {
        user_cep: cep,
        user_dtnascimento: birthDate.toISOString().split('T')[0],
      };
      
      const response = await api.put(`/usuarios/${cpf}`, updatedData);

      if (response.status === 204) {
        await AsyncStorage.setItem('user_cep', cep);
        await AsyncStorage.setItem('user_dtnascimento', birthDate.toISOString());

        console.log('Dados alterados com sucesso.');
        Alert.alert('Dados alterados com sucesso.', 'Seus novos dados foram gravados.')
        navigate('Alarmes');
      } else {
        console.log('Erro ao salvar os dados na API.');
      }
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      {errorMessage && (
          <View style={styles.error}>
            <MaterialIcons name="error" size={24} color="#f00" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
          Estes são seus dados pessoais:
        </Text>

        <View style={sharedStylesForms.form}>
            <View style={sharedStylesForms.fieldset}>            
                <Text>CEP: </Text>
                <TextInput
                style={sharedStylesForms.input}
                value={cep}
                onChangeText={(text) => setCep(text)}
                placeholder="CEP"
                placeholderTextColor="#000"
                keyboardType="numeric"
                />
            </View>
            <View style={sharedStylesForms.fieldset}>
                <Text>Data de Nascimento: </Text>
                {Platform.OS === 'ios' ? (
                        <DateTimePicker
                        value={birthDate}
                        mode="date"
                        display="spinner"
                        textColor={'#000'}
                        onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            setBirthDate(selectedDate);
                        }
                        }}
                        />
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => {showDatepicker()}}>
                                <TextInput
                                style={sharedStylesForms.input}
                                value={birthDate.toLocaleDateString('pt-BR')}
                                placeholder="00/00/0000"
                                placeholderTextColor="#000"
                                editable={false}
                                />
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={birthDate}
                                    mode="date"
                                    display="spinner"
                                    onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setBirthDate(selectedDate);
                                    }
                                    setShowDatePicker(false);
                                    }}
                                />
                            )}
                        </>
                    )
                }
            </View>
        </View>
        <View style={styles.areaButton}>
          <TouchableOpacity style={styles.button} onPress={handleSaveData}>
            <Text style={styles.buttonText}>Salvar Dados</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};