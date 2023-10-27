import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/stylesCEP';
import { api } from '../service/AlarmesService';

export const Cep = () => {
  const { navigate } = useNavigation();
  const [cep, setCep] = useState<string>();
  const cepData = '@Alarmed/:cep';
  const [isDesable, setDesable] = useState(false);
  const [cepIvalidate, setCepIvalidate] = useState('');

  const saveCep = async () => {
    if (cep === undefined || cep === '') {
      setDesable(false);
      Alert.alert(
        'Campo obrigatório!',
        'Por favor informe o seu CEP para continuar.',
        [
          {
            text: 'OK',
            onPress: () => {
              setDesable(true);
              console.log('OK');
            },
          },
        ],
      );
    } else if (cep.length < 8) {
      setCepIvalidate(
        'CEP inválido! Verifique se o CEP está correto e tente novamente.',
      );
      setCep('');
    } else {
      try {
        await AsyncStorage.setItem('cepData', cep);
        setDesable(true);
        navigate('DtNasc');
        setCep('');
        setCepIvalidate('  ');
        console.log(`CEP (${cep}) salvo com sucesso!`);
      } catch (error) {
        console.error('Erro ao salvar o CEP:', error);
      }
    }
  };
  // testando api
  useEffect(() => {
    const loadDados = async () => {
      const respose = await api.get('alarmes');
      console.log(respose.data);
    };
    loadDados();
  }, []);
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
            maxLength={8}
            onChangeText={setCep}
            style={styles.input}
            placeholder="00000-000"
            placeholderTextColor={'#666'}
            keyboardType="numeric"
            onFocus={() => setDesable(true)}
            autoFocus
            onBlur={() => setDesable(false)}
          />

          <Text
            style={{
              marginTop: 10,
            }}
          >
            {isDesable === true && cep === '' ? (
              <Text
                style={{
                  color: '#FF0000',
                  fontSize: 18,
                }}
              >
                {cepIvalidate}
              </Text>
            ) : (
              ''
            )}
          </Text>
        </View>

        <View style={styles.areaButton}>
          <TouchableOpacity
            style={
              (styles.button,
              {
                backgroundColor: !isDesable ? 'grey' : '#0085FF',
                padding: 15,
                paddingLeft: 80,
                paddingRight: 80,
                borderRadius: 10,
              })
            }
            disabled={!isDesable}
            onPress={saveCep}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
