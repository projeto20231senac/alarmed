import { StyleSheet } from 'react-native';

export const sharedStylesForms = StyleSheet.create({
    input: {
      width: '100%',
      height: 60,
      borderWidth: 2,
      borderRadius: 8,
      fontSize: 20,
      paddingHorizontal: 20,
      borderColor: '#77777722',
      textAlign: 'center',
    },
    form: {
      width: '100%',
      padding: 20,
      marginVertical: 30,
      flex: 1,
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
    }
  });