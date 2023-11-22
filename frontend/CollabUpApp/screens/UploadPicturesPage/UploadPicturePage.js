import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import style from './style'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { addUserPicture } from '../../api/UserAPI'


function UploadPicture() {
  const [image, setImage] = useState('')
  const navigation = useNavigation();
  const route = useRoute()
  const { username } = route.params

  const pickImage = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 0.01
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const onDone = () => {
    FileSystem.readAsStringAsync(image, {encoding: FileSystem.EncodingType.Base64})
    .then(res => {
      addUserPicture(username, 'data:image/png;base64,' + res)
      .then(res => {
        navigation.navigate("Login")
      }).catch(error => console.log(error))
    })
  }
  return (
  <SafeAreaView style={style.container}>
    <Text style={style.textHeader}>Upload a Picture</Text>
    <Text style={style.textDescription}>Personalize your account with a profile picture upload.</Text>
    {image ? 
      <Image source={{ uri: image }} style={style.profileImage}/> : 
      <Image source={require('../../assets/default-profile.png')} style={style.profileImage}/>
    }
    <View style={style.uploadPictureButton}>
      <TouchableOpacity onPress={pickImage} style={style.innerUploadPictureButton}>
        <Feather name='upload' size={80} color='black' />
      </TouchableOpacity>
    </View>
    <View style={{flexDirection: 'row', gap: 100, marginTop: 50}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name='arrow-left-circle' size={40} color='black' />
      </TouchableOpacity>
      <TouchableOpacity style={style.button} onPress={() => onDone()}>
        <Text style={style.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}
export default UploadPicture
