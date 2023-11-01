import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert, // Importe o componente Alert
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesCPF } from './styles/stylesCPF';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validate, format } from 'cpf-check';
import { api } from '../service/AlarmesService';

export const Cpf = () => {
  const { navigate } = useNavigation();
  const [cpf, setCpf] = useState('');

  const handleNextPage = async () => {
    if (validate(cpf)) {
      Alert.alert(
        'Atenção',
        `O CPF ${format(cpf)} está correto?`,
        [
          {
            text: 'Corrigir',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                const response = await api.get(`/usuarios/${cpf}`);
                await AsyncStorage.setItem('CPF', cpf);
    
                if (response.status === 200) {
                  if (response.data && response.data.length > 0) {
                    // Há este CPF
                    await AsyncStorage.setItem('CPF', cpf);
                    console.log(`CPF (${format(cpf)}) já existe no BD!`);
                    navigate('Alarmes');
                  } else {
                    await AsyncStorage.setItem('CPF', cpf);
                    console.log(`CPF (${format(cpf)}) não existe no BD.`);
                    navigate('Cep');
                  }
                } else {
                  await AsyncStorage.setItem('CPF', cpf);
                  console.log(`CPF (${format(cpf)}) salvo no BD com sucesso!`);
                  navigate('Cep');
                }
              } catch (error) {
                console.error('Erro ao verificar o CPF no BD:', error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('CPF Inválido', 'Por favor, insira um CPF válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>Qual é o seu CPF?</Text>
        <View style={stylesCPF.form}>
          <TextInput
            style={stylesCPF.input}
            value={cpf}
            onChangeText={(text) => setCpf(text)}
            placeholder="999.999.999-99"
            placeholderTextColor="#000"
            textAlign="center"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.areaButton}>
          <TouchableOpacity style={styles.button} onPress={handleNextPage}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
