import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withDelay,
} from 'react-native-reanimated'
import { useTheme } from 'react-native-paper'
import SvgLogo from '../../svg/svg-logo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 140,
    height: 140,
    left: 50,
    top: 50,
  },
})

const AnimatedLogoLoading = () => {
  const { colors } = useTheme()

  const rotation = useSharedValue('0deg')

  const animatedLogoStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: rotation.value }],
  }))

  React.useEffect(() => {
    rotation.value = withDelay(100, withRepeat(withSpring('-360deg', { mass: 2 }), -1))
  }, [])

  return (
    <View
      pointerEvents="none"
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <Animated.View pointerEvents="none" style={[styles.logo, animatedLogoStyles]}>
        <SvgLogo />
      </Animated.View>
    </View>
  )
}

export default AnimatedLogoLoading
