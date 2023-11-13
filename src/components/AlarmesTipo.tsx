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
import DropDownPicker from 'react-native-dropdown-picker';
import {
    AntDesign,
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Entypo,
  } from '@expo/vector-icons';

export const AlarmesTipo = () => {

  const { navigate } = useNavigation();
  const [tipo, setTipo] = useState('');

  const [open, setOpen] = useState(true);
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

  const handleNextPage = async () => {
    try {
        // Salvando o valor do medicamento no AsyncStorage
        await AsyncStorage.setItem('AlarmesTipo', tipo); 
        const cpf = await AsyncStorage.getItem('CPF');
        const novoAlarmeId = JSON.parse(await AsyncStorage.getItem('novoAlarmeId'))
        console.log(tipo, novoAlarmeId, cpf)

        const response = await api.post(`/tipo/${novoAlarmeId}`, {tipo, cpf})
       
        if (response.status === 200){
            const { medicamentos_id } = response.data;
            await AsyncStorage.setItem('novoMedicamentosId', JSON.stringify(medicamentos_id));
            console.log(medicamentos_id)
            console.log(`Tipo (${tipo}) salvo com sucesso!`);
            navigate('AlarmesDose')
        }else{
            console.error('Erro ao atualizar os dados:', response.status);
        }
    } catch (error) {
        console.error('Erro ao salvar o tipo:', error);
    }

    // navigate('');
  }

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <Text style={styles.title}>Qual é o tipo do medicamento?</Text>
      <View style={sharedStylesForms.form}>
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
                    setTipo(item)
                }}

                style={{ backgroundColor: '#fff', borderColor: '#77777722' }}
                dropDownContainerStyle={{
                  backgroundColor: "#fff",
                  borderColor: '#77777722',
                  borderTopWidth: 0,
                }}
                dropDownDirection="BOTTOM"
                placeholder='Selecione o tipo do medicamento'
                autoScroll={true}
            /> 
      </View>
      <View style={styles.areaButton}>
        <TouchableOpacity style={styles.button} onPress={handleNextPage}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};