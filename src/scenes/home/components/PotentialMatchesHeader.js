import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

const PotentialMatchesHeader = () => {
  const { colors } = useTheme()
  return (
    <View style={{
      paddingTop: 50, paddingHorizontal: 15, backgroundColor: colors.background,
    }}
    >
      <Text variant="titleLarge">Potential Matches</Text>
      <View style={{
        paddingVertical: 20,
      }}
      >
        <Text variant="bodyLarge">Showing 20 out of 200 users.</Text>
      </View>
    </View>
  )
}

export default PotentialMatchesHeader
