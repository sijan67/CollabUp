import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        backgroundColor: '#B3D8E9',
        alignItems:'center', 
        justifyContent:'center', 
        flex:1
    },
    welcomeContainer: {
        marginTop: -100
    },
    loginContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    welcomeHeaderText: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 40,
        width: '50%',
        marginTop: 20
    },
    welcomeDescriptionText: {
        fontFamily: 'Nobile_400Regular',
        fontSize: 15,
        marginTop: 0
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black',
        width: 346,
        height: 53,
        fontFamily: 'Nobile_400Regular',
        fontSize: 17,
        padding: 15,
        marginTop: 10
    },
    inputHeader: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        marginTop: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2D2A29',
        borderRadius: 10,
        width: 346,
        height: 51,
        marginTop: 40,
    },
    buttonText: {
        fontFamily: 'Nobile_400Regular',
        fontSize: 20,
        color: 'white'
    },
})