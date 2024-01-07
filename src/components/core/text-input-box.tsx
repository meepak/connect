import React, { useState } from 'react'
import { StyleSheet, Keyboard, View } from 'react-native'
import {
  TextInput, HelperText, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import Icon from './icon'

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
    onClear, // if this is given, right x icon will be displayed to be handled accordingly
    showKeyboard,
    bgColor,
    onBgColor,
    multiline,
    autoFillType, // textContentType, to allow autofilling by OS like OTP in sms
  } = props
  const { colors, fonts } = useTheme()
  const [secureText, setSecureText] = useState(secureTextEntry)

  const styles = StyleSheet.create({
    input: {
      minHeight: 54,
      paddingTop: 10,
      fontSize: fonts.bodyLarge.fontSize,
      borderBottomWidth: 1,
      borderBottomColor: onBgColor ?? colors.onBackground,
    },
    helperText: {
      marginLeft: 10,
    },
    // contentStyle: {
    //   color: 'red',
    // },
    icon: {
      top: 20,
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
        verticalAlign="bottom"
        style={styles.input}
        // contentStyle={styles.contentStyle}
        secureTextEntry={secureText}
        value={value}
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
        autoCapitalize={autoCapitalize}
        activeUnderlineColor={colors.primary}
        // underlineColor={onBgColor ?? colors.onBackground}
        // underlineColorAndroid={onBgColor ?? colors.onBackground}
        textColor={onBgColor ?? colors.onBackground}
        backgroundColor={bgColor ?? colors.background}
        placeholderTextColor={onBgColor ?? colors.onBackground}
        selectionColor={colors.primaryContainer}
        cursorColor={colors.primaryContainer}
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
        // left={icon !== '' ? <LeftNode icon={icon} /> : null}
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
              forceTextInputFocus={false}
              style={styles.icon}
            />
          )
          : null}
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
              forceTextInputFocus
              style={styles.icon}
            />
          // eslint-disable-next-line no-nested-ternary
          ) : (value.length > 0 && onClear
            ? (
              <TextInput.Icon
                icon={() => (
                  <Icon
                    name="x"
                    size={16}
                    color={colors.primary}
                  />
                )}
                onPress={() => onClear()}
                forceTextInputFocus={false}
                style={styles.icon}
              />
            )
            : (rightIcon === ''
              ? null
              : (
                <TextInput.Icon
                  icon={() => (
                    <Icon
                      name={rightIcon}
                      size={16}
                      color={colors.primary}
                    />
                  )}
                  forceTextInputFocus
                  style={styles.icon}
                />
              ))
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
  onClear: PropTypes.func,
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
  onClear: null,
  showKeyboard: true,
  bgColor: null,
  onBgColor: null,
  multiline: false,
  value: '',
  autoFillType: undefined,
}

export default TextInputBox
