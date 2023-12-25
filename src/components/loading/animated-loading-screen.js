import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { useTheme } from 'react-native-paper'
import SvgLogo from '../svg-animation/svg-logo'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
  },
  fixed: {
    position: 'absolute',
    left: 0,
    top: 40,
  },
  logo: {
    width: 180,
    height: 180,
  },
  find: {
    width: 110,
    height: 60,
  },
  associate: {
    width: 225,
    height: 60,
  },
})

const initialLogoScale = 0.1
const initialLogoOffset = 0

const AnimatedLoadingScreen = () => {
  const { colors } = useTheme()
  // const bgColor = !isDark ? 'white' : 'black'
  const scaleLogo = useSharedValue(initialLogoScale)
  const offsetLogo = useSharedValue(initialLogoOffset)

  const animatedLogoStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetLogo.value }, { scale: scaleLogo.value }],
  }))

  const spring = (m = 1, d = 1, s = 100, o = false, rd = 0.01, rs = 2) => ({
    mass: m,
    damping: d,
    stiffness: s,
    overshootClamping: o,
    restDisplacementThreshold: rd,
    restSpeedThreshold: rs,
  })

  React.useEffect(() => {
    // first scale logo by 15
    scaleLogo.value = withSpring(1, spring(10, 20, 300, false, 0.001, 1))
    offsetLogo.value = withSpring(-120)
  }, [])

  return (
    <View
      pointerEvents="none"
      style={{
        ...styles.container, ...styles.fixed, zIndex: 200, backgroundColor: colors.background,
      }}
    >
      <Animated.View pointerEvents="none" style={[styles.logo, animatedLogoStyles]}>
        <SvgLogo />
      </Animated.View>
    </View>
  )
}

export default AnimatedLoadingScreen
