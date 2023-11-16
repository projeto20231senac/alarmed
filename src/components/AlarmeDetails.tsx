import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Vibration,
  Linking
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
import { sharedStylesForms } from './styles/sharedStylesForms';

export const AlarmeDetails = () => {
  const { navigate } = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [dados, setDados] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [editando, setEditando] = useState(false); 
  const [promocoes, setPromocoes] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState()
  const [items, setItems] = useState([
    { label: 'Comprimido', value: 'Comprimido', icon: () => <MaterialCommunityIcons name="pill" size={16} color="#0085ff"/> },
    { label: 'Gotas', value: 'Gotas', icon: () => <Ionicons name="water" size={16} color="#0085ff" /> },
    { label: 'Líquido', value: 'Liquido', icon: () => <FontAwesome5 name="prescription-bottle-alt" size={16} color="#0085ff" /> },
    { label: 'Injetável', value: 'Injetavel', icon: () => <FontAwesome5 name="syringe" size={16} color="#0085ff" /> },
    { label: 'Cremes', value: 'Cremes' },
    { label: 'Pomadas', value: 'Pomadas'},
    { label: 'Pastas', value: 'Pastas' },
    { label: 'Cápsula', value: 'Capsula'},
    { label: 'Drágea', value: 'Dragea'},
    { label: 'Supositório', value: 'Supositorio' },
    { label: 'Pó', value: 'Po' },
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
  
    const loadData = async () => {
      try {
        const alarmeId = await AsyncStorage.getItem('alarmeId');
        const horariosId = await AsyncStorage.getItem('horariosId');
        console.log("Alarme ID recebido: ", alarmeId);
        console.log('Horarios ID recebido: ', horariosId);
  
        const response = await api.get(`/detalhes/${alarmeId}/${horariosId}`);
  
        if (response.status === 200) {
          const dadosAPI = response.data;
          console.log(dadosAPI);
  
          if (dadosAPI) {
            setDados(dadosAPI);
            setValue(dadosAPI[0].medicamentos_tipo);
            await AsyncStorage.setItem('alarmeNome', dadosAPI[0].alarme_nome);
          } else {
            console.log("Nenhum dado de alarme recebido da API.");
            setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
          }
        } else {
          setErrorMessage("Ocorreu um erro ao carregar os dados do alarme. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
        setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
      }
    };
  
    const loadPromocoes = async () => {
      try {
        await loadData();

        const CEP = await AsyncStorage.getItem('CEP');
        const alarmeNome = await AsyncStorage.getItem('alarmeNome');
        console.log('CEP da Promoção: ', CEP, 'Nome: ', alarmeNome);
        const response = await api.get(`/promocoes/${CEP}/${alarmeNome}`);

        if (response.status === 200) {
          setPromocoes(response.data);
        } else {
          console.log("Nenhum dado de alarme recebido da API.");
          setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
        }
      } catch (err) {
        console.error('Erro ao obter os dados:', err);
        setErrorMessage("Ocorreu um erro. Por favor, tente novamente.");
      }
    };
  
    loadData();
    loadPromocoes();
  }, []); // Deixe as dependências vazias para garantir que o useEffect seja executado apenas na montagem  


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
    console.log('Dados recebidos para atualização: ', editedData)
    setEditando(false);
    const alarmeId = await AsyncStorage.getItem('alarmeId');
    const horariosId = await AsyncStorage.getItem('horariosId');
  
    try {
      const response = await api.put(`/alarmes/editar/${alarmeId}/${horariosId}`, editedData);
      if (response.status === 204) {
          console.log('Alarme atualizado com sucesso!');
          Vibration.vibrate(1000);
          Alert.alert('Seu alarme foi atualizado','Suas novas informações já estão atualizadas');
          navigate('Alarmes')
      } else {
        console.error('Erro ao atualizar os dados:', response.status);
      }
    } catch (err) {
      console.error('Erro ao fazer a solicitação para a API:', err);
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
              const horarios_id = await AsyncStorage.getItem('horariosId')
              const response = await api.delete(`/alarmes/deletar/${alarme_id}/${horarios_id}`);

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
  
  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate();
    const mes = dataObj.getMonth() + 1; // Os meses começam do zero
    const ano = dataObj.getFullYear();
  
    // Adicionando zeros à esquerda para manter o formato "dd/mm/yyyy"
    const diaFormatado = dia < 10 ? `0${dia}` : dia;
    const mesFormatado = mes < 10 ? `0${mes}` : mes;
  
    return `${diaFormatado}/${mesFormatado}/${ano}`;
  };

  const handleWhatsAppClick = (phoneNumber) => {
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;
    
    Linking.canOpenURL(whatsappURL).then((supported) => {
      if (supported) {
        return Linking.openURL(whatsappURL);
      } else {
        console.log("WhatsApp não está instalado no dispositivo.");
        Vibration.vibrate(100)
        Alert.alert('Whatsapp não instalado', 'O Whatsapp não foi encontrado no dispositivo.')
      }
    }).catch((error) => {
      Vibration.vibrate(100)
      Alert.alert('Erro ao abrir o Whatsapp', 'Ocorreu um erro. Por favor, tente novamente.')
      console.error('Erro ao abrir o WhatsApp:', error);
    });
  };

  const handleOpenMap = (fornecedor) => {
    const cep = AsyncStorage.getItem('CEP');
    const mapURL = `https://www.google.com/maps/search/?api=1&query=${fornecedor}`;
  
    Linking.canOpenURL(mapURL).then((supported) => {
      if (supported) {
        return Linking.openURL(mapURL);
      } else {
        Vibration.vibrate(100)
        Alert.alert('Nenhum app de mapa instalado', 'Não foram encontrados apps compatíveis com mapas no dispositivo.')
        console.log("Nenhum aplicativo de mapa suportado.");
      }
    }).catch((error) => {
      Vibration.vibrate(100)
      Alert.alert('Erro ao abrir o mapa', 'Ocorreu um erro. Por favor, tente novamente.')
      console.error('Erro ao abrir o aplicativo de mapa:', error);
    });
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
      <ScrollView>
        <KeyboardAvoidingView 
          style={{ flex: 2 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={stylesAlarmesDetails.alarmes}>
          {promocoes.length > 0 ? (
            promocoes.map((promocao, index) => (
              <View style={stylesAlarmesDetails.promocoesChild}key={promocao.promocoes_id}>
                  <View style={stylesAlarmesDetails.promocoesChildColumn}>
                    <View style={stylesAlarmesDetails.promocoesChildTitle}>
                      <MaterialCommunityIcons name="alert-octagram" size={24} color="#ff0000" />
                      <Text style={{fontWeight: 'bold', fontSize: 18, color: '#f00'}}>Promoção</Text>
                    </View>
                    <Text style={{fontSize: 16, marginTop: 10}}>
                        Temos uma promoção especial para você:
                    </Text>
                    <View style={stylesAlarmesDetails.promocoesChildLine}>
                      <Text style={stylesAlarmesDetails.promocao_titulo}>
                        {promocao.promocoes_medicamento}
                      </Text>
                      <Text style={stylesAlarmesDetails.promocao_preco}>
                        R$ {Number(promocao.promocoes_preco).toLocaleString('pt-BR')}
                      </Text>
                      
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <FontAwesome5 name="store-alt" size={18} color="#000" style={{margin: 10}}/>
                        <TouchableOpacity onPress={() => handleOpenMap(promocao.promocoes_fornecedor)}>
                          <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                            Na <Text style={{ fontWeight: 'bold' }}>{promocao.promocoes_fornecedor}</Text> mais próxima
                          </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <FontAwesome name="whatsapp" size={24} color="#090" style={{margin: 10}} />
                        <TouchableOpacity onPress={() => handleWhatsAppClick(promocao.promocoes_fornecedor_telefone)}>
                          <Text style={{ color: '#090', fontWeight: 'bold', fontSize: 16 }}>
                            {promocao.promocoes_fornecedor_telefone} - Peça Já
                          </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{textAlign: 'center', fontSize: 12, color: '#aaa'}}>Promoção válida até {formatarData(promocao.promocoes_fim)} ou enquanto durarem os estoques</Text>
                    </View>
                  </View>
              </View>
              )
             )
          ) : (null)}
        </View>
        <View style={stylesAlarmesDetails.alarmes}>
          {dados.length > 0 ? (
            dados.map((alarme) => (
              <View style={stylesAlarmesDetails.alarmesChild}key={`${alarme.alarme_id}_${alarme.horarios_id}`}>

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
                      <View style={sharedStylesForms.frequencia}>
                        <AntDesign name="calendar" size={24} color="#000" style={{marginRight: 10}}/>
                        <Text style={stylesAlarmesDetails.alarmesChildText}> Repete a cada </Text>
                        <TextInput keyboardType='numeric' style={{ padding: 2, textAlign: 'center', color: '#f00', fontWeight: 'bold', marginRight:5, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc'}}
                            value={editando ? editedData.alarme_recorrencia : dados[0].alarme_recorrencia}
                            onChangeText={(text) => {
                              setEditedData({ ...editedData, alarme_recorrencia: text });
                            }
                            }
                          />
                          <Text style={stylesAlarmesDetails.alarmesChildText}> dia(s)</Text>
                      </View>
                  </View>
                  ) : (
                  <View style={stylesAlarmesDetails.alarmesChildLine}>
                    <View style={sharedStylesForms.frequencia}>
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
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onSelectItem={(item) => {
                          console.log(item.value);
                        }}
                        onChangeValue={(item) => {
                          setEditedData({...editedData, medicamentos_tipo: item})
                        }}

                        style={{ backgroundColor: '#ccc', borderColor: '#77777722' }}
                        itemStyle={{
                          justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{ backgroundColor: '#aaaaaa' }}
                        dropDownDirection="TOP"
                        
                      />
                    </View>
                  ) : (
                    <View style={stylesAlarmesDetails.alarmesChildLine}>
                      {alarme.medicamentos_tipo === 'Liquido' ? (
                          <FontAwesome5 name="prescription-bottle-alt" size={24} color="#000" style={{ marginRight: 10 }}  />
                        ) : alarme.medicamentos_tipo === 'Gotas' ? (
                          <Ionicons name="water" size={24} color="#000" style={{ marginRight: 10 }} />
                        ) : alarme.medicamentos_tipo === 'Comprimido' ? (
                          <MaterialCommunityIcons name="pill" size={24} color="#000" style={{ marginRight: 10 }} />
                        ) : alarme.medicamentos_tipo === 'Injetavel' ? (
                          <FontAwesome5 name="syringe" size={24} color="#000" style={{ marginRight: 10 }} />
                        ) : (
                          <>
                          </>
                        )}
                      <Text style={stylesAlarmesDetails.alarmesChildText}>
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
                      {(alarme.count_disparos === 0 || alarme.count_disparos === null)
                          ? ('Este alarme ainda não foi disparado')
                          : (
                          <Text>
                            Esse alarme já disparou {alarme.count_disparos}x desde que foi definido.
                          </Text>
                      )}
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
      </ScrollView>
    </View>
  );
};