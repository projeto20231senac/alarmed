import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { sharedStylesForms } from './styles/sharedStylesForms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlarmeContext } from '../context/AlarmeContext';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
export const AlarmeRecorrencia = () => {
  const { adicionarAlarme } = useContext(AlarmeContext);

  const { navigate } = useNavigation();
  const [nomeMedicamento, setMedicamento] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [inicio,setInicio] = useState('')
  const [inputValue, setInputValue] = useState('');

  const onChange = ( event,selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    const formataHora = currentDate.toLocaleTimeString('pt-BR');

    setInputValue(formataHora);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const dataInicio =  date.toLocaleDateString('pt-BR');
  

  const showTimepicker = () => {
    showMode('time');
  };
  

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <ScrollView>
        <Text style={styles.title}>Qual é frequência?</Text>
        <View style={[{ flexDirection: 'row', alignItems: 'center',paddingTop:30,justifyContent:'center' }]}>
          <Text
            style={{ fontSize: 24 }}
          >
            A cada
          </Text>
          <TextInput
            keyboardType="numeric"
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              width: 60,
              borderWidth: 2,
              borderRadius: 8,
              borderColor: '#ccc',
              paddingVertical: 6,
              paddingHorizontal: 5,
              marginHorizontal:5
            }}
            value={nomeMedicamento}
            onChangeText={text => setMedicamento(text)}
          ></TextInput>
          <Text style={{ fontSize: 24 }}> dia(s)</Text>
        </View>
        <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:'center',paddingTop:10}}>
          <Text>Iniciando em</Text>
          <Text style={{fontWeight:'bold'}}> {dataInicio}</Text>
        </View>
        <View style={{paddingVertical:20}}>
          <Text style={{paddingHorizontal:20,fontWeight:'bold',paddingBottom:20}}>Horarios</Text>

          <View style={{paddingHorizontal:5,flexDirection:'row',alignItems:'center',justifyContent:"space-around"}}>
            <TextInput
              value={inputValue.slice(0,5)}
              onPressIn={() => {
                showTimepicker();
              }}
              placeholder="HH:MM"
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                width:75,
                borderWidth: 2,
                borderRadius: 8,
                borderColor: '#ccc',
                paddingVertical: 8,
                paddingHorizontal:5
              }}
            />
            {show && (
              <RNDateTimePicker
                onChange={onChange}
                is24Hour={true}
                mode="time"
                value={date}
               
              />
            )}
          <TouchableOpacity  onPress={onChange} style={{flexDirection:'row'}}>
          <Ionicons name="add-outline" size={24}  color="#0085FF" />
          <Text style={{color:"#0085FF",fontWeight:'bold'}}>Adicionar outro horário</Text>
          </TouchableOpacity>
          
          </View>
        </View>
        <View style={styles.areaButton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
