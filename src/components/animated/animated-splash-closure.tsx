import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  runOnJS,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated'
import PropTypes from 'prop-types'
import SvgLogo from '@/components/svg/svg-logo'
import SvgName from '@/components/svg/svg-name'

const { width } = Dimensions.get('window')

const DURATION = 500

const CENTER_STAGE_HEIGHT = 140 // same as height of logo at scale 1

const LOGO_INITIAL_SCALE = 0.5
const LOGO_INITIAL_DIMENSION = CENTER_STAGE_HEIGHT * LOGO_INITIAL_SCALE

const NAME_WIDTH = width / 2
const NAME_HEIGHT = CENTER_STAGE_HEIGHT / 4.5

const LOGO_INITIAL_X = ((width - LOGO_INITIAL_DIMENSION - NAME_WIDTH) / 2.0)
const LOGO_INITIAL_Y = CENTER_STAGE_HEIGHT / 4.0

const NAME_INITIAL_X = LOGO_INITIAL_X + LOGO_INITIAL_DIMENSION + 10
const NAME_INITIAL_Y = CENTER_STAGE_HEIGHT / 2.0

const TEXT_OPACITY_INITIAL = 0.65

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: LOGO_INITIAL_DIMENSION,
    height: LOGO_INITIAL_DIMENSION,
    position: 'absolute',
    left: LOGO_INITIAL_X,
    top: LOGO_INITIAL_Y,
  },
  text: {
    width: NAME_WIDTH,
    height: NAME_HEIGHT,
    position: 'absolute',
    left: NAME_INITIAL_X,
    top: NAME_INITIAL_Y,
    opacity: 0, // will this help??
  },
  box: {
    width,
    height: CENTER_STAGE_HEIGHT,
  },
})

const AnimatedLogoNameClosure = ({
  color, bgColor, onFinished,
}) => {
  const logoScale = useSharedValue(0.5)
  const logoOpacity = useSharedValue(TEXT_OPACITY_INITIAL)
  const textOpacity = useSharedValue(TEXT_OPACITY_INITIAL)

  React.useEffect(() => {
    logoScale.value = withTiming(8, { duration: DURATION })
    logoOpacity.value = withTiming(0, { duration: DURATION })
    textOpacity.value = withTiming(0, { duration: DURATION / 4 })
  }, [])

  const logoStyle = useAnimatedStyle(() => {
    if (logoOpacity.value === 0) {
      if (onFinished) {
        runOnJS(onFinished)(true)
      }
    }
    if (!(Number.isNaN(logoScale.value) || typeof logoScale.value !== 'number')) {
      return {
        transform: [{ scale: logoScale.value }],
        opacity: logoOpacity.value,
      }
    }
    return {}
  }, [logoScale])

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>

      <View style={styles.box}>
        <Animated.View
          style={{
            ...styles.logo, ...logoStyle,
          }}
        >
          <SvgLogo />
        </Animated.View>

        <Animated.View
          style={{ ...styles.text, opacity: textOpacity }}
        >
          <SvgName color={color} />
        </Animated.View>
      </View>
    </View>
  )
}
AnimatedLogoNameClosure.propTypes = {
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onFinished: PropTypes.func,
}

AnimatedLogoNameClosure.defaultProps = {
  onFinished: null,
}

export default AnimatedLogoNameClosure
