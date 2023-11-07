import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesAlarmesDetails } from './styles/stylesAlarmesDetails';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/AlarmesService';

export const AlarmeDetails = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [dados, setDados] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [editando, setEditando] = useState(false);

  const [editedData, setEditedData] = useState({
    alarme_nome: '',
    alarme_recorrencia: '',
    hora: '',
    medicamentos_tipo: '',
    medicamentos_dose: '',
    medicamentos_posologia: '',
  });

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


  const handleEdit = () => {
    setEditando(true);
    setEditedData({
      alarme_nome: dados[0].alarme_nome,
      alarme_recorrencia: String(dados[0].alarme_recorrencia),
      hora: dados[0].hora,
      medicamentos_tipo: dados[0].medicamentos_tipo,
      medicamentos_dose: dados[0].medicamentos_dose,
      medicamentos_posologia: dados[0].medicamentos_posologia,
    });
  };

  const handleSave = async () => {
    setEditando(false);
    const alarmeId = await AsyncStorage.getItem('alarmeId');
    const horariosId = await AsyncStorage.getItem('horariosId');
  
    try {
      const response = await api.put(`/alarmes/editar/${alarmeId}/${horariosId}`, editedData);
      if (response.status === 200) {
        // Os dados foram atualizados com sucesso
        // Você pode atualizar o estado dados (ou recarregar os dados da API) aqui
      } else {
        console.error('Erro ao atualizar os dados:', response.status);
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação para a API:', error);
    }
  };

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
            <MaterialIcons name="error" size={24} color="#000" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
      <View>
        <Text style={stylesAlarmesDetails.subtitle}>Hoje é {currentDate}</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 2 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={stylesAlarmesDetails.alarmes}>
      <ScrollView>
        {dados.length > 0 ? (
          dados.map((alarme) => (
            <View style={stylesAlarmesDetails.alarmesChild}key={alarme.alarme_id}>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <View style={stylesAlarmesDetails.alarmesChildColumn}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>Detalhes</Text>
                  </View>
                  {editando ? (
                    <TouchableOpacity onPress={handleSave}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Editando</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={handleEdit}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Editar</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {editando ? (
                  <View style={stylesAlarmesDetails.alarmesChildLine}>
                    <TextInput
                      style={stylesAlarmesDetails.alarmesChildTitle}
                      value={editando ? editedData.alarme_nome : dados[0].alarme_nome}
                      onChangeText={(text) => {
                        setEditedData({ ...editedData, alarme_nome: text });
                      }}
                    />
                  </View>
                ) : (
                  <View style={stylesAlarmesDetails.alarmesChildLine}>
                    <Text style={stylesAlarmesDetails.alarmesChildTitle}>{alarme.alarme_nome}</Text>
                  </View>
                )}

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                    {/* imagem aleatória para testes */}
                  <Image style={stylesAlarmesDetails.imgAlarmes} source={require('../assets/favicon.png')}></Image>
                </View>

                {editando ? ( 
                  <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <View style={stylesAlarmesDetails.frequencia}>
                    <AntDesign name="calendar" size={24} color="#000" style={{marginRight: 10}}/>
                    <Text style={stylesAlarmesDetails.alarmesChildText}> Repete a cada  
                      <TextInput keyboardType='numeric' style={{ color: '#f00', fontWeight: 'bold', margin: 10, padding: 10, backgroundColor: '#fff', borderWidth: 1}}
                        value={editedData.alarme_recorrencia}
                        onChangeText={(text) => {
                          setEditedData({ ...editedData, alarme_recorrencia: text });
                        }
                        }
                      />
                      {alarme.alarme_recorrencia}
                      dia(s)
                    </Text>
                  </View>
                </View>
                ) : (
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
                )}

                {editando ? (
                  <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Entypo name="clock" size={24} color="#000" style={{marginRight: 10}}/>
                  <TextInput keyboardType='numeric' style={stylesAlarmesDetails.alarmesChildText} 
                    value={editedData.hora}
                    onChangeText={(text) => {
                      setEditedData({ ...editedData, hora: text });
                    }}
                  />
                    {formattedHour(alarme.hora)}
                </View>
                ) : (
                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Entypo name="clock" size={24} color="#000" style={{marginRight: 10}}/>
                  <Text style={stylesAlarmesDetails.alarmesChildText}>
                    {formattedHour(alarme.hora)}
                  </Text>
                </View>
                )}

                {editando ? (
                  <View style={stylesAlarmesDetails.alarmesChildLine}>
                     <TextInput style={stylesAlarmesDetails.alarmesChildText}
                      value={editedData.medicamentos_tipo}
                      onChangeText={(text) => {
                        setEditedData({ ...editedData, medicamentos_tipo: text });
                      }}
                     />
                      {alarme.medicamentos_tipo === 'Liquido' ? (
                        <FontAwesome5 name="syringe" size={24} color="#000" style={{marginRight: 10}}/>                    
                      ) : alarme.medicamentos_tipo === 'Gotas' ? (
                        <Ionicons name="water" size={24} color="#000" style={{marginRight: 10}}/>
                      ) : alarme.medicamentos_tipo === 'Comprimido' ? (
                        <MaterialCommunityIcons name="pill" size={24} color="#000" style={{marginRight: 10}}/>
                      ) : (
                        <>
                        </>
                      )}{alarme.medicamentos_tipo}
                </View>
                ) : (
                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Text style={stylesAlarmesDetails.alarmesChildText}>
                    {alarme.medicamentos_tipo === 'Liquido' ? (
                        <FontAwesome5 name="syringe" size={24} color="#000" style={{marginRight: 10}}/>                    
                      ) : alarme.medicamentos_tipo === 'Gotas' ? (
                        <Ionicons name="water" size={24} color="#000" style={{marginRight: 10}}/>
                      ) : alarme.medicamentos_tipo === 'Comprimido' ? (
                        <MaterialCommunityIcons name="pill" size={24} color="#000" style={{marginRight: 10}}/>
                      ) : (
                        <>
                        </>
                      )}{alarme.medicamentos_tipo}
                  </Text>
                </View>
                )}

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  {editando ? (
                    <View style={stylesAlarmesDetails.alarmesChildLine}>
                      <TextInput
                        style={stylesAlarmesDetails.alarmesChildText}
                        value={editedData.medicamentos_dose}
                        onChangeText={(text) => {
                          setEditedData({ ...editedData, medicamentos_dose: text });
                        }}
                      />
                        {alarme.medicamentos_dose} 
                    </View>
                  ) : (
                    <View style={stylesAlarmesDetails.alarmesChildLine}>
                      <Text style={stylesAlarmesDetails.alarmesChildText}>
                        {alarme.medicamentos_dose}
                      </Text>
                    </View>
                  )}

                  {editando ? (
                    <View style={stylesAlarmesDetails.alarmesChildLine}>
                      <TextInput
                        style={stylesAlarmesDetails.alarmesChildText}
                        value={editedData.medicamentos_posologia}
                        onChangeText={(text) => {
                          setEditedData({ ...editedData, medicamentos_posologia: text });
                        }}
                      />
                        {alarme.medicamentos_posologia}
                    </View>
                  ) : (
                    <View style={stylesAlarmesDetails.alarmesChildLine}>
                      <Text style={stylesAlarmesDetails.alarmesChildText}>
                         {alarme.medicamentos_posologia}
                      </Text>
                    </View>
                  )}
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

                {editando ? (
                  <TouchableOpacity style={stylesAlarmesDetails.saveButton} onPress={handleSave}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Salvar alarme</Text>
                  </TouchableOpacity>
                ) : null}
                
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
      </KeyboardAvoidingView>
    </View>
  );
};