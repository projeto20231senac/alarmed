import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Logo } from './Logo';
import { CheckBox } from 'react-native-elements';
import { styles } from './styles/sharedStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = () => {
  const { navigate } = useNavigation();
  const [termsAccepted, setTermsAccepted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkAsyncStorage = async () => {
        try {
          const CPF = await AsyncStorage.getItem('CPF');
          const dataNascimento = await AsyncStorage.getItem('dataNascimento');
          const cepData = await AsyncStorage.getItem('CEP');
          const termoAceito = await AsyncStorage.getItem('termoAceito');
  
          console.log('CPF definido: ', CPF);
          console.log('CEP definido: ', cepData);
          console.log('Data de Nascimento: ', dataNascimento);
          console.log('Termo Aceito: ', termoAceito);
  
          if (CPF && dataNascimento && cepData && (termoAceito === 'sim' || termsAccepted)) {
            navigate('Alarmes');
          } else if (CPF && dataNascimento && cepData && (termoAceito === null || termoAceito === 'nao')) {
            navigate('Terms');
          } else {
            navigate('Cpf');
          }
        } catch (error) {
          console.error('Erro ao verificar o AsyncStorage:', error);
        }
      };
  
      checkAsyncStorage();
    }, [navigate])
  );

  const handleNextPage = (value) => {
    if(value === 'terms'){
      navigate('Terms')
    }
  }

  return (
    <View style={styles.container}>
      <Logo showBackButton={false} />
      
      <ScrollView>
      <View style={styles.containerTitleSubTitle}>
        <Text style={styles.title}>Seja bem-vindo!</Text>
        <Text style={styles.subtitle}>
          Somos seu novo jeito de controlar seus medicamentos
        </Text>
      </View>

      <View style={styles.containerMainContent}>
        <View style={styles.containerMainContentChild}>
          <Image
            source={require('../assets/images/welcomePage/calendar.png')}
            style={styles.imgWelcomePage}
          />
          <Text style={styles.description}>Defina seus horários</Text>
        </View>
        <View style={styles.containerMainContentChild}>
          <Image
            source={require('../assets/images/welcomePage/camera.png')}
            style={styles.imgWelcomePage}
          />
          <Text style={styles.description}>tire uma foto do medicamento</Text>
        </View>
        <View style={styles.containerMainContentChild}>
          <Text style={styles.subtitleMainContent}>
            e pronto! O resto é com a gente...
          </Text>
        </View>
      </View>
      <View style={styles.terms}>
        <CheckBox
          checked={termsAccepted}
          onPress={() => handleNextPage('terms')}
        />
        <Text style={styles.termsText}>
          Aceito os <Text style={styles.termsTextHilighted} onPress={() => {handleNextPage('terms')}}>termos de uso</Text>
        </Text>
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button} /*onPress={handleAcceptTerms}*/>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};
