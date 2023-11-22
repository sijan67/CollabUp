import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'

const ControlledInput = (customInputProps) => {
  const { control, name, rules, placeholder, secureTextEntry, multiline, style } = customInputProps
  return (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange, onBlur}, fieldState: {error}}) =>
    <>
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        autoComplete={'off'}
        autoCorrect={false}
        style={error ? [style, styles.textInputError] : [style]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
      {error && (
        <Text style={styles.errorText}>{error.message || 'Error'}</Text>
      )}
    </>
    }
  />
  )
}

export default ControlledInput

const styles = StyleSheet.create({
    errorText: {
      color: 'red',
      alignSelf: 'stretch'
    },
    textInputError: {
      borderBottomColor: 'red',
      borderColor: 'red',
      borderWidth: 2,
    }
  })