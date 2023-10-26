import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesCEP } from './styles/stylesCEP';

export const Cep = () => {

  const { navigate } = useNavigation();

  const handleNextPage = () => {
    navigate('DtNasc')
  }

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <Text style={styles.title}>Qual é o seu CEP?</Text>
      <View style={stylesCEP.form}>
        <TextInput
          keyboardType='numeric'
          style={stylesCEP.input}
          placeholder="00000-000"
          placeholderTextColor={'#666'}
        />
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button} onPress={handleNextPage}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
