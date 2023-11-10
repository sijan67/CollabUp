import React, {useState} from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import ControlledInput from '../../components/ControlledInput'
import { useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import style from './style'


function PersonalDetails1() {
  const [experience, setExperience] = useState(0);

  const {
    control,
    watch,
    formState: {isValid},
  } = useForm({mode: "onChange"})

  const navigation = useNavigation();
  const route = useRoute()
  const { username, birthdate } = route.params

  return (
  <KeyboardAvoidingView style={style.container} behavior='padding'>
    <Text style={style.textHeader}>Personal Details</Text>
    <Text style={style.textDescription}>Provide your personal details to enrich your journey and link up with individuals who share your passions.</Text>
    <View style={style.loginContainer}>
      <Text style={style.inputHeader}>Occupation*</Text>
      <ControlledInput
        name='occupation'
        control={control}
        style={style.textInput} 
        placeholder='Doctor, Software Developer, etc..'
        rules={{
          required: 'Occupation is required'
        }}
      />
      <Text style={style.inputHeader}>Skills Owned*</Text>
      <ControlledInput
        name='skills'
        control={control}
        style={style.textInput}
        placeholder='Web Development, Video Editing, etc..'
        rules={{
          required: 'Skills are required'
        }}
      />
      <Text style={style.inputHeader}>Experience*</Text>
      <View style={style.numericalInput}>
        <TouchableOpacity onPress={() => setExperience(experience - 1)}>
          <AntDesign name="stepbackward" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{fontFamily: 'Nobile_400Regular',fontSize: 17}}>{experience}</Text>
        <TouchableOpacity onPress={() => setExperience(experience + 1)}>
          <AntDesign name="stepforward" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={style.inputHeader}>Location*</Text>
      <ControlledInput
        name='location'
        control={control}
        style={style.textInput}
        placeholder='Vancouuver, Calgary, etc...'
        rules={{
          required: 'Location is required'
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
        onPress={() => {
          navigation.navigate("PersonalDetails2", {
            username: username,
            birthdate: birthdate,
            occupation: watch('occupation'),
            skills: watch('skills'),
            experience: experience,
            location: watch('location')
          })
        }}>
        <Text style={style.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  )
}
export default PersonalDetails1