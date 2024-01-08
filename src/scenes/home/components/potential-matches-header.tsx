import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import RenderCounter from '@/components/render-counter'

const PotentialMatchesHeader = forwardRef((props, ref) => {
  const { colors } = useTheme()
  const [currentCount, setCurrentCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  useImperativeHandle(ref, () => ({
    updateCounts: (newCount, newTotalCount) => {
      setCurrentCount(newCount)
      setTotalCount(newTotalCount)
    },
  }))

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
        <Text variant="bodyLarge">Showing {currentCount ?? 0} out of {totalCount ?? 0} users.</Text>
      </View>
    </View>
  )
})

export default PotentialMatchesHeader
