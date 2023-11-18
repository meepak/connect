import React from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const TextAndLink = ({
  texts, link, onPress, marginTop, marginBottom, marginHorizontal, alignSelf, textAlign, lineHeight,
}) => {
  const { colors, fonts } = useTheme()
  const styles = StyleSheet.create({
    linkView: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: alignSelf === 'center' ? 'center' : 'flex-start',
      alignSelf,
      marginTop,
      marginBottom,
      marginHorizontal,
    },
    link: {
      color: colors.primary,
      fontWeight: 'bold',
      fontSize: fonts.bodyLarge.fontSize,
      textAlign,
      lineHeight,
    },
    text: {
      color: colors.onBackground,
      fontSize: fonts.bodyLarge.fontSize,
      textAlign,
      lineHeight,
    },
  })

  return (
    <View style={styles.linkView}>
      {texts.map((text, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={index} style={styles.text}>
          {text}&nbsp;
        </Text>
      ))}
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{link}</Text>
      </TouchableOpacity>
    </View>
  )
}

TextAndLink.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  alignSelf: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'stretch', 'baseline']),
  textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  lineHeight: PropTypes.number,
}

TextAndLink.defaultProps = {
  marginTop: 20,
  marginBottom: 0,
  marginHorizontal: 20,
  alignSelf: 'center',
  textAlign: 'auto',
  lineHeight: 24,
}

export default TextAndLink
