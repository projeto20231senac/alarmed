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

export const AlarmesNome = () => {

  const { navigate } = useNavigation();
  const [medicamento, setMedicamento] = useState('');

  const handleNextPage = async () => {
    try {
        // Salvando o valor do medicamento no AsyncStorage
        await AsyncStorage.setItem('AlarmesNome', medicamento);
        console.log(`Medicamento (${medicamento}) salvo com sucesso!`);
    } catch (error) {
        console.error('Erro ao salvar o medicamento:', error);
    }

    // navigate('AlarmesFoto');
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