import React, { useContext } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { colors } from 'theme'
import { ColorSchemeContext } from '../context/ColorSchemeContext'

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
})

const TextInputBox = (props) => {
  const {
    secureTextEntry,
    placeholder,
    onChangeText,
    onEndEditing,
    value,
    autoCapitalize,
    keyboardType,
  } = props
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    input: isDark ? colors.darkInput : colors.white,
    text: isDark ? colors.white : colors.primaryText,
  }

  return (
    <TextInput
      style={[styles.input, { backgroundColor: colorScheme.input, color: colorScheme.text }]}
      placeholderTextColor={colors.grayLight}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onEndEditing={onEndEditing}
      value={value}
      underlineColorAndroid="transparent"
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
  )
}

export default TextInputBox
