import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './styles/sharedStyles';
import { stylesAlarmesDetails } from './styles/stylesAlarmesDetails';
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/AlarmesService';

export const AlarmeDetails = () => {
  const { navigate } = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [dados, setDados] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [editando, setEditando] = useState(false); 


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([['Comprimido', 'Gotas', 'Liquido', 'Injetavel']])
  const [items, setItems] = useState([
    { label: 'Comprimido', value: 'Comprimido' },
    { label: 'Gotas', value: 'Gotas' },
    { label: 'Líquido', value: 'Liquido' },
    { label: 'Injetável', value: 'Injetavel' },
  ]);


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

  const handleCancel = async () => {
    setEditando(false)
  }

  const handleDelete = async (alarme_id) => {
    // Exibe um alerta de confirmação
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este alarme?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            console.log("Alarme para deletar: ", alarme_id);
            try {
              const response = await api.delete(`/alarmes/${alarme_id}`);

              if (response.status === 204) {
                console.log('Alarme deletado com sucesso!');
                navigate('Alarmes');
              } else {
                console.error('Erro ao deletar os dados:', response.status);
              }
            } catch (error) {
              console.error('Erro ao fazer a solicitação para a API:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  

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
        {dados.length > 0 ? (
          dados.map((alarme) => (
            <View style={stylesAlarmesDetails.alarmesChild}key={alarme.alarme_id}>

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <View style={stylesAlarmesDetails.alarmesChildColumn}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Detalhes</Text>
                  </View>
                  {editando ? (
                    <>
                      <MaterialIcons name="mode-edit" size={20} color="#000" />
                      <Text style={{ fontWeight: 'bold', fontSize: 16}}>Editando</Text>
                    </>
                      
                  ) : (
                    <>
                      <MaterialIcons name="mode-edit" size={20} color="#000" />
                      <TouchableOpacity onPress={handleEdit}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16}}>Editar</Text>
                      </TouchableOpacity>
                    </>
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
                        value={editando ? editedData.alarme_recorrencia : dados[0].alarme_recorrencia}
                        onChangeText={(text) => {
                          setEditedData({ ...editedData, alarme_recorrencia: text });
                        }
                        }
                      />
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
                    value={editando ? editedData.hora : dados[0].hora}
                    onChangeText={(text) => {
                      setEditedData({ ...editedData, hora: text });
                    }}
                  />
                </View>
                ) : (
                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  <Entypo name="clock" size={24} color="#000" style={{marginRight: 10}}/>
                  <Text style={stylesAlarmesDetails.alarmesChildText}>
                    {alarme.hora}
                  </Text>
                </View>
                )}

                {editando ? (
                  <View style={stylesAlarmesDetails.alarmesChildLine}>
                    <DropDownPicker
                      open={open}
                      value={editedData.medicamentos_tipo}
                      items={items}
                      setOpen={setOpen}
                      setValue={(selectedValue) => {
                        setValue(selectedValue)
                        setEditedData({ ...editedData, medicamentos_tipo: selectedValue });
                      }}
                      setItems={setItems}

                      style={{ backgroundColor: '#77777722', borderColor: '#77777722' }}
                      itemStyle={{
                        justifyContent: 'flex-start',
                      }}
                      dropDownStyle={{ backgroundColor: '#aaaaaa' }}
                    />
                  </View>
                ) : (
                  <View style={stylesAlarmesDetails.alarmesChildLine}>
                    <Text style={stylesAlarmesDetails.alarmesChildText}>
                      {alarme.medicamentos_tipo === 'Liquido' ? (
                        <FontAwesome5 name="syringe" size={24} color="#000" style={{ marginRight: 10 }} />
                      ) : alarme.medicamentos_tipo === 'Gotas' ? (
                        <Ionicons name="water" size={24} color="#000" style={{ marginRight: 10 }} />
                      ) : alarme.medicamentos_tipo === 'Comprimido' ? (
                        <MaterialCommunityIcons name="pill" size={24} color="#000" style={{ marginRight: 10 }} />
                      ) : (
                        <>
                        </>
                      )}
                      {alarme.medicamentos_tipo}
                    </Text>
                  </View>
                )}

                <View style={stylesAlarmesDetails.alarmesChildLine}>
                  {editando ? (
                    <View style={stylesAlarmesDetails.alarmesChildLine}>
                      <TextInput
                        style={stylesAlarmesDetails.alarmesChildText}
                        value={editando ? editedData.medicamentos_dose : dados[0].medicamentos_dose}
                        onChangeText={(text) => {
                          setEditedData({ ...editedData, medicamentos_dose: text });
                        }}
                      />
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
                        value={editando ? editedData.medicamentos_posologia : dados[0].medicamentos_posologia}
                        onChangeText={(text) => {
                          setEditedData({ ...editedData, medicamentos_posologia: text });
                        }}
                      />
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
                        <Text>
                          Esse alarme já disparou {alarme.count_disparos}x desde que foi definido.
                        </Text>
                    }
                  </Text>
                </View>       

                {editando ? (
                  <>
                    <View style={stylesAlarmesDetails.saveButton}>
                      <AntDesign name="save" size={24} color="#0085FF" />
                      <TouchableOpacity onPress={handleSave}>
                        <Text style={stylesAlarmesDetails.saveButtonText}>Salvar Alarme</Text>
                      </TouchableOpacity>
                    </View>
                    <>                  
                      <TouchableOpacity onPress={handleCancel}>
                        <Text style={stylesAlarmesDetails.cancelButtonText}>Cancelar</Text>
                      </TouchableOpacity>
                    </>
                  </>

                  ) : (
                    <View style={stylesAlarmesDetails.deleteButton}>
                      <FontAwesome5 name="trash-alt" size={24} color="#F00" style={{marginRight: 5}} />
                      <TouchableOpacity onPress={() => handleDelete(alarme.alarme_id)}>
                        <Text style={stylesAlarmesDetails.deleteButtonText}>Excluir Alarme</Text>
                      </TouchableOpacity>

                    </View>
                  ) }
              </View>
          ))
        ) : (
          <View style={stylesAlarmesDetails.noAlarms}>
            <Text style={stylesAlarmesDetails.noAlarmsMessage}>Detalhes não encontrados para esse alarme.</Text>
            <FontAwesome name="bell-slash" size={60} color="#ff000055" />
            <Text style={stylesAlarmesDetails.noAlarmsMessage}>Tente novamente.</Text>
          </View>
        )}
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};