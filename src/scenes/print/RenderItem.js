import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const Styles = (fonts) => StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: fonts.bodyLarge.fontSize,
  },
  body: {
    fontSize: fonts.bodyLarge.fontSize,
  },
})

export default function RenderItem(props) {
  const { item } = props
  const { fonts } = useTheme()
  const styles = Styles(fonts)

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  )
}

RenderItem.propTypes = {
  item: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
}
