import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import style from './style'
import { loginUser } from '../../api/UserAPI'
import { showMessage } from 'react-native-flash-message'
import ControlledInput from '../../components/ControlledInput'
import { useUserContext } from '../../context/user-context'

function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useUserContext()

  const {
    control,
    watch,
    formState: {isValid},
  } = useForm({mode: "onChange"})

  const onLogin = () => {
    loginUser(
      watch('loginName'),
      watch('loginPassword')
    )
    .then((res) => {
      setUser(watch('loginName'))
      navigation.navigate('Home')
    })
    .catch((error) => {
      showMessage({
        message: 'Invalid credentials. Try logging in again.',
        type:'danger'
      })
    })
  }

  return (
    <View style={style.container}>
      <View style={style.welcomeContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name='arrow-left-circle' size={40} color='black' />
        </TouchableOpacity>
        <Text style={style.welcomeHeaderText}>Welcome Back!👋</Text>
        <Text style={style.welcomeDescriptionText}>Hello again, you've been missed!</Text>
      </View>
      <View style={style.loginContainer}>
        <View>
          <Text style={style.inputHeader}>Email/Username</Text>
          <ControlledInput
            name='loginName'
            control={control} 
            style={style.textInput} 
            placeholder='Email or Username' 
            rules={{
              required: 'Email/username required'
            }}
          />
        </View>
        <View>
          <Text style={style.inputHeader}>Password</Text>
          <ControlledInput
            name='loginPassword'
            control={control} 
            style={style.textInput} 
            placeholder=''
            secureTextEntry={true}
            rules={{
              required: 'Password required'
            }}
          />
        </View>
        <View>
        <TouchableOpacity
          disabled={!isValid}
          style={isValid ? style.button : [style.button, {backgroundColor: 'grey'}]} 
          onPress={() => onLogin()}
        >
          <Text style={style.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
export default Login