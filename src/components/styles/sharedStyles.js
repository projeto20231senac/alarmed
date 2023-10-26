import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      // width: '100%',
      alignItems: 'center',
      paddingVertical: 20,
    },
    logo: {
      width: 200,
      height: 50,
    },
    containerLogo: {
      flex: 1,
      justifyContent: 'center',
    },
    containerTitleSubTitle: {
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      textAlign: 'center',
      color: '#0085FF',
  
      paddingTop: 15,
    },
    containerMainContent: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'center',
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
      fontSize: 18,
      width: '100%',
      textAlign: 'center',
      color: '#0085FF',
    },
  
    terms: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 20,
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
      paddingHorizontal: 45,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      padding: 15,
      paddingLeft: 80,
      paddingRight: 80,
      backgroundColor: '#0085FF',
      borderRadius: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });  