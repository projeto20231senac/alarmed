import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',

    },
    logo: {
      width: 200,
      height: 50,
    },
    containerLogo: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',

    },
    back: {
      padding: 15,
      right: 50,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      top: 50,
      width: '100%',
    },
  });