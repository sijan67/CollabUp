import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

import style from './style'
import { useNavigation, useRoute } from '@react-navigation/native'

function DateOfBirth() {
  const navigation = useNavigation()
  const route = useRoute()
  const { username } = route.params

  const [birthdate, setBirthdate] = useState(new Date(1598051730000))

  const onChange = (event, selectedDate) => {
    setBirthdate(selectedDate)
  }

  return (
  <View style={style.container}>
    <Text style={style.textHeader}>Date of Birth</Text>
    <Text style={style.textDescription}>Help us tailor your Collab Up journey by sharing your date of birth. This way, we can match you with projects that align perfectly with your goals.</Text>
      <DateTimePicker
        value={birthdate}
        mode={'date'}
        display={'spinner'}
        onChange={onChange}
      />
    <View style={{flexDirection: 'row', gap: 100, marginTop: 50}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name='arrow-left-circle' size={40} color='black' />
      </TouchableOpacity>
      <TouchableOpacity style={style.button} onPress={() => navigation.navigate("PersonalDetails1", {
        username: username, birthdate: birthdate.toISOString()
      })}>
        <Text style={style.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}
export default DateOfBirth