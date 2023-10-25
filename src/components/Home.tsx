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

export const Home = () => {
  const { navigate } = useNavigation();

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAcceptTerms = () => {
    if (!termsAccepted) {
      Alert.alert(
        'Termos de uso',
        'Você deve aceitar os termos antes de avançar.',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelar'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK') },
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
            source={require('./assets/images/welcomePage/calendar.png')}
            style={styles.imgWelcomePage}
          />
          <Text style={styles.description}>Defina seus horários</Text>
        </View>
        <View style={styles.containerMainContentChild}>
          <Image
            source={require('./assets/images/welcomePage/camera.png')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 200,
    height: 50,
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  containerTitleSubTitle: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#0085FF',

    paddingTop: 15,
  },
  containerMainContent: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerMainContentChild: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 45,
  },
  imgWelcomePage: {
    width: 30,
    height: 30,
  },
  description: {
    fontSize: 18,
    paddingLeft: 10,
  },
  subtitleMainContent: {
    paddingTop: 30,
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    color: '#0085FF',
  },

  terms: {
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  termsText: {
    fontSize: 16,
  },

  termsTextHilighted: {
    fontSize: 16,
    color: '#0085FF',
    fontWeight: 'bold',
  },
  areaButton: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: '#0085FF',
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
