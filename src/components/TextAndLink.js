import React from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const TextAndLink = ({
  text, link, onPress, marginTop, marginBottom, alignSelf,
}) => {
  const { colors, fonts } = useTheme()
  const styles = StyleSheet.create({
    linkView: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap', // Add flexWrap property
      alignItems: 'center',
      alignSelf,
      marginTop,
      marginBottom,
    },
    link: {
      color: colors.primary,
      fontWeight: 'bold',
      fontSize: fonts.bodyLarge.fontSize,
    },
    text: {
      color: colors.onBackground,
      fontSize: fonts.bodyLarge.fontSize,
    },
  })

  return (
    <View style={styles.linkView}>
      <Text style={styles.text}>{text}&nbsp;</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{link}</Text>
      </TouchableOpacity>
    </View>
  )
}

TextAndLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  alignSelf: PropTypes.string,
}

TextAndLink.defaultProps = {
  marginTop: 20,
  marginBottom: 20,
  alignSelf: 'center',
}

export default TextAndLink
