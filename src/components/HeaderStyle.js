import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

const HeaderStyle = () => {
  const { colors } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.elevation.level3,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
      }}
    />
  )
}

export default HeaderStyle
