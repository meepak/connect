import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { ColorSchemeContext } from '../context/ColorSchemeContext'

const styles = StyleSheet.create({
  input: {
    height: 62,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
  },
  helperText: {
    marginLeft: 30,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
})

const TextInputBox = (props) => {
  const {
    secureTextEntry,
    label,
    placeholder,
    onChangeText,
    onEndEditing,
    // onBlur,
    value,
    autoCapitalize,
    keyboardType,
    errorMessage,
    icon,
  } = props

  const { scheme } = useContext(ColorSchemeContext)
  const [secureText, setSecureText] = useState(secureTextEntry)

  const isDark = scheme === 'dark'
  const colorScheme = {
    bg: isDark ? colors.black : colors.white,
    text: isDark ? colors.solidWhite : colors.primaryText,
  }

  return (
    <>
      <TextInput
        style={[styles.input, { backgroundColor: colorScheme.bg, color: colorScheme.text }]}
        secureTextEntry={secureText}
        left={icon !== ''
          ? (
            <TextInput.Icon
              icon={() => (
                <FontIcon
                  name={icon}
                  size={20}
                  color={colors.primary}
                />
              )}
              forceTextInputFocus
            />
          ) : null}
        right={secureTextEntry
          ? (
            <TextInput.Icon
              icon={() => (
                <FontIcon
                  name={secureText ? 'eye' : 'eye-slash'}
                  size={20}
                  color={colors.primary}
                />
              )}
              onPress={() => setSecureText(!secureText)}
              forceTextInputFocus={false}
            />
          ) : null}
        label={label}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        // onBlur={onBlur}
        value={value}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        mode="flat"
        activeUnderlineColor={colors.primary}
        underlineColor={colors.solidWhite}
        underlineColorAndroid={colors.solidWhite}
        textColor={colorScheme.text}
        backgroundColor={colorScheme.bg}
        placeholderTextColor={colorScheme.solidWhite}
        error={errorMessage !== ''}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={errorMessage !== ''}
      >
        {errorMessage}
      </HelperText>
    </>
  )
}

TextInputBox.propTypes = {
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onEndEditing: PropTypes.func,
  // onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  errorMessage: PropTypes.string,
  icon: PropTypes.string,
}

TextInputBox.defaultProps = {
  secureTextEntry: false,
  onEndEditing: null,
  // onBlur: null,
  autoCapitalize: 'none',
  keyboardType: 'default',
  placeholder: '',
  errorMessage: '',
  icon: '',
}

export default TextInputBox
