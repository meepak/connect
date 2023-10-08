import React, { useContext } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { colors, fontSize } from '../../theme'
import { useColorScheme } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: fontSize.large,
  },
  body: {
    fontSize: fontSize.small,
  },
})

export default function RenderItem(props) {
  const { item } = props
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark ? colors.white : colors.primaryText,
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={[styles.title, { color: colorScheme.text }]}>{item.title}</Text>
      <Text style={[styles.body, { color: colorScheme.text }]}>{item.body}</Text>
    </View>
  )
}

// RenderItem.propTypes = {
//   item: PropTypes.arrayOf.isRequired,
// }
