import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesDTNasc } from './styles/stylesDTNasc';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/AlarmesService';

export const Nascimento = () => {
  const { navigate } = useNavigation();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [dataNascimentoPreenchida, setDataNascimentoPreenchida] = useState(false);

  // Função para fazer a solicitação POST para a API
  const enviarDadosParaAPI = async (cpf: string, cep: string, dataNascimento: string) => {
    try {
      const dados = {
        cpf,
        cep,
        dataNascimento,
      };

      const response = await api.post('/usuarios', dados);

      if (response.status === 200) {
        console.log(response);
        console.log('Dados enviados com sucesso!');
      } else {
        console.error('Erro ao enviar os dados para a API:', response.status);
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação para a API:', error);
    }
  };

  const handleNextPage = async () => {
    const formattedDate = date.toLocaleDateString('pt-BR');

    try {
      await AsyncStorage.setItem('dataNascimento', formattedDate);
      console.log(`Data de nascimento (${formattedDate}) salva com sucesso!`);

      const cpf = await AsyncStorage.getItem('CPF');
      const cep = await AsyncStorage.getItem('CEP');
      const dataNascimento = formattedDate; // Use a data formatada

      if (cpf && cep && dataNascimento) {
        enviarDadosParaAPI(cpf, cep, dataNascimento);
      } else {
        console.error('Alguns dados estão ausentes no AsyncStorage');
      }

      navigate('Alarmes');
    } catch (error) {
      console.error('Erro ao salvar a data de nascimento:', error);
    }
  };

  useEffect(() => {
    if (dataNascimentoPreenchida) {
      // Se a data de nascimento foi preenchida, envie para a API
      const buscarDadosDoAsyncStorage = async () => {
        try {
          const cpf = await AsyncStorage.getItem('CPF');
          const cep = await AsyncStorage.getItem('CEP');
          const dataNascimento = await AsyncStorage.getItem('dataNascimento');

          if (cpf && cep && dataNascimento) {
            enviarDadosParaAPI(cpf, cep, dataNascimento);
          } else {
            console.error('Alguns dados estão ausentes no AsyncStorage');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do AsyncStorage:', error);
        }
      };

      buscarDadosDoAsyncStorage();
    }
  }, [dataNascimentoPreenchida]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);

    const formattedDate = currentDate.toLocaleDateString('pt-BR');

    setInputValue(formattedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <Text style={styles.title}>Qual é a sua data de nascimento?</Text>
      <View style={stylesDTNasc.form}>
        <View>
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              onChange={onChange}
              display="spinner"
              textColor="#000"
              locale="pt-BR"
            />
          ) : (
            <>
              <TextInput
                value={inputValue}
                onPressIn={() => {
                  showDatepicker();
                }}
                placeholder="00/00/0000"
                style={stylesDTNasc.input}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  onChange={onChange}
                  display="spinner"
                />
              )}
            </>
          )}
        </View>
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button} onPress={handleNextPage}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
