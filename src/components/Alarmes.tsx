import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesAlarmes } from './styles/stylesAlarmes';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../service/AlarmesService';

export const Alarmes = () => {
  const { navigate } = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [userUuid, setUserUuid] = useState('');
  const [alarmes, setAlarmes] = useState([]);

  const handleNextPage = () => {
    navigate('AlarmesNome')
  }

  useEffect(() => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Sao_Paulo'
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
    fetchUserUuid();

    // Buscar os alarmes do usuário com base no userUuid
    const loadDados = async () => {
      const uuid = await AsyncStorage.getItem('user_uuid');
      console.log(`Seu UUID é: ${uuid}`)
      const response = await api.get(`/alarmes/${uuid}`);
      console.log(response.data);
      setAlarmes(response.data)
    };
    loadDados();

  }, []);

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />

      <Text style={stylesAlarmes.subtitle}>Hoje é {currentDate}</Text>
      <Text style={stylesAlarmes.title}>Meus alarmes</Text>
      {/* <Text style={{color:'#777'}}>UUID:{userUuid}</Text> */}
      
      <View style={styles.areaButton}>
        <TouchableOpacity style={stylesAlarmes.button} onPress={handleNextPage}>
          <Text style={stylesAlarmes.buttonText}>Adicionar Alarmes</Text>
        </TouchableOpacity>
      </View>
      <View style={stylesAlarmes.alarmes}>
        <ScrollView>
        {alarmes.length > 0 ? (
          alarmes.map((alarme) => (
            <View style={stylesAlarmes.alarmesChild}key={alarme.alarme_id}>
              <View style={stylesAlarmes.alarmesChildColumn}>
                {/* imagem aleatória para testes */}
                <Image style={stylesAlarmes.imgAlarmes} source={require('../assets/favicon.png')}></Image> 
              </View>
              <View style={stylesAlarmes.alarmesChildColumn}>
                <View style={stylesAlarmes.alarmesChildLine}>
                  <Text 
                  style={stylesAlarmes.alarmesChildTitle}>{alarme.alarme_nome}
                    <Text style={{color: '#000', fontWeight: 'normal'}}>, deverá ser administrado às </Text>
                    <Text style={stylesAlarmes.alarmesChildHora}>
                      {alarme.alarme_hora.split('[').join('').split('"').join('').split(']').join('')}
                    </Text>
                  </Text>
                </View>
                <View style={stylesAlarmes.alarmesChildLine}>
                  <View style={stylesAlarmes.frequencia}>
                    <Image
                      source={require('../assets/images/alarmesPage/calendar.png')}
                      style={stylesAlarmes.imgAlarmesPage}
                    />
                    <Text style={stylesAlarmes.frequenciaText}>
                    {alarme.alarme_recorrencia === 1
                      ? 'Repete todos os dias'
                      : 
                      <>
                        Repete a cada <Text style={{ color: '#f00' }}>
                          {alarme.alarme_recorrencia}
                        </Text> dias
                      </>
                      }
                    </Text>
                  </View>
                </View>
              </View>
              <View style={stylesAlarmes.alarmesChildColumn}>
                <TouchableOpacity style={stylesAlarmes.moreDetails} onPress={() => goBack()}>
                    <AntDesign name="right" size={20} color="#555" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={stylesAlarmes.noAlarmsMessage}>Não há alarmes definidos no momento</Text>
        )}
        </ScrollView>
      </View>
    </View>
  );
};
