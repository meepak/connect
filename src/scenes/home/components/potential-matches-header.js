import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

const PotentialMatchesHeader = ({ currentCount, totalCount }) => {
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
        <Text variant="bodyLarge">Showing {currentCount} out of {totalCount} users.</Text>
      </View>
    </View>
  )
}

PotentialMatchesHeader.propTypes = {
  currentCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
}

export default PotentialMatchesHeader
