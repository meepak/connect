import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput, HelperText, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Octicons' // TODO replace with material icon
import { layout } from '../../theme'

// TODO -- Fork the react-native-paper TextInput and allow cutomization of spacing between labels and lines

const styles = StyleSheet.create({
  input: {
    // marginLeft: layout.marginLeft,
    // marginRight: layout.marginRight,
    marginTop: layout.marginTop,
    marginBottom: layout.marginBottom - 15,
    minHeight: 54,
    // borderBottomWidth: 1,
    overflow: 'hidden',
    fontSize: 18,
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
    rightIcon,
    onFocus,
    showKeyboard,
    bgColor,
    onBgColor,
    numberOfLines,
  } = props
  const { colors } = useTheme()

  const [secureText, setSecureText] = useState(secureTextEntry)

  return (
    <>
      <TextInput
        mode="flat"
        editable={editable}
        multiline={numberOfLines > 1}
        numberOfLines={numberOfLines}
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
        // onBlur={onBlur}
        value={value}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        activeUnderlineColor={colors.primary}
        underlineColor={onBgColor ?? colors.onBackground}
        underlineColorAndroid={onBgColor ?? colors.onBackground}
        textColor={onBgColor ?? colors.onBackground}
        backgroundColor={bgColor ?? colors.background}
        placeholderTextColor={onBgColor ?? colors.onBackground}
        iconBackgroundColor={onBgColor ?? colors.onBackground}
        error={errorMessage !== ''}
        onFocus={onFocus}
        showSoftInputOnFocus={showKeyboard}
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
                    size={20}
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
  rightIcon: PropTypes.string,
  onFocus: PropTypes.func,
  showKeyboard: PropTypes.bool,
  bgColor: PropTypes.string,
  onBgColor: PropTypes.string,
  numberOfLines: PropTypes.number,
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
  rightIcon: '',
  onFocus: null,
  showKeyboard: true,
  bgColor: null,
  onBgColor: null,
  numberOfLines: 1,
}

export default TextInputBox
