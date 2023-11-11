import React from 'react'
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { layout } from '../../theme'

export default function Button(props) {
  const {
    label, onPress, disable,
  } = props
  const { colors, fonts } = useTheme()

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
      backgroundColor: colors.primaryContainer,
    },
    buttonText: {
      color: colors.onPrimaryContainer,
      fontSize: fonts.bodyLarge.fontSize,
    },
  })

  if (disable) {
    return (
      <View
        style={[styles.button, { backgroundColor: colors.inversePrimary, opacity: 0.3 }]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disable: PropTypes.bool,
}

Button.defaultProps = {
  disable: false,
}
