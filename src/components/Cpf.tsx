import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesCPF } from './styles/stylesCPF';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validate, format } from 'cpf-check';

export const Cpf = () => {
  const { navigate } = useNavigation();
  const [cpf, setCpf] = useState('');

  const handleNextPage = async () => {
    if (validate(cpf)) {
      try {
        await AsyncStorage.setItem('CPF', cpf); 
        console.log(`CPF (${format(cpf)}) salvo com sucesso!`);
        navigate('Cep');
      } catch (error) {
        console.error('Erro ao salvar o CPF:', error);
      }
    } else {
      console.error('CPF inválido');
    }
  };

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
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
    </View>
  );
};