import { StyleSheet } from 'react-native';

export const sharedStylesForms = StyleSheet.create({
    input: {
      width: '100%',
      height: 60,
      borderWidth: 2,
      borderRadius: 8,
      fontSize: 20,
      paddingHorizontal: 20,
      borderColor: '#ccc',
      textAlign: 'center',
    },
    readonly:{
      maxWidth: '100%',
      height: 60,
      borderWidth: 1,
      fontSize: 20,
      paddingHorizontal: 20,
      margin: 10,
      backgroundColor: '#ccc',
      borderColor: '#77777722',
      textAlign: 'center',
      color: '#000',
      fontWeight: 'bold'
    },
    text:{
      fontSize: 24
    },
    form: {
      width: '100%',
      padding: 20,
      flex: 2,
    },
    fieldset:{
      marginVertical: 10,
    },
    terms:{
      maxHeight: 500,
      backgroundColor: '#77777722',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 20,
      margin: 30,
      borderRadius: 10,
    },
    termsText:{
      textAlign: 'justify',
    },
    datetime:{
      width: '100%',
    },
    frequencia:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    frequenciaContainer:{
      flex: 1,
      flexDirection: 'Column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    frequenciaFieldset:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginVertical: 20,
    },
    horariosTitle:{
      width: '100%',
      fontSize: 22,
      fontWeight: 'bold'
    }
  });