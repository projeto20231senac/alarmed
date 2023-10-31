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
import { api } from '../service/AlarmesService';

export const Alarmes = () => {
  const { navigate } = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [dados, setDados] = useState({ alarmes: [], horarios: [] });
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
      console.log("Dados recebidos da API: ", response.data);

      const dadosAPI = response.data;

      if (dadosAPI && dadosAPI.alarmes && dadosAPI.horarios) {
        console.log("Alarmes definidos: ", dadosAPI.alarmes);
        console.log("Horários definidos: ", dadosAPI.horarios);

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
      <Text style={stylesAlarmes.title}>Meus alarmes</Text>
      
      <View style={styles.areaButton}>
        <TouchableOpacity style={stylesAlarmes.button} onPress={handleNextPage}>
          <Text style={stylesAlarmes.buttonText}>Adicionar Alarmes</Text>
        </TouchableOpacity>
      </View>
      <View style={stylesAlarmes.alarmes}>
        <ScrollView>
          {dadosCarregados ? (
            dados.alarmes.length > 0 ? (
              dados.alarmes.map((alarme) => {
                const horariosDoAlarme = dados.horarios.filter(horario => horario.alarmes_id === alarme.alarme_id);
                return (
                  <View style={stylesAlarmes.alarmesChild} key={alarme.alarme_id}>
                    <View style={stylesAlarmes.alarmesChildColumn}>
                      {/* imagem aleatória para testes */}
                      <Image style={stylesAlarmes.imgAlarmes} source={require('../assets/favicon.png')}></Image>
                    </View>
                    <View style={stylesAlarmes.alarmesChildColumn}>
                      <View style={stylesAlarmes.alarmesChildLine}>
                        <Text style={stylesAlarmes.alarmesChildTitle}>{alarme.alarme_nome}
                          <Text style={{ color: '#000', fontWeight: 'normal' }}>, deverá ser administrado às </Text>
                          {horariosDoAlarme.length > 0 ? (
                            horariosDoAlarme.map((horario, index) => (
                              <Text style={stylesAlarmes.alarmesChildHora} key={horario.horarios_id}>
                                {horariosDoAlarme.length > 1 && index === horariosDoAlarme.length - 1 ? (
                                  ' e ' + formattedHour(horario.hora)
                                ) : index === horariosDoAlarme.length - 2 ? (
                                  ' ' + formattedHour(horario.hora)
                                ) : horariosDoAlarme.length > 1 ? (
                                  formattedHour(horario.hora) + ', '
                                ) : (
                                  formattedHour(horario.hora)
                                )}
                              </Text>
                            ))
                          ) : null}
                        </Text>
                      </View>
                      <View style={stylesAlarmes.alarmesChildLine}>
                        <View style={stylesAlarmes.frequencia}>
                          <Image source={require('../assets/images/alarmesPage/calendar.png')} style={stylesAlarmes.imgAlarmesPage} />
                          <Text style={stylesAlarmes.frequenciaText}>
                            {alarme.alarme_recorrencia === 1 ? 'Repete todos os dias' :
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
                      <TouchableOpacity style={stylesAlarmes.moreDetails} /* onPress={() => moreDetails()}*/>
                        <AntDesign name="right" size={20} color="#555" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={stylesAlarmes.noAlarmsMessage}>Não há alarmes definidos no momento</Text>
            )
          ) : (
            <Text style={stylesAlarmes.noAlarmsMessage}>Carregando alarmes...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
