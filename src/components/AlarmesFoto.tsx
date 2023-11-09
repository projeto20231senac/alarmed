import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import { api } from '../service/AlarmesService';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

export default function AlarmesFoto() {
  const { navigate } = useNavigation();
  const [showCamera, setShowCamera] = useState(true);
  const [Permissao, requestPermissao] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [capturarImagem, setCapturarImagem] = useState(null);
  if (!Permissao) {
    
    return <View />;
  }

  if (!Permissao.granted) {
    // Permissões de câmera ainda não foram concedidas
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Para capiturar a foto precisamos acessar a sua camera</Text>
        <Button onPress={requestPermissao} title="Permitir" />
      </View>
    );
  }

  const imagem = async () => {
    if (cameraRef) {
      const options = { quality:0.8, base64: true,scale:2};
      const data = await cameraRef.takePictureAsync(options);
      setCapturarImagem(data.uri);
    }
  };
  // style={{  justifyContent: 'center', alignItems: 'center',backgroundColor:'red' }}
  async function salvarFoto(){
    try {
      const imagem = capturarImagem
      await AsyncStorage.setItem("foto",imagem)
      navigate("Alarmes")
    
    } catch (error) {
      console.log("erro ao salvar foto",error);
      
    }
  }
  const cancelCapture = () => {
    setCapturarImagem(null);
    setShowCamera(true);
  };
 
  
  return (
    <View style={styles.container}>
      {/* <StatusBar/> */}
      {showCamera && (  <View style={styles.container}>
      <Camera style={styles.camera}  type={Camera.Constants.Type.back}  ref={(ref) => { setCameraRef(ref); }}>
        <View style={styles.buttonContainer}> 
        <TouchableOpacity onPress={imagem} style={styles.button}>
          {/* <Text  style={styles.text}> T</Text> */}
          {/* <AntDesign name="camera" size={64} color="#fff" /> */}
          <Entypo name="camera" size={64} color="white" />
        </TouchableOpacity>
        </View>
    
      </Camera>
      </View>)}
     
        <View style={styles.imagem}>
        {capturarImagem && (
          <View style={{  justifyContent: 'center', alignItems: 'center' }}>
          <View >
            <Image source={{ uri: capturarImagem }} style={{ width: 400, height: 600}} />
           </View>
          <View style={styles.botaoArea}>
               <TouchableOpacity onPress={cancelCapture} style={{ justifyContent: 'center', alignItems: 'center' ,padding:8}}>
                <Text  style={styles.botaoCancelar}> Cancelar</Text>
                </TouchableOpacity>
              <TouchableOpacity onPress={salvarFoto} style={{ justifyContent: 'center', alignItems: 'center',padding:8 }}>
                <Text  style={styles.botaoSalvar}> Salvar foto</Text>
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
  
  },
  camera: {
    flex:1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    alignItems:'center',
    justifyContent:'center',
  },
 
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center'
  },
  button: {
      alignSelf: 'flex-end',
      justifyContent:'center',
    backgroundColor: 'transparent',
    borderRadius:100,
    height:70,
    width:70
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagem:{
    
    
  },
  botaoArea:{
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    paddingBottom:30
  },
  botaoSalvar: {
    padding: 15,
    color:'white',
    fontWeight:'bold',
    backgroundColor: '#0085FF',
    borderRadius: 10,
  },
  botaoCancelar: {
    padding: 15,
    color:'white',
    fontWeight:'bold',
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  
});
