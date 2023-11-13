import React, { useState } from 'react';
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
import { api } from '../service/AlarmesService';

export const AlarmesNome = () => {

  const { navigate } = useNavigation();
  const [medicamento, setMedicamento] = useState('');

  const handleNextPage = async () => {
    try {
        // Salvando o valor do medicamento no AsyncStorage
        await AsyncStorage.setItem('novoAlarmeNome', medicamento);
        const cpf = await AsyncStorage.getItem('CPF');

        const response = await api.post('/alarmes', {medicamento, cpf})

        if(response.status === 200){
          const { alarme_id } = response.data;
          console.log('Alarme ID do novo medicamento: ', alarme_id)
          await AsyncStorage.setItem('novoAlarmeId', JSON.stringify(alarme_id));
          console.log(`Medicamento (${medicamento}) salvo com sucesso!`);
          navigate('AlarmesTipo');
        }else{
          console.log('Erro ao salvar o medicamento no BD.')
        }
    } catch (error) {
        console.error('Erro ao salvar o medicamento:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <Text style={styles.title}>Qual é o nome do medicamento?</Text>
      <View style={sharedStylesForms.form}>
        <TextInput 
            style={sharedStylesForms.input} 
            value={medicamento}
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