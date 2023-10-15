import React from 'react'
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import { layout, fontSize, colors } from '../../theme'

const styles = StyleSheet.create({
  button: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginTop: layout.marginTop,
    marginBottom: layout.marginBottom,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.large,
  },
})

export default function Button(props) {
  const {
    label, onPress, color, disable,
  } = props

  if (disable) {
    return (
      <View
        style={[styles.button, { backgroundColor: color, opacity: 0.3 }]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  disable: PropTypes.bool,
}

Button.defaultProps = {
  disable: false,
}
