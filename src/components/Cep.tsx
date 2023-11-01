import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesCPF } from './styles/stylesCPF';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Cep = () => {
  const { navigate } = useNavigation();
  const [cep, setCep] = useState('');

  // Função para formatar o CEP para "00000-000"
  const formatCep = (inputCep) => {
    // Remove todos os caracteres não numéricos do CEP
    const numericCep = inputCep.replace(/\D/g, '');

    // Verifica se o CEP possui pelo menos 8 dígitos
    if (numericCep.length >= 8) {
      // Formata o CEP para "00000-000"
      return numericCep.slice(0, 5) + '-' + numericCep.slice(5, 8);
    }

    // Se o CEP não tiver pelo menos 8 dígitos, retorna o valor original
    return inputCep;
  };

  const handleNextPage = async () => {
    const formattedCep = formatCep(cep);

    try {
      await AsyncStorage.setItem('CEP', formattedCep);
      console.log(`CEP (${formattedCep}) salvo com sucesso!`);
      navigate('DtNasc');
    } catch (error) {
      console.error('Erro ao salvar o CEP:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <KeyboardAvoidingView 
        style={{ flex: 2 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>Qual é o seu CEP?</Text>
        <View style={stylesCPF.form}>
          <TextInput
            style={stylesCPF.input}
            value={cep}
            onChangeText={(text) => setCep(formatCep(text))}
            placeholder="00000-000"
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