import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Logo } from './Logo';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedStyles';
import { stylesDTNasc } from './styles/stylesDTNasc';
import DateTimePicker from '@react-native-community/datetimepicker';

export const Nascimento = () => {

  const { navigate } = useNavigation();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('')

  const handleNextPage = () => {
    navigate('Alarmes')
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);

    const formattedDate = currentDate.toLocaleDateString('pt-BR');
  
    setInputValue(formattedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <Text style={styles.title}>Qual é a sua data de nascimento?</Text>
      <View style={stylesDTNasc.form}>
        <View>
            {Platform.OS === 'ios' ? (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    onChange={onChange}
                    display='spinner'
                    textColor='#000'
                    locale='pt-BR'
                />
            ): (
                <>
                <TextInput 
                    value={inputValue} 
                    onPressIn={() => {
                        showDatepicker();
                    }}
                    placeholder="00/00/0000" 
                    style={stylesDTNasc.input} />
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    onChange={onChange}
                    display='spinner'
                    />
                )}
            </>    
            )}
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