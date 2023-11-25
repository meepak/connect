import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import RenderCounter from '../../../components/render-counter'

const PotentialMatchesHeader = React.memo(({ currentCount, totalCount }) => {
  const { colors } = useTheme()
  return (
    <View style={{
      paddingTop: 11, paddingHorizontal: 15, backgroundColor: colors.background, elevation: 5,
    }}
    >
      <RenderCounter title="potential" />
      <Text variant="titleLarge">Potential Matches</Text>
      <View style={{
        paddingVertical: 10,
      }}
      >
        <Text variant="bodyLarge">Showing {currentCount} out of {totalCount} users.</Text>
      </View>
    </View>
  )
})

PotentialMatchesHeader.propTypes = {
  currentCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
}

export default PotentialMatchesHeader
