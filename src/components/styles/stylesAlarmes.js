import { StyleSheet } from 'react-native';

export const stylesAlarmes = StyleSheet.create({
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0085FF',
        marginHorizontal: 10,
    },
    subtitle:{
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    button:{
        backgroundColor: '#0085ff33',
        borderWidth: 1,
        borderColor: '#0085FF',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 70,
    },
    buttonText:{
        color: '#0085FF',
        fontSize: 16,
    },
    frequencia:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,        
        marginVertical: 5,
        borderTopWidth: 1,
        borderStyle: 'dashed',
        borderTopColor: '#aaa',       
    },
    frequenciaText:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    imgAlarmesPage:{
        width: 20,
        height: 20, 
        marginVertical: 10,
        marginRight: 10,
    },
    imgAlarmes:{
        width: 85,
        height: 85,
        margin: 5,
    },
    alarmes:{
        flex:3,
    },
    alarmesChild:{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#55555533',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        flexBasis: 200,
        flexWrap: 'wrap',
    },
    alarmesChildColumn:{
        flexDirection:'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexGrow: 2,
    },
    alarmesChildLine:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    alarmesChildTitle:{
        flex: 1,
        color: '#0085FF',
        fontWeight: '900',
        fontSize: 24,
    },
    alarmesChildHora:{
        color: '#f00',
        fontWeight: '900',
        fontSize: 24,
    },
    noAlarmsMessage:{
        fontSize: 18,
        flex: 1,
        marginVertical: 100,
        color: '#000',
        // fontWeight: 'bold',
    },
    moreDetails:{
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
})