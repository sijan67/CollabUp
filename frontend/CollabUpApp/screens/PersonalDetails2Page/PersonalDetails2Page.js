import React from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import ControlledInput from '../../components/ControlledInput'
import { useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import style from './style'
import { addUserDetails } from '../../api/UserAPI'


function PersonalDetails2() {
  const navigation = useNavigation();
  const route = useRoute()
  const { username, birthdate, occupation, skills, experience, location } = route.params

  const {
    control,
    watch,
    formState: {isValid},
  } = useForm({mode: "onChange"})

  const onAddUserDetails = () => {
    addUserDetails(
      username, 
      birthdate.replace('Z', '').replace('T', ' ').slice(0, -4),
      occupation, 
      skills,
      experience,
      location,
      watch('workLink'),
      watch('publicEmail'),
      watch('description'),
      watch('achievements')
      )
      .then((res) => {
        navigation.navigate("UploadPicture", {
          username: username
        })
      })
  }

  return (
  <KeyboardAvoidingView style={style.container} behavior='padding'>
    <Text style={style.textHeader}>Personal Details</Text>
    <Text style={style.textDescription}>Provide your personal details for others to know more about you and reach out to you for collaboration.</Text>
    <View style={style.createAccountContainer}>
      <Text style={style.inputHeader}>Work Link*</Text>
      <ControlledInput
        name='workLink'
        control={control}
        style={style.textInput} 
        placeholder='e.g. LinkedIn Profile'
        rules={{
          required: 'Work link required'
        }}
      />
      <Text style={style.inputHeader}>Public Email Address</Text>
      <ControlledInput 
        name='publicEmail'
        control={control}
        style={style.textInput} 
        placeholder='xyz@gmail.com'
      />
      <Text style={style.inputHeader}>Description*</Text>
      <ControlledInput
        name='description'
        control={control} 
        style={[style.textInput, {height: 100}]} 
        placeholder='Add something about yourself...' 
        multiline={true}
      />
      <Text style={style.inputHeader}>Achievments*</Text>
      <ControlledInput
        name='achievements'
        control={control}
        style={[style.textInput]} 
        placeholder='Add your achievements... '
        rules={{
          required: 'Achievments required'
        }}
      />
    </View>
    <View style={{flexDirection: 'row', gap: 100, marginTop: 50}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name='arrow-left-circle' size={40} color='black' />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!isValid}
        style={isValid ? style.button : [style.button, {backgroundColor: 'grey'}]} 
        onPress={() => onAddUserDetails()}
      >
        <Text style={style.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  )
}
export default PersonalDetails2