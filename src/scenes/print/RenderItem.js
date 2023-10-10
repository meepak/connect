import React from 'react'
import {
  StyleSheet, View, useColorScheme,
} from 'react-native'
import { Text } from 'react-native-paper'
// import PropTypes from 'prop-types'
import { colors, fontSize } from '../../theme'

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

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  )
}

// RenderItem.propTypes = {
//   item: PropTypes.arrayOf.isRequired,
// }
