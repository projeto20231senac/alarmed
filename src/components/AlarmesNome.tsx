import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { sharedStylesForms } from './styles/sharedStylesForms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AlarmeContext} from '../context/AlarmeContext'
export const AlarmesNome = () => {
const {adicionarAlarme} = useContext(AlarmeContext)

  const { navigate } = useNavigation();
  const [nomeMedicamento, setMedicamento] = useState('');

  const handleNextPage = async () => {
    try {
        // Salvando o valor do nomeMedicamento no AsyncStorage
        // await AsyncStorage.setItem('AlarmesNome', nomeMedicamento);
        // const f = await AsyncStorage.getItem('foto');
        // console.log("entao salvou",f);
        adicionarAlarme(nomeMedicamento)
        console.log(`Medicamento (${nomeMedicamento}) salvo com sucesso!`);
    } catch (error) {
        console.error('Erro ao salvar o medicamento:', error);
    }

    navigate('AlarmesFoto');
  
  }

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <Text style={styles.title}>Qual é o nome do medicamento?</Text>
      <View style={sharedStylesForms.form}>
        <TextInput 
            style={sharedStylesForms.input} 
            value={nomeMedicamento}
            onChangeText={(text) => setMedicamento(text)}>
        </TextInput> 
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button} onPress={handleNextPage}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};