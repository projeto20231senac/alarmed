import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Logo } from './Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Cep = () => {
  const [cep, setCep] = useState<string>();
  const cepData = '@Alarmed/:cep';
  const [isDesable, setDesable] = useState(false);

  const saveCep = async () => {
    if (cep === undefined || cep.length === 0) {
      console.log('Ops');

      isDesable;
    } else {
      try {
        await AsyncStorage.setItem(cepData, cep);
        !isDesable;
        console.log('CEP salvo com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar o CEP:', error);
      }
    }
  };
  // const getCep = async () => {
  //   try {
  //     const cep = await AsyncStorage.getItem(cepData);
  //     console.log(cep);
  //   } catch (error) {
  //     console.error('Ocorreu um erro ao pegar o cep');
  //   }
  // };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Logo showBackButton={true} />
        <Text style={styles.title}>Qual é o seu CEP?</Text>
        <View style={styles.form}>
          <TextInput
            value={cep}
            maxLength={9}
            onChangeText={setCep}
            style={styles.input}
            placeholder="00000-000"
            placeholderTextColor={'#666'}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.areaButton}>
          <TouchableOpacity style={styles.button} onPress={saveCep}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
    padding: 20,
    marginVertical: 30,
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
  },
  areaButton: {
    paddingTop: 20,
    paddingBottom: 10,
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
