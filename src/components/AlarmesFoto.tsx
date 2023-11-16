import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles/sharedStyles';
import { Logo } from './Logo';
import { api } from '../service/AlarmesService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
const [dados,setDados] = useState(null)

const { navigate } = useNavigation();
  const pickImage = async () => {
    const {granted} = await ImagePicker.requestCameraPermissionsAsync()
    if(!granted){
      Alert.alert(
          'Alarmed necessita acessar sua camera',
          'Clique em permitir para captura a foto do medicamento.',
          [
            
            { text: 'Permitir', onPress: () => {
              requestPermission
              } 
            },
          ],
        )
    
    }else{

      let {assets,canceled} = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
  
        quality: 1,
      });
      setImage(assets[0].uri);
     
    console.log(!canceled);
  
    if (canceled) {
      ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
    } else {
      const filename =  assets[0].uri.split('/').pop()
      // assets[0].uri.substring(assets[0].uri.lastIndexOf('/') + 1,assets[0].uri.length)
      const tipoImagem = filename.split('.').pop()
      console.log(filename );
      console.log(tipoImagem );
     const formaData = new FormData()
     formaData.append('foto',JSON.parse(JSON.stringify({
      name:filename,
      uri:assets[0].uri,
      type:'image/'+tipoImagem
     })))

  setDados(formaData)
     
    }
     
    }

  }
 
  
  const enviar = async () => {
    try {
      const id = await AsyncStorage.getItem("novoAlarmeId");
      const response = await api.put(`/alarmes/${id}/foto`, dados, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("AlarmesTipo")
      console.log("humm",response);
    } catch (error) {
      console.log("deu algo errado", error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo showBackButton={true} />
      <ScrollView>
        <Text style={styles.title}>Adicione uma foto do medicamento</Text>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <View style={styles.areaButton}>
            <TouchableOpacity style={[styles.imageButton]} onPress={pickImage}>
              <Text style={styles.buttonText}>Tirar foto</Text>
            </TouchableOpacity>
          </View>
        </View>
        {image && (
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingTop: 20,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 250, height: 300, borderRadius: 10 }}
            />
          </View>
        )}
      </ScrollView>
      {image && (
        <View style={styles.areaButton}>
          <TouchableOpacity style={styles.button} onPress={enviar}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}