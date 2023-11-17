import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { Icon, Text, TouchableRipple } from 'react-native-paper'
import PropTypes from 'prop-types'
import { convertHexToRGBA } from '../../utils/functions'

const Button = (props) => {
  const {
    label,
    onPress,
    disable,
    alignLabel,
    backgroundColor,
    color,
    fontSize,
    icon,
    marginHorizontal,
    marginVertical,
    iconSize,
  } = props

  const styles = StyleSheet.create({
    button: {
      height: 48,
      // borderRadius: 7,
      alignItems: alignLabel,
      justifyContent: 'center',
      paddingHorizontal: 15,
      backgroundColor,
      marginHorizontal,
      marginVertical,
    },
    buttonText: {
      color,
      fontSize,
    },
  })

  if (disable) {
    return (
      <View
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {
            icon
              ? (
                <Icon
                  source={icon}
                  size={iconSize}
                  color={color}
                />
              )
              : <></>
          }
          &nbsp;{label}
        </Text>
      </View>
    )
  }

  return (
    <TouchableRipple
      style={styles.button}
      onPress={onPress}
      rippleColor={convertHexToRGBA(color, 0.2)}
    >
      <Text style={styles.buttonText}>
        {
          icon
            ? (
              <Icon
                source={icon}
                size={iconSize}
                color={color}
              />
            )
            : <></>
        }
        &nbsp;{label}

      </Text>
    </TouchableRipple>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  iconSize: PropTypes.number,
  disable: PropTypes.bool,
  alignLabel: PropTypes.string,
  icon: PropTypes.string,
  marginHorizontal: PropTypes.number,
  marginVertical: PropTypes.number,
}

Button.defaultProps = {
  disable: false,
  icon: null,
  iconSize: 18,
  alignLabel: 'left',
  marginHorizontal: 0,
  marginVertical: 0,
  fontSize: 14,
  backgroundColor: '#FF0000',
  color: '#FFFFFF',
}

export default Button
