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
import { AntDesign, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/AlarmesService';

export const Alarmes = () => {
  const { navigate } = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [dados, setDados] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);

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

    const loadDados = async () => {
      const userID = await AsyncStorage.getItem('CPF');
      console.log("User ID: ", userID);

      const response = await api.get(`/alarmes/${userID}`);

      const dadosAPI = response.data;

      if (dadosAPI) {
        setDadosCarregados(true);
        setDados(dadosAPI);
      } else {
        console.log("Nenhum dado de alarme ou horário recebido da API.");
      }
    };

    loadDados();
  }, []);

  const formattedHour = (horaString) => {
    if (!horaString) return '';

    const parts = horaString.split(':');
    if (parts.length === 3) {
      const horas = parseInt(parts[0]);
      const minutos = parseInt(parts[1]);
      if (!isNaN(horas) && !isNaN(minutos)) {
        const horaFormatada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        return horaFormatada;
      }
    }
    return '';
  }

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />

      <Text style={stylesAlarmes.subtitle}>Hoje é {currentDate}</Text>
      
      <View style={stylesAlarmes.areaButton}>
        <TouchableOpacity style={stylesAlarmes.editButton} onPress={handleNextPage}>
          <Text style={stylesAlarmes.editButtonText}>Editar meus dados</Text>
          <MaterialCommunityIcons name="account-edit-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={stylesAlarmes.addButton} onPress={handleNextPage}>
          <Text style={stylesAlarmes.addButtonText}>Adicionar Alarmes</Text>
          <MaterialCommunityIcons name="alarm-plus" size={24} color="#0085FF" />
        </TouchableOpacity>
      </View>
      <Text style={stylesAlarmes.title}>Meus alarmes <MaterialCommunityIcons name="bell-ring" size={32} color="#0085FF" /></Text>
      <View style={stylesAlarmes.alarmes}>
      <ScrollView>
        {dados.length > 0 ? (
          dados.map((alarme) => (
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
                      {alarme.hora}
                    </Text>
                  </Text>
                </View>
                <View style={stylesAlarmes.alarmesChildLine}>
                  <View style={stylesAlarmes.frequencia}>
                    <AntDesign name="calendar" size={24} color="black" style={{marginRight: 10}}/>
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
          <View style={stylesAlarmes.noAlarms}>
            <Text style={stylesAlarmes.noAlarmsMessage}>Não há alarmes definidos no momento</Text>
            <FontAwesome5 name="bell-slash" size={60} color="#ff000055" />
          </View>
        )}
        </ScrollView>
      </View>
    </View>
  );
};
