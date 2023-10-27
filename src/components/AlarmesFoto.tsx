// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { Logo } from './Logo';
// import { useNavigation } from '@react-navigation/native';
// import { styles } from './styles/sharedStyles';
// import { stylesAlarmesFoto } from './styles/stylesAlarmesFoto';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ImagePicker from 'react-native-image-picker';
// import RNFS from 'react-native-fs';


// export const AlarmesFoto = () => {
//   const { navigate } = useNavigation();
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleChooseImage = () => {
//     const options = {
//       title: 'Selecione uma imagem',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images', // O diretório onde a imagem será armazenada temporariamente
//       },
//     };

//     ImagePicker.showImagePicker(options, (response) => {
//       if (response.didCancel) {
//         console.log('Usuário cancelou a seleção de imagem');
//       } else if (response.error) {
//         console.error('Erro ao selecionar imagem:', response.error);
//       } else if (response && response.uri){
//         const source = { uri: response.uri };

//         setSelectedImage(source);

//         // Salve a imagem no diretório do aplicativo
//         const imagePath = `src/assets/medicamentosImages/medicamento.jpg`; // Caminho de destino da imagem
//         RNFS.copyFile(response.uri, RNFS.DocumentDirectoryPath + '/' + imagePath)
//           .then(() => {
//             console.log('Imagem salva com sucesso:', imagePath);
//           })
//           .catch((error) => {
//             console.error('Erro ao salvar a imagem:', error);
//           });
//       }
//     });
//   };

//   const handleNextPage = () => {
//     navigate('PróximaPágina');
//   };

//   return (
//     <View style={styles.container}>
//       <Logo showBackButton={true} />
//       <Text style={styles.title}>Adicione uma foto do medicamento</Text>
//       <TouchableOpacity style={stylesAlarmesFoto.imageButton} onPress={handleChooseImage}>
//         {selectedImage && <Image source={selectedImage} style={stylesAlarmesFoto.image} />}
//         {!selectedImage && <Text style={stylesAlarmesFoto.imageText}>Clique para escolher uma imagem</Text>}
//       </TouchableOpacity>
//       <View style={styles.areaButton}>
//         <TouchableOpacity style={styles.button} onPress={handleNextPage}>
//           <Text style={styles.buttonText}>Continuar</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
