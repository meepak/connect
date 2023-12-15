import React from 'react'
import {
  StyleSheet, View, TouchableOpacity,
} from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import PropTypes from 'prop-types'

const TextAndLink = ({
  texts, link, onPress, marginTop, marginBottom, marginHorizontal, alignSelf, textAlign, lineHeight, variant,
}) => {
  const { colors } = useTheme()
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
      textAlign,
      lineHeight,
    },
    text: {
      color: colors.onBackground,
      textAlign,
      lineHeight,
    },
  })

  return (
    <View style={styles.linkView}>
      {texts.map((text, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={index} style={styles.text} variant={variant}>
          {text}&nbsp;
        </Text>
      ))}
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link} variant={variant}>{link}</Text>
      </TouchableOpacity>
    </View>
  )
}

TextAndLink.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
  variant: PropTypes.string,
  onPress: PropTypes.func,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  alignSelf: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'stretch', 'baseline']),
  textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  lineHeight: PropTypes.number,
}

TextAndLink.defaultProps = {
  texts: [''],
  marginTop: 20,
  marginBottom: 0,
  marginHorizontal: 20,
  alignSelf: 'center',
  textAlign: 'auto',
  lineHeight: 24,
  onPress: null,
  link: '',
  variant: 'bodyMedium',
}

export default TextAndLink
