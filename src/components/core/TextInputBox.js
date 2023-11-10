import React, { useState } from 'react'
import { StyleSheet, Keyboard, View } from 'react-native'
import {
  TextInput, HelperText, useTheme, IconButton,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import Icon from './Icon'
import { layout } from '../../theme'

const TextInputBox = React.forwardRef((props, ref) => {
  const {
    editable,
    disabled,
    secureTextEntry,
    label,
    placeholder,
    onChangeText,
    onEndEditing,
    onBlur,
    value,
    autoCapitalize,
    keyboardType,
    errorMessage,
    icon,
    rightIcon,
    onFocus,
    showKeyboard,
    bgColor,
    onBgColor,
    multiline,
    autoFillType, // textContentType, to allow autofilling by OS like OTP in sms
  } = props
  const { colors } = useTheme()
  const [secureText, setSecureText] = useState(secureTextEntry)

  const styles = StyleSheet.create({
    input: {
      // marginLeft: layout.marginLeft,
      // marginRight: layout.marginRight,
      marginTop: layout.marginTop,
      marginBottom: layout.marginBottom - 15,
      minHeight: 54,
      paddingVertical: 10,
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: onBgColor ?? colors.onBackground,
    },
    helperText: {
      marginLeft: 5,
    },

    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
  })

  return (
    <View>
      <TextInput
        ref={ref}
        mode="flat"
        editable={editable}
        disabled={disabled}
        showSoftInputOnFocus={showKeyboard}
        keyboardType={keyboardType}
        textContentType={autoFillType}
        multiline={multiline}
        style={[styles.input]}
        secureTextEntry={secureText}
        theme={{
          colors: {
            surfaceVariant: colors.background,
          },
        }}
        label={label}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        onBlur={onBlur}
        value={value}
        autoCapitalize={autoCapitalize}
        activeUnderlineColor={colors.primary}
        // underlineColor={onBgColor ?? colors.onBackground}
        // underlineColorAndroid={onBgColor ?? colors.onBackground}
        textColor={onBgColor ?? colors.onBackground}
        backgroundColor={bgColor ?? colors.background}
        placeholderTextColor={onBgColor ?? colors.onBackground}
        iconBackgroundColor={onBgColor ?? colors.onBackground}
        error={errorMessage !== ''}
        onFocus={() => {
          if (onFocus) {
            if (!showKeyboard && Keyboard.isVisible()) {
              Keyboard.dismiss()
              setTimeout(() => {
                onFocus()
              }, 75)
            } else {
              onFocus()
            }
          }
        }}
        // underlineStyle={{ borderWidth: 1, borderColor: colors.onBackground }}
        left={icon !== ''
          ? (
            <TextInput.Icon
              icon={() => (
                <Icon
                  name={icon}
                  size={20}
                  color={colors.primary}
                />
              )}
              forceTextInputFocus
            />
          ) : null}
        // eslint-disable-next-line no-nested-ternary
        right={secureTextEntry
          ? (
            <TextInput.Icon
              icon={() => (
                <Icon
                  name={secureText ? 'eye' : 'eye-closed'}
                  size={20}
                  color={colors.primary}
                />
              )}
              onPress={() => setSecureText(!secureText)}
              forceTextInputFocus={false}
            />
          ) : (rightIcon !== ''
            ? (
              <TextInput.Icon
                icon={() => (
                  <Icon
                    name={rightIcon}
                    size={16}
                    color={colors.primary}
                  />
                )}
                onPress={onFocus ? () => onFocus() : null}
              />
            ) : null
          )}
      />
      <HelperText
        style={styles.helperText}
        type="error"
        visible={errorMessage !== ''}
      >
        {errorMessage}
      </HelperText>
    </View>
  )
})

TextInputBox.propTypes = {
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  errorMessage: PropTypes.string,
  icon: PropTypes.string,
  rightIcon: PropTypes.string,
  onFocus: PropTypes.func,
  showKeyboard: PropTypes.bool,
  bgColor: PropTypes.string,
  onBgColor: PropTypes.string,
  multiline: PropTypes.bool,
  autoFillType: PropTypes.string,
}

TextInputBox.defaultProps = {
  editable: true,
  disabled: false,
  secureTextEntry: false,
  onEndEditing: null,
  onChangeText: null,
  onBlur: null,
  autoCapitalize: 'none',
  keyboardType: 'default',
  placeholder: '',
  errorMessage: '',
  icon: '',
  rightIcon: '',
  onFocus: null,
  showKeyboard: true,
  bgColor: null,
  onBgColor: null,
  multiline: false,
  value: '',
  autoFillType: undefined,
}

export default TextInputBox
