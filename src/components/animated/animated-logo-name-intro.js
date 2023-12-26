import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import PropTypes from 'prop-types'
import SvgLogo from '../svg/svg-logo'
import SvgName from '../svg/svg-name'

const { width, height } = Dimensions.get('screen')

const DURATION = 1000

const CENTER_STAGE_HEIGHT = 140 // same as height of logo at scale 1

const LOGO_INITIAL_SCALE = 1
const LOGO_FINAL_SCALE = 0.5
const LOGO_INITIAL_DIMENSION = CENTER_STAGE_HEIGHT * LOGO_INITIAL_SCALE
const LOGO_FINAL_DIMENSION = LOGO_INITIAL_DIMENSION * LOGO_FINAL_SCALE

const NAME_WIDTH = width / 1.8
const NAME_HEIGHT = CENTER_STAGE_HEIGHT / 4.5

const LOGO_INITIAL_X = (width - LOGO_INITIAL_DIMENSION) / 2.0
const LOGO_INITIAL_Y = 0

const LOGO_FINAL_X = ((width - LOGO_FINAL_DIMENSION - NAME_WIDTH) / 2)
const LOGO_FINAL_Y = CENTER_STAGE_HEIGHT / 4.0

const NAME_INITIAL_X = width
const NAME_INITIAL_Y = CENTER_STAGE_HEIGHT / 2.0

const NAME_FINAL_X = LOGO_FINAL_X + LOGO_FINAL_DIMENSION + 10 // width - LOGO_FINAL_DIMENSION - LOGO_FINAL_X

const TEXT_OPACITY_INITIAL = 0
const TEXT_OPACITY_FINAL = 0.65

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
  },
  logo: {
    position: 'absolute',
    width: LOGO_INITIAL_DIMENSION,
    height: LOGO_INITIAL_DIMENSION,
    left: LOGO_INITIAL_X,
    top: LOGO_INITIAL_Y,
  },
  text: {
    position: 'absolute',
    width: NAME_WIDTH,
    height: NAME_HEIGHT,
    top: NAME_INITIAL_Y,
    left: NAME_INITIAL_X,
  },
})

const AnimatedLogoNameIntro = ({ onLoaded, color, bgColor }) => {
  const logoX = useSharedValue(LOGO_INITIAL_X)
  const logoY = useSharedValue(LOGO_INITIAL_Y)
  const logoDimension = useSharedValue(LOGO_INITIAL_DIMENSION)

  const textX = useSharedValue(NAME_INITIAL_X)
  const textOpacity = useSharedValue(TEXT_OPACITY_INITIAL)

  React.useEffect(() => {
    logoX.value = withTiming(LOGO_FINAL_X, { duration: DURATION })
    logoY.value = withTiming(LOGO_FINAL_Y, { duration: DURATION })
    logoDimension.value = withTiming(LOGO_FINAL_DIMENSION, { duration: DURATION })

    textX.value = withTiming(NAME_FINAL_X, { duration: DURATION, easing: Easing.inOut(Easing.ease) })
    textOpacity.value = withTiming(TEXT_OPACITY_FINAL, { duration: DURATION, easing: Easing.inOut(Easing.linear) })
  }, [])

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }} onLayout={() => onLoaded && onLoaded(true)}>
      <View style={{
        width, height: CENTER_STAGE_HEIGHT,
      }}
      >
        <Animated.View
          pointerEvents="none"
          style={{
            ...styles.logo, width: logoDimension, height: logoDimension, left: logoX, top: logoY,
          }}
        >
          <SvgLogo />
        </Animated.View>

        <Animated.View style={{ ...styles.text, left: textX, opacity: textOpacity }}>
          <SvgName color={color} />
        </Animated.View>
      </View>

    </View>
  )
}
AnimatedLogoNameIntro.propTypes = {
  onLoaded: PropTypes.func,
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

AnimatedLogoNameIntro.defaultProps = {
  onLoaded: null,
}

export default AnimatedLogoNameIntro
