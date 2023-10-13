import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper'
import PropTypes from 'prop-types'
import FontIcon from 'react-native-vector-icons/FontAwesome5' // TODO replace with material icon
import { layout, colors } from '../theme'

const styles = StyleSheet.create({
  input: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginTop: layout.marginTop,
    marginBottom: layout.marginBottom - 15,
    height: 62,
    borderRadius: 5,
    overflow: 'hidden',
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
    editable,
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
    onFocus,
  } = props

  // const scheme = useColorScheme()
  const [secureText, setSecureText] = useState(secureTextEntry)

  // const isDark = scheme === 'dark'
  // const colorScheme = {
  //   bg: isDark ? colors.black : colors.solidWhite,
  //   text: isDark ? colors.solidWhite : colors.primaryText,
  //   line: isDark ? colors.solidWhite : colors.black,
  // }

  return (
    <>
      <TextInput
        editable={editable}
        style={[styles.input]}
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
        // activeUnderlineColor={colors.primary}
        // underlineColor={colorScheme.line}
        // underlineColorAndroid={colorScheme.line}
        // textColor={colorScheme.text}
        // backgroundColor={colorScheme.bg}
        // placeholderTextColor={colorScheme.line}
        error={errorMessage !== ''}
        onFocus={onFocus}
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
  editable: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  // onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  errorMessage: PropTypes.string,
  icon: PropTypes.string,
  onFocus: PropTypes.func,
}

TextInputBox.defaultProps = {
  editable: true,
  secureTextEntry: false,
  onEndEditing: null,
  onChangeText: null,
  // onBlur: null,
  autoCapitalize: 'none',
  keyboardType: 'default',
  placeholder: '',
  errorMessage: '',
  icon: '',
  onFocus: null,
}

export default TextInputBox
