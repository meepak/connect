import React from 'react'
import { useColorScheme } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../theme'

const HeaderStyle = () => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const startColor = isDark ? colors.dark : colors.blueLight
  // const endColor = isDark ? colors.dark : colors.blueLight
  return (
    <LinearGradient
      // colors={['#1B2F4F', '#4A5B92']}
      colors={[startColor, startColor]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  )
}

export default HeaderStyle
