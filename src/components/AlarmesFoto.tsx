import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View ,Image, SafeAreaView, useWindowDimensions, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import {  Entypo } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function AlarmesFoto() {
  const { navigate } = useNavigation();
  const [showCamera, setShowCamera] = useState(true);
  const [ratio, setRatio] = useState('4:3')
  const [type, setType] = useState(CameraType.back);
  const [Permissao, requestPermissao] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [capturarImagem, setCapturarImagem] = useState(null);
  const [imageMargin, setImagePadding] = useState(0)
  const cameraDimensao = useWindowDimensions()
  const cameraAltura = cameraDimensao.height
  const cameraLargura = cameraDimensao.width
  const screenRatio = cameraAltura/ cameraLargura


  if (!Permissao) {
    
    return <View />;
  }

  if (!Permissao.granted) {
    // Permissões de câmera ainda não foram concedidas
    return (
      Alert.alert(
        'Alarmed necessita acessar sua camera',
        'Clique em permitir para captura a foto do medicamento.',
        [
          
          { text: 'Aceitar', onPress: () => {
            requestPermissao
            } 
          },
        ],
      )
    );
  }

  // função para capturar a imagem
  const imagem = async () => {
    if (cameraRef) {
      const options = { quality:0.8, base64: true,};
      const data = await cameraRef.takePictureAsync(options);
      setCapturarImagem(data.uri);
    }
  };
  // função para calcular a proporção da camera de acordo com altura e largura o dispositivo
   async function proporcoesCamera(){
    if(Platform.OS === 'android' && cameraRef){
      let cameraProporcao= screenRatio
      const ratios =await cameraRef.getSupportedRatiosAsync()
      let proporcaoReal=0
      let distancias = {};
      let ratioCamera = 0
      let minDistancia =null
      let valoresReais={}
      for(const ratio of ratios){
        const proporcao = ratio.split(':');
        proporcaoReal = parseInt(proporcao[0]) / parseInt(proporcao[1]);
        valoresReais[ratio] = proporcaoReal
        const distancia = cameraProporcao -proporcaoReal
        distancias[ratio] = proporcaoReal

        if(minDistancia=== null){
          minDistancia = ratio
        }else if (distancia >= 0 && distancia < distancias[minDistancia]) {
              minDistancia= ratio;
            }
      }
      
   ratioCamera = minDistancia
   
  //  calculando o margin a ser adicionado na camera
   const remainder = Math.floor(
    (cameraAltura - distancias[ratioCamera] * cameraLargura) / 2
  );
  
  setImagePadding(remainder);
  setRatio(minDistancia)
    }
 }
  proporcoesCamera()
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
   
   <View  style={styles.container} >
      <StatusBar/>
      
      {showCamera && (  <View style={styles.container}>
      <Camera  ratio={ratio} style={[styles.camera,{marginTop: imageMargin, marginBottom: imageMargin}]}  type={type}  autoFocus={Camera.Constants.AutoFocus.on} ref={(ref) => { setCameraRef(ref); }}>
        <View style={styles.botaoArea}> 
        <TouchableOpacity onPress={imagem} style={[styles.button,{width:cameraLargura}]}>
          <Entypo name="camera" size={64} color="white"  />
        </TouchableOpacity>
        </View>
    
      </Camera>
      </View>)}
     
        <View>
        {capturarImagem && (
          <View style={{  justifyContent: 'center', alignItems: 'center' }}>
          <View >
            <Image source={{ uri: capturarImagem }} style={{ flex:1,width: cameraLargura,height:cameraAltura}} />
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
    justifyContent:'center',
    backgroundColor:'#000'
  },
  camera: {
   flex:1, 
  },
  // buttonContainer: {
  //   // flex: 1,
  //   position: 'absolute',
  //   bottom:0,
  //   flexDirection: 'row',
  //   backgroundColor: 'transparent',
  //   // margin:20,
  //   alignItems:'center',
  //   justifyContent:'space-between'
  // },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center'
  },
  button: {
      alignSelf: 'flex-end',
      justifyContent:'center',
      alignItems:'center',
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
  botaoArea:{
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    alignItems:'center',
    justifyContent:'space-evenly',
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
