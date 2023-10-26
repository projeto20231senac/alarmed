import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Logo } from './Logo';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';

export const Home = () => {
  const { navigate } = useNavigation();

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAcceptTerms = () => {
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
              console.log('OK')
            } 
          },
        ],
      );
    } else {
      navigate('Cep');
    }
  };
  return (
    <View style={styles.container}>
      <Logo showBackButton={false} />
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
          onPress={() => setTermsAccepted(!termsAccepted)}
        />
        <Text style={styles.termsText}>
          Aceito os <Text style={styles.termsTextHilighted}>termos de uso</Text>
        </Text>
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button} onPress={handleAcceptTerms}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
