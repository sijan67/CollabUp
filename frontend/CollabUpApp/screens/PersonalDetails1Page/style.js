import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        backgroundColor: '#B3D8E9',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createAccountContainer: {
        marginTop: 30
    },
    textHeader: {
        fontSize: 40,
        fontFamily: 'Raleway_700Bold',
        width: '80%',
    },
    textDescription: {
        fontSize: 15,
        fontFamily: 'Nobile_400Regular',
        width: 346,
        marginTop: 20
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
    numericalInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black',
        width: 346,
        height: 53,
        fontFamily: 'Nobile_400Regular',
        fontSize: 17,
        padding: 12,
        marginTop: 10
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
    inputHeader: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        marginTop: 20
    },
})