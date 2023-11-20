import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        backgroundColor: '#B3D8E9',
        alignItems:'center', 
        justifyContent:'center', 
        flex:1
    },
    textHeader: {
        fontSize: 40,
        fontFamily: 'Raleway_700Bold',
        width: '80%',
        marginLeft: 35,
        marginTop: -40
    },
    textDescription: {
        fontSize: 15,
        fontFamily: 'Nobile_400Regular',
        width: '80%',
        marginTop: 20,
        marginLeft: 35,
        marginBottom: 30
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2D2A29',
        borderRadius: 10,
        width: 200,
        height: 51,
    },
    buttonText: {
        fontFamily: 'Nobile_400Regular',
        fontSize: 20,
        color: 'white',
    },
})