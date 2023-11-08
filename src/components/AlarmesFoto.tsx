import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import { api } from '../service/AlarmesService';

export default function AlarmesFoto() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Para capiturar a foto precisamos acessar a sua camera</Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.8, base64: true, skipProcessing: true };
      const data = await cameraRef.takePictureAsync(options);
      
     
      setCapturedImage(data.uri);
    
    
    }
  };
  



  async function salvarFoto(){
    try {
      
      const cpf = await AsyncStorage.getItem('CPF');
      const nome = await AsyncStorage.getItem('AlarmesNome')
      
      const imagem = {cpf,nome,capturedImage}
    const salvar = await api.post('/alarmes',imagem)
    console.log("enviado",imagem);
    
      
    } catch (error) {
      console.log("erro ao salvar foto",error);
      
    }
  }
  salvarFoto()
  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref) => { setCameraRef(ref); }}>
        <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text  style={styles.text}> Tirar foto </Text>
        </TouchableOpacity>
        </View>
    
      </Camera>
      
      
    </View>
        <View style={{position:'absolute', justifyContent: 'center', alignItems: 'center',height:800 }}>
        {capturedImage && (
        <View style={{  justifyContent: 'center', alignItems: 'center',backgroundColor:'red' }}>
          <Image source={{ uri: capturedImage }} style={{ width: 500, height: 500 }} />
           <View style={{flexDirection:'row',marginTop:10}}>
               <TouchableOpacity onPress={takePicture} style={{ justifyContent: 'center', alignItems: 'center' ,padding:8}}>
                <Text  style={{color: 'black',backgroundColor:'gray',padding:8}}> Cancelar</Text>
                </TouchableOpacity>
              <TouchableOpacity onPress={salvarFoto} style={{ justifyContent: 'center', alignItems: 'center',padding:8 }}>
                <Text  style={{color: 'black',backgroundColor:'blue',padding:8}}> Salvar foto</Text>
              </TouchableOpacity>
           </View>
        </View>
      )}
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
