import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#B3D8E9',
        alignItems:'center', 
        justifyContent:'center', 
        flex:1,
    },
    image: {
        top: -50
    },
    welcomeHeaderText: {
        fontFamily: 'PlayfairDisplay_400Regular',
        fontSize: 57,
        marginTop: 15,
        top: -50
    },
    welcomeDescriptionText: {
        fontFamily: 'Nobile_400Regular',
        fontSize: 16,
        marginTop: 15,
        width: '80%',
        top: -50
    },
    joinNowButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2D2A29',
        borderRadius: 10,
        width: 346,
        height: 51,
        marginTop: 40,
        top: -50
    },
    joinNowButtonText: {
        fontFamily: 'Nobile_400Regular',
        fontSize: 20,
        color: 'white'
    },
    haveAccountText: {
        fontFamily: 'Nobile_400Regular',
        color: '#555454',
        fontSize: 16
    },
    loginText: {
        fontFamily: 'Nobile_700Bold',
        color: 'black',
        fontSize: 16
    }
})