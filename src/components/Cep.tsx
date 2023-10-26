import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/stylesCEP';
export const Cep = () => {
  const { navigate } = useNavigation();

  const [cep, setCep] = useState<string>();
  const cepData = '@Alarmed/:cep';
  const [isDesable, setDesable] = useState(false);

  const saveCep = async () => {
    if (cep === undefined || cep.length === 0) {
      setDesable(false);
    } else {
      try {
        await AsyncStorage.setItem(cepData, cep);
        setDesable(true);
    navigate('DtNasc')

        console.log('CEP salvo com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar o CEP:', error);
      }
    }
  };

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
            onFocus={() => setDesable(true)}
            onBlur={() => setDesable(false)}
          />
          <Text>{cep === undefined ? 'Preenha o cep' : ''}</Text>
        </View>

        <View style={styles.areaButton}>
          <TouchableOpacity
            style={
              (styles.button,
              {
                backgroundColor: !isDesable ? 'grey' : 'blue',
                padding: 15,
                paddingLeft: 80,
                paddingRight: 80,
                borderRadius: 10,
              })
            }
            onPress={saveCep}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
