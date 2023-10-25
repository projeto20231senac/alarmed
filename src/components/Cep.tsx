import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Logo } from './Logo';

export const Cep = () => {
  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <Text style={styles.title}>Qual é o seu CEP?</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="00000-000"
          placeholderTextColor={'#666'}
        />
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
