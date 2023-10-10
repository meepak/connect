import React from 'react'
import { useColorScheme } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../theme'

// TODO -- since paper doesn't provide them for it, create header component and define consistent
// theme for dark and light mode
// Actually, not so much liking the material ui theme, so define your own once app is completed
const HeaderStyle = () => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const startColor = isDark ? colors.primary : colors.primary
  const endColor = isDark ? colors.black : colors.purple
  return (
    <LinearGradient
      colors={[startColor, endColor]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  )
}

export default HeaderStyle
