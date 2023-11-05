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
import { stylesAlarmesDetails } from './styles/stylesAlarmesDetails';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/AlarmesService';

export const AlarmeDetails = () => {
  const { navigate } = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [dados, setDados] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);

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
      try {
        const alarmeId = await AsyncStorage.getItem('alarmeId');
        const horariosId = await AsyncStorage.getItem('horariosId');
        console.log("Alarme ID recebido: ", alarmeId);
        console.log('Horarios ID recebido: ', horariosId)

        const response = await api.get(`/detalhes/${alarmeId}/${horariosId}`);

        if (response.status === 200) {
          const dadosAPI = response.data;
          console.log(dadosAPI)

          if (dadosAPI) {
            setDados(dadosAPI);
          } else {
            console.log("Nenhum dado de alarme recebido da API.");
            setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
          }
        }else{
          setErrorMessage("Ocorreu um erro ao carregar os dados do alarme. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
        setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
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
      {errorMessage && (
          <View style={styles.error}>
            <MaterialIcons name="error" size={24} color="black" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
      <Text style={stylesAlarmesDetails.subtitle}>Hoje é {currentDate}</Text>

      <View style={stylesAlarmesDetails.alarmes}>
      <ScrollView>
        {dados.length > 0 ? (
          dados.map((alarme) => (
            <View style={stylesAlarmesDetails.alarmesChild}key={alarme.alarme_id}>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <View style={stylesAlarmesDetails.alarmesChildColumn}>
                    <Text>Detalhes</Text>
                  </View>
                  <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} /*onPress={handleEditPage}*/>
                    <MaterialIcons name="edit" size={20} color="#000" />
                    <Text>Editar</Text>
                  </TouchableOpacity>
                </View>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Text style={stylesAlarmesDetails.alarmesChildTitle}>{alarme.alarme_nome}</Text>
                </View>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                    {/* imagem aleatória para testes */}
                  <Image style={stylesAlarmesDetails.imgAlarmes} source={require('../assets/favicon.png')}></Image>
                </View>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <View style={stylesAlarmesDetails.frequencia}>
                    <AntDesign name="calendar" size={24} color="#000" style={{marginRight: 10}}/>
                    <Text style={stylesAlarmesDetails.alarmesChildText}>
                    {alarme.alarme_recorrencia === 1
                      ? 'Repete todos os dias'
                      : 
                      <>
                        Repete a cada <Text style={{ color: '#f00', fontWeight: 'bold' }}>
                          {alarme.alarme_recorrencia}
                        </Text> dias
                      </>
                      }
                    </Text>
                  </View>
                </View>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Entypo name="clock" size={24} color="black" style={{marginRight: 10}}/>
                  <Text style={stylesAlarmesDetails.alarmesChildText}>
                    {formattedHour(alarme.hora)}
                  </Text>
                </View>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Text style={stylesAlarmesDetails.alarmesChildText}>
                    {alarme.medicamentos_tipo}
                  </Text>
                </View>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Text style={stylesAlarmesDetails.alarmesChildText}>
                    {alarme.medicamentos_dose} {alarme.medicamentos_posologia}
                  </Text>
                </View>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Text style={stylesAlarmesDetails.alarmesChildText}>
                    {alarme.count_disparos === 0
                        ? 'Este alarme ainda não foi disparado'
                        : 
                        <>
                          Esse alarme já disparou {alarme.count_disparos} vezes desde que foi definido.
                        </>
                    }
                  </Text>
                </View>
            </View>
          ))
        ) : (
          <View style={stylesAlarmesDetails.noAlarms}>
            <Text style={stylesAlarmesDetails.noAlarmsMessage}>Detalhes não encontrados para esse alarme.</Text>
            <FontAwesome5 name="bell-slash" size={60} color="#ff000055" />
            <Text style={stylesAlarmesDetails.noAlarmsMessage}>Tente novamente.</Text>
          </View>
        )}
        </ScrollView>
      </View>
    </View>
  );
};