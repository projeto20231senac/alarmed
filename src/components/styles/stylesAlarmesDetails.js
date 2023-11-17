import { StyleSheet } from 'react-native';

export const stylesAlarmesDetails = StyleSheet.create({
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        color: '#0085FF',
        margin: 10,
    },
    subtitle:{
        fontSize: 14,
        marginHorizontal: 10,
    },
    areaButton:{
        flexDirection:'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    addButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0085ff33',
        borderWidth: 1,
        borderColor: '#0085FF',
        borderRadius: 10,
        paddingVertical: 15,
        margin: 5,
    },
    editButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aaaaaa33',
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        paddingVertical: 15,
        marginHorizontal: 5,
    },
    addButtonText:{
        color: '#0085FF',
        fontSize: 20,
        paddingHorizontal: 3,
    },
    editButtonText:{
        color: '#555',
        fontSize: 20,
        paddingHorizontal: 3,
    },
    saveButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0085FF22',
        borderWidth: 1,
        borderColor: '#0085FF',
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    deleteButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF000022',
        borderWidth: 1,
        borderColor: '#F00',
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 10,
    },
    saveButtonText:{
        textAlign: 'center',
        fontSize: 16,
        color: '#0085FF',
    },
    cancelButtonText:{
        textAlign: 'center',
        fontSize: 16,
        color: '#F00',
        marginVertical: 10,
    },
    deleteButtonText:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f00',
    },
    alarmesChildText:{
        fontSize: 18,
        marginRight: 5,
    },
    imgAlarmesPage:{
        width: 20,
        height: 20, 
        marginVertical: 10,
        marginRight: 10,
    },
    imgAlarmes:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        marginVertical: 5,
        resizeMode:'contain'
    },
    alarmes:{
        flex:3,
    },
    alarmesChild:{
        backgroundColor: '#77777722',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        flexBasis: 200,
    },
    alarmesChildColumn:{
        flexDirection:'column',
        flexGrow: 2,
    },
    alarmesChildLine:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    alarmesChildTitle:{
        flex: 1,
        color: '#0085FF',
        fontWeight: '900',
        fontSize: 40,
        marginVertical: 5,
    },
    noAlarms:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    noAlarmsMessage:{
        fontSize: 18,
        marginVertical: 10,
        color: '#000',
        fontWeight: 'bold',
    },
    moreDetails:{
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    promocoesChild:{
        backgroundColor: '#77777722',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        flexBasis: 200,
    },
    promocoesChildColumn:{
        flexDirection:'column',
        flexGrow: 2,
    },
    promocoesChildLine:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginVertical: 5,
    },
    promocoesChildTitle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff000044',
        borderWidth: 1,
        borderColor: '#f00',
        borderRadius: 10,
        padding: 5,
    },
    promocao_titulo:{
        fontSize: 40,
        color: '#f00',
        fontWeight: 'bold',
    },
    promocao_preco:{
        color: '#000',
        fontSize: 24,
    },
})