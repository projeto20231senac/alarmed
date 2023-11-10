import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Logo } from './Logo';
import { CheckBox } from 'react-native-elements';
import { styles } from './styles/sharedStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Terms = () => {
  const { navigate } = useNavigation();
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const CPF = await AsyncStorage.getItem('CPF')
        const dataNascimento = await AsyncStorage.getItem('dataNascimento');
        const cepData = await AsyncStorage.getItem('CEP');

        console.log('CPF definido: ', CPF)
        console.log('CEP definido: ', cepData)
        console.log('Data de Nascimento: ', dataNascimento)

        if (CPF && dataNascimento && cepData) {
          navigate('Alarmes')
        } else{
          navigate('Cpf')
        }
      } catch (error) {
        console.error('Erro ao verificar o AsyncStorage:', error);
      }
    };

    checkAsyncStorage();
  }, [navigate]);

  
  const handleAcceptTerms = async () => {
    setTermsAccepted(true);

    if (!termsAccepted) {
      Alert.alert(
        'Termos de uso',
        'Você deve aceitar os termos de uso antes de avançar.',
        [
          {
            text: 'Rejeitar',
            onPress: () => console.log('Cancelar'),
            style: 'cancel',
          },
          { text: 'Aceitar', onPress: () => {
              setTermsAccepted(true);
              navigate('Alarmes'); // Verifique novamente o AsyncStorage ao aceitar os termos.
            } 
          },
        ],
      );
    } else {
      navigate('Cpf');
    }
  };

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <ScrollView>

      </ScrollView>
    </View>
  );
};
