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
import {
    AntDesign,
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Entypo,
  } from '@expo/vector-icons';

export const AlarmesDose = () => {

  const { navigate } = useNavigation();
  const [dose, setDose] = useState('');
  const [unidade, setUnidade] = useState('');

  const handleNextPage = async () => {
    try {
        const cpf = await AsyncStorage.getItem('CPF');
        const novoAlarmeId = JSON.parse(await AsyncStorage.getItem('novoAlarmeId'))
        const novoMedicamentosId = JSON.parse(await AsyncStorage.getItem('novoMedicamentosId'))
        console.log(cpf, novoAlarmeId, novoMedicamentosId)

        const response = await api.put(`/medicamentos/editar/${novoMedicamentosId}`, {novoAlarmeId, cpf, dose, unidade})
       
        if (response.status === 204){
            console.log(`Dose (${dose}) e unidade (${unidade}) salvas com sucesso!`);
            navigate('AlarmesFrequencia')
        }else{
            console.error('Erro ao atualizar os dados:', response.status);
        }
    } catch (error) {
        console.error('Erro ao salvar a dose e unidade:', error);
    }

    // navigate('');
  }

  return (
    <View style={styles.container}>
        <Logo showBackButton={true} />
        <View style={sharedStylesForms.form}>
            <View style={sharedStylesForms.fieldset}>
                <Text style={styles.title}>Qual é a dose?</Text>
                <TextInput 
                    style={sharedStylesForms.input} 
                    value={dose}
                    onChangeText={(text) => setDose(text)}>
                </TextInput> 
            </View>
            <View style={sharedStylesForms.fieldset}>
                <Text style={styles.title}>Qual é a unidade?</Text>
                <TextInput 
                    style={sharedStylesForms.input} 
                    value={unidade}
                    onChangeText={(text) => setUnidade(text)}>
                </TextInput>
            </View> 
        </View>
        <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button} onPress={handleNextPage}>
            <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};