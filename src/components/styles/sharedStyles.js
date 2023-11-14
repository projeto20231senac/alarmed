import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 20,
    },
    containerTitleSubTitle: {
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: '#0085FF',
      paddingTop: 15,
    },
    containerMainContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginVertical: 10, 
    },
    containerMainContentChild: {
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
      paddingHorizontal: 45,
    },
    imgWelcomePage: {
      width: 30,
      height: 30,
    },
    description: {
      fontSize: 18,
      paddingLeft: 10,
    },
    subtitleMainContent: {
      paddingTop: 30,
      fontSize: 16,
      width: '100%',
      textAlign: 'center',
      color: '#0085FF',
    },
    terms: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 30,
    },
    termsText: {
      fontSize: 16,
    },
    termsTextHilighted: {
      fontSize: 16,
      color: '#0085FF',
      fontWeight: 'bold',
    },
    areaButton: {
      paddingTop: 20,
      paddingBottom: 10,
      paddingHorizontal: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      paddingVertical: 20,
      paddingHorizontal: 50,
      backgroundColor: '#0085FF',
      borderRadius: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    error:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f99',
      marginBottom: 10,
    },
    errorText:{
      color: '#f00',
    },
    link:{
      color: '#0085FF',
      fontWeight: 'bold',
    }
  });  