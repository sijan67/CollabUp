import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        backgroundColor: '#B3D8E9',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    uploadPictureButton: {
        marginTop: 50,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#538DB8',
        height: 150,
        width: 270,
        borderRadius: 20
    },
    innerUploadPictureButton: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#D9D9D9',
        borderWidth: 2,
        borderStyle: 'dashed',
        height: 130,
        width: 240,
        borderRadius: 20
    },
    profileImage: {
        marginTop: 30,
        width: 250,
        height: 250,
        borderRadius: 250/2,
      }
})