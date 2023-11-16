import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { sharedStylesForms } from './styles/sharedStylesForms';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/AlarmesService';
import { FontAwesome } from '@expo/vector-icons';

export const AlarmeRecorrencia = () => {
    const { navigate } = useNavigation();
    const [horario, setHorario] = useState(new Date());
    const [horariosSelecionados, setHorariosSelecionados] = useState([]);
    const [recorrencia, setRecorrencia] = useState('1');
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [tempSelectedTime, setTempSelectedTime] = useState(null);

    const handleNextPage = async () => {
        await handleEditarRecorrencia();
        await handleAdicionarHorarios();
        navigate('Alarmes');
    };

    const handleEditarRecorrencia = async () => {
        try {
          // Chama a API para editar a recorrência
          const cpfNovoAlarme = await AsyncStorage.getItem('CPF');
          const novoAlarmeId = JSON.parse(await AsyncStorage.getItem('novoAlarmeId'))
          console.log("Editar recorrencia: ", cpfNovoAlarme, novoAlarmeId)
          
          const response = await api.put(`/alarmes/recorrencia/${cpfNovoAlarme}/${novoAlarmeId}`, {recorrencia});

            if (response.status === 204){
                console.log(`Recorrencia (${recorrencia}) salva com sucesso!`);
            }else{
                console.error('Erro ao atualizar a recorrencia:', response.status);
            }
        } catch (error) {
          console.error('Erro ao editar recorrência:', error);
        }
    };

    const handleAdicionarHorarios = async () => {
        await handleEditarRecorrencia();

        try {
            // Chama a API para adicionar horários
            const cpfNovoAlarme = await AsyncStorage.getItem('CPF');
            const novoAlarmeId = JSON.parse(await AsyncStorage.getItem('novoAlarmeId'))
            const novoMedicamentosId = JSON.parse(await AsyncStorage.getItem('novoMedicamentosId'))
            console.log("Inserir horarios: ", cpfNovoAlarme, novoAlarmeId, novoMedicamentosId)
            const response = await api.post(`/horarios/${cpfNovoAlarme}/${novoAlarmeId}/${novoMedicamentosId}`, {
                horarios: horariosSelecionados.map((horario) => {
                    // Zerar os segundos manualmente
                    horario.setSeconds(0);
            
                    // Formatar o horário
                    const formattedHorario = horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    console.log("Horarios selecionados: ", formattedHorario);
                    return formattedHorario;
                }),
            });
        
            if (response.status === 200){
                console.log(`Horarios (${horario}) salvos com sucesso!`);
                navigate('Alarmes')
            }else{
                console.error('Erro ao inserir os horarios:', response.status);
            }
        } catch (error) {
            console.error('Erro ao adicionar horários:', error.response ? error.response.data : error);
        }
      };
  
    useEffect(() => {
      const obterHoraAtual = () => {
        const dataAtual = new Date();
        const horas = dataAtual.getHours();
        const minutos = dataAtual.getMinutes();
  
        // Formatar para hh:mm:ss
        const horaFormatada = `${horas}:${minutos < 10 ? '0' : ''}${minutos}`;
  
        return horaFormatada;
      };
  
      setHorario(new Date());
      setInputValue(obterHoraAtual());
    }, []);
  
    const onChange = (event, selectedTime) => {
    setShow(Platform.OS === 'ios');

    if (event && event.type === 'set' && selectedTime) {
      // O usuário confirmou a seleção (clicou em "OK")
      Platform.OS === 'ios' ? setTempSelectedTime(selectedTime) : setHorariosSelecionados([...horariosSelecionados, selectedTime]);

      const formattedTime = selectedTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const formattedTimeString = selectedTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'});
      console.log('Salvando no BD', formattedTimeString);

      setInputValue(formattedTime);
    } else if (event && event.type === 'dismissed') {
      // O usuário fechou o seletor sem selecionar um horário
      console.log('Usuário fechou o seletor sem selecionar um horário');
      Platform.OS === 'ios' ? handlePress() : null
    }
  };

    const handlePress = () => {
      // Adiar a chamada da função onChange até que o usuário clique fora do seletor de horário
      if (Platform.OS === 'ios') {
        setHorariosSelecionados([...horariosSelecionados, tempSelectedTime]);
        setTempSelectedTime(null);
      }
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode('time');
    };
  
    const showDatepicker = () => {
      showMode();
    };
  
    const handleAddAnotherTime = () => {
      setShow(true);
      setMode('time'); // Esconder o botão "Adicionar outro horário"
    };

    const handleDeleteTime = (index) => {
        const updatedHorarios = [...horariosSelecionados];
        updatedHorarios.splice(index, 1);
        setHorariosSelecionados(updatedHorarios);
      };
  
    return (
      <View style={styles.container}>
        <Logo showBackButton={true} />
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 2 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Text style={styles.title}>Qual é a frequência?</Text>
            <View style={sharedStylesForms.form}>
                  <View style={sharedStylesForms.frequenciaContainer}>
                      <View style={sharedStylesForms.frequencia}>
                          <Text style={sharedStylesForms.text}>Repete a cada </Text>
                          <TextInput value={recorrencia} onChangeText={(text) => {setRecorrencia(text)}} keyboardType="numeric" autoFocus style={{ padding: 5, borderRadius: 10, textAlign: 'center', color: '#f00', fontWeight: 'bold', marginRight:5, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', fontSize: 24}} />
                          <Text style={sharedStylesForms.text}> dia(s)</Text>
                      </View>
                      <Text style={{fontSize: 16}}>Iniciando em <Text style={{fontWeight: 'bold'}}>{new Date().toLocaleDateString('pt-BR')}</Text></Text>
                  </View>
              <View style={sharedStylesForms.frequenciaFieldset}>
                  <Text style={sharedStylesForms.horariosTitle}>Horários</Text>
                  {horariosSelecionados.map((horario, index) => (
                  <View style={{flexDirection:'row', alignItems: 'center', marginHorizontal: 15}} key={index}>
                      <TextInput
                      value={horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      onPressIn={showDatepicker}
                      placeholder="00:00"
                      style={sharedStylesForms.readonly}
                      editable = {false}
                      />
                      <TouchableOpacity style={{}} onPress={() => handleDeleteTime(index)}>
                          <FontAwesome name="trash" size={22} color="#f00"  />
                      </TouchableOpacity>
                  </View>
                  ))}
                  {Platform.OS === 'ios' ? (
                    <TouchableWithoutFeedback onPress={handlePress}>
                      <DateTimePicker
                          testID="dateTimePicker"
                          value={horario}
                          mode={'time'}
                          is24Hour={true}
                          onChange={onChange}
                          locale="pt-BR"
                          display='default'
                          style={{margin: 10}}
                      />
                    </TouchableWithoutFeedback>
                  ) : (
                  <>
                      {show && (
                      <DateTimePicker
                          testID="dateTimePicker"
                          value={horario}
                          mode={'time'}
                          is24Hour={true}
                          onChange={onChange}
                      />
                      )}
                  </>
                  )}
                  {Platform.OS !== 'ios' && (
                    <TouchableOpacity onPress={handleAddAnotherTime}>
                      <Text style={styles.link}>+ Adicionar horário</Text>
                    </TouchableOpacity>
                  )}
              </View>
            </View>
            <View style={styles.areaButton}>
              <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  };