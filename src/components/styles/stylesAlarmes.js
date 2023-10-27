import { StyleSheet } from 'react-native';

export const stylesAlarmes = StyleSheet.create({
    title:{
        width: '95%',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0085FF',
    },
    subtitle:{
        fontSize: 14,
        width: '95%',
        fontWeight: 'bold',
    },
    button:{
        backgroundColor: '#0085ff33',
        borderWidth: 1,
        borderColor: '#0085FF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 70,
    },
    buttonText:{
        color: '#0085FF',
        fontSize: 16,
    },
    noAlarmsMessage:{
        fontSize: 18,
        flex: 1,
        marginVertical: 100,
        color: '#000',
        // fontWeight: 'bold',
    }
})