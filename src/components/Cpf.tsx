import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert, 
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { sharedStylesForms } from './styles/sharedStylesForms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validate, format } from 'cpf-check';
import { api } from '../service/AlarmesService';
import * as Location from 'expo-location';

export const Cpf = () => {
  const { navigate } = useNavigation();
  const [cpf, setCpf] = useState(null);
  const [cep, setCep] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
 
  useEffect(() =>{
    (async () =>{
      let {status} = await Location.requestForegroundPermissionsAsync();

      const cepGeolocalizacao = await AsyncStorage.getItem('CEP')
      if(status !== 'granted' &&  (!cepGeolocalizacao || cepGeolocalizacao === '' || cepGeolocalizacao === null)) {
       
        Alert.alert(
          'Alarmed necessita acessar sua localização',
          'Clique em permitir para prosseguir.',
          [
            { text: 'Prosseguir', onPress: async() => {
             await Location.requestForegroundPermissionsAsync();
              } 
            },
          ],
        );
        return;
      } 
        let local = await Location.getCurrentPositionAsync({})
        
        const keys = {
          latitude: local.coords.latitude,
          longitude: local.coords.longitude
        };
        try {
          const resultado = await Location.reverseGeocodeAsync(keys);
        
          
          setCep(resultado[0].postalCode);
          
        } catch (error) {
          console.error('Erro ao fazer reverse geocode:', error);
          setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
        }
    })()
  },[])

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
                const response = await api.get(`usuarios/${cpf}`);
   
                const cpfData = response.data.cpf
                const cepData = response.data.user_cep

                console.log(cpfData, cepData)
   
                await AsyncStorage.setItem('CEP', cep);

                if (response.status === 200) {
                  if (response.data && response.data.length > 0) {
                    // Há este CPF
                    await AsyncStorage.setItem('CPF', cpf);

                    console.log(`CPF (${format(cpf)}) já existe no BD!`);
                    navigate('Alarmes');
                  } else {
                    await AsyncStorage.setItem('CPF', cpf);
                    console.log(`CPF (${format(cpf)}) não existe no BD.`);
                    navigate('DtNasc');
                  }
                } else {
                  await AsyncStorage.setItem('CPF', cpf);
                  
                  console.log(`CPF (${format(cpf)}) salvo no BD com sucesso!`);
                  navigate('DtNasc');
                }
              } catch (error) {
                if (error.message && error.message.includes("[AsyncStorage] Passing null/undefined as value is not supported.")) {
                  console.error('Erro ao obter o CEP:', error);
                  setErrorMessage("Erro ao obter o CEP. Tente novamente.");
                }else{
                  console.error('Erro ao verificar o CPF no BD:', error);
                  setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
                }
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
        <View style={sharedStylesForms.form}>
          <TextInput
            style={sharedStylesForms.input}
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
