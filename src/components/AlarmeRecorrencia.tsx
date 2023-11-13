import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  FlatList,
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
  const {  adicionarHorario,horario} = useContext(AlarmeContext);


  const { navigate } = useNavigation();
  const [nomeMedicamento, setMedicamento] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [inicio,setInicio] = useState('')
  const [inputValue, setInputValue] = useState('');
console.log("h",horario);

  const onChange = ( event,selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    const formataHora = currentDate.toLocaleTimeString('pt-BR');
    
    setInputValue(inputValue);
    adicionarHorario(formataHora)
  
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
        <ScrollView style={{flex:1}}>
        <View style={{paddingVertical:20,flex:1}}>
          <Text style={{fontSize:24,paddingHorizontal:20,fontWeight:'bold',paddingBottom:20}}>Horarios</Text>
            <View  style={{paddingHorizontal:20,paddingBottom:20}}>
              <FlatList data={horario}   renderItem={({item}) => <Text>{item} </Text>}/>
            </View>
          <View style={{paddingHorizontal:20,alignItems:'center',justifyContent:"space-between"}}>
            
            {show && (
              <RNDateTimePicker
                onChange={onChange}
                is24Hour={true}
                mode="time"
                value={date}
               
              />
            )}
            {horario.length !== 0 && (
               <TouchableOpacity   onPressIn={() => {
                showTimepicker();
              }} style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name="add-outline" size={24}  color="#0085FF" />
          <Text style={{color:"#0085FF",fontWeight:'bold'}}>Adicionar outro horário</Text>
          </TouchableOpacity>
            )}
            {horario.length === 0 &&(

          <TouchableOpacity   onPressIn={() => {
                showTimepicker();
              }} style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name="add-outline" size={24}  color="#0085FF" />
          <Text style={{color:"#0085FF",fontWeight:'bold'}}>Adicionar horário</Text>
          </TouchableOpacity>
            )}
          
          </View>
        </View>
        </ScrollView>
        <View style={styles.areaButton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
   
    </View>
  );
};
