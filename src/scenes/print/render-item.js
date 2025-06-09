import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import PropTypes from 'prop-types'
import { Text } from 'react-native-paper'

const Styles = () => StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
})

export default function RenderItem(props) {
  const { item } = props
  const styles = Styles()

  return (
    <View
      style={styles.container}
    >
      <Text variant="bodyMedium">{item.title}</Text>
      <Text variant="bodyMedium">{item.body}</Text>
    </View>
  )
}

RenderItem.propTypes = {
  item: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
}
