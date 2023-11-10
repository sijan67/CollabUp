import React from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import ControlledInput from '../../components/ControlledInput'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import { createUser } from '../../api/UserAPI'
import style from './style'

function CreateAccount() {
  const navigation = useNavigation();

  const {
    control,
    watch,
    formState: {isValid},
  } = useForm({mode: "onChange"})
  
  const onCreateAccount = () => {
    createUser(watch('email'), watch('username'), watch('password'), watch('firstName'), watch('lastName'))
    .then((response) => {
      navigation.navigate("DateOfBirth", {
        username: watch('username')})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <KeyboardAvoidingView style={style.container} behavior='padding'>
      <Text style={style.textHeader}>Create acccount</Text>
      <Text style={style.textDescription}>Get ready to embark on a joruney of innovation and collaboration. We're thrilled to have you on board!</Text>
      <View style={style.createAccountContainer}>
        <ControlledInput 
          name='username'
          control={control}
          placeholder='Username'
          rules={{
            required: 'Username is required'
          }}
          style={style.textInput}
        />
        <ControlledInput 
          name='firstName'
          control={control}
          placeholder='First name'
          rules={{
            required: 'First name is required'
          }}
          style={style.textInput}
        />
        <ControlledInput 
          name='lastName'
          control={control}
          placeholder='Last name'
          rules={{
            required: 'Last name is required'
          }}
          style={style.textInput}
        />
        <ControlledInput 
          name='email'
          control={control}
          placeholder='Email'
          rules={{
            required: 'Email is required'
          }}
          style={style.textInput}
        />
        <ControlledInput 
          name='password'
          control={control}
          placeholder='Password'
          secureTextEntry={true}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password needs to be at least 8 characters long'
            }
          }}
          style={style.textInput}
        />
        <TouchableOpacity
          disabled={!isValid} 
          style={isValid ? style.button : [style.button, {backgroundColor: 'grey'}]} 
          onPress={() => {
            onCreateAccount()
          }}>
          <Text style={style.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
          <Text style={style.haveAccountText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login", {
            username: watch('username')
          })}>
            <Text style={style.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}
export default CreateAccount