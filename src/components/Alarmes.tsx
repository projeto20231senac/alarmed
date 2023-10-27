import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesAlarmes } from './styles/stylesAlarmes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { AlarmesService } from '../service/AlarmesService';

export const Alarmes = () => {
  const { navigate } = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [userUuid, setUserUuid] = useState('');
  const [alarmes, setAlarmes] = useState([]);

  const handleNextPage = () => {
    // Navegar para a próxima página
  }

  useEffect(() => {
    const options = {
      weekday: 'long', // Exibe o nome do dia da semana
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const currentDate = new Date().toLocaleString('pt-BR', options);
    setCurrentDate(currentDate);

    // Recupere o uuid do usuário armazenado no dispositivo, se existir
    const fetchUserUuid = async () => {
      const storedUuid = await AsyncStorage.getItem('user_uuid');
      if (storedUuid) {
        setUserUuid(storedUuid);
      } else {
        const newUuid = uuidv4();
        setUserUuid(newUuid);
        await AsyncStorage.setItem('user_uuid', newUuid);
      }
    };
    // console.log(userUuid) linha para logar o uuid no console para testes no BD
    fetchUserUuid();

    // Buscar os alarmes do usuário com base no userUuid
    const fetchAlarmes = async () => {
      try {
        const alarmesData = await AlarmesService.getAlarmes(userUuid);
        setAlarmes(alarmesData);
      } catch (error) {
        console.error('Erro ao buscar alarmes:', error);
      }
    };

    fetchAlarmes();
  }, [userUuid]);

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />

      <Text style={stylesAlarmes.subtitle}>Hoje é {currentDate}</Text>
      <Text style={stylesAlarmes.title}>Meus alarmes</Text>
      <Text>UUID: {userUuid}</Text>
      
      <View style={styles.areaButton}>
        <TouchableOpacity style={stylesAlarmes.button} onPress={handleNextPage}>
          <Text style={stylesAlarmes.buttonText}>Adicionar Alarmes</Text>
        </TouchableOpacity>
      </View>
      
      {alarmes.length > 0 ? (
        alarmes.map((alarme) => (
          <View key={alarme.alarm_id}>
            <Text>Nome: {alarme.nome_alarme}</Text>
            <Text>Recorrência: {alarme.recorrencia}</Text>
            <Text>Hora: {alarme.hora_alarme}</Text>
            <Text>Foto: {alarme.foto_alarme}</Text>
          </View>
        ))
      ) : (
        <Text style={stylesAlarmes.noAlarmsMessage}>Não há alarmes definidos no momento</Text>
      )}

    </View>
  );
};
