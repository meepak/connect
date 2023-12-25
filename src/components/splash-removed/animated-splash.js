import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import PropTypes from 'prop-types'
import SvgLogo from '../svg-animation/svg-logo'
import SvgFind from '../svg-animation/svg-find'
import SvgAssociate from '../svg-animation/svg-associate'

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
const initialFindOffset = -width / 2 - 110
const initialAssociateOffset = width / 2 + 132

const AnimatedSplash = ({ onLoaded, isDark }) => {
  const color = isDark ? 'white' : 'black'

  // const bgColor = !isDark ? 'white' : 'black'
  const scaleLogo = useSharedValue(initialLogoScale)
  const offsetLogo = useSharedValue(initialLogoOffset)
  const offsetFind = useSharedValue(initialFindOffset)
  const offsetAssociate = useSharedValue(initialAssociateOffset)

  const animatedLogoStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetLogo.value }, { scale: scaleLogo.value }],
  }))
  const animatedFindStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetFind.value }],
  }))
  const animatedAssociateStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetAssociate.value }],
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
    if (offsetLogo.value > -100) {
      offsetFind.value = withSpring(-115)
      offsetAssociate.value = withSpring(68)
    }
  }, [])

  React.useLayoutEffect(() => {
    // console.log('component is mounted')
    if (onLoaded) onLoaded(true)
  })

  return (
    <>
      <View pointerEvents="none" style={{ ...styles.container, ...styles.fixed, zIndex: 200 }}>
        <Animated.View pointerEvents="none" style={[styles.logo, animatedLogoStyles]}>
          <SvgLogo />
        </Animated.View>
      </View>

      <View style={{ ...styles.container, ...styles.fixed, zIndex: 100 }}>
        <Animated.View pointerEvents="none" style={[styles.find, animatedFindStyles]}>
          <SvgFind color={color} />
        </Animated.View>
      </View>

      <View pointerEvents="none" style={{ ...styles.container, ...styles.fixed, zIndex: 100 }}>
        <Animated.View pointerEvents="none" style={[styles.associate, animatedAssociateStyles]}>
          <SvgAssociate color={color} />
        </Animated.View>
      </View>
    </>
  )
}
AnimatedSplash.propTypes = {
  onLoaded: PropTypes.func,
  isDark: PropTypes.bool.isRequired,
}

AnimatedSplash.defaultProps = {
  onLoaded: null,
}

export default AnimatedSplash
