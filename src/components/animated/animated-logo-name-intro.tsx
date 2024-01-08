import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
  ZoomIn,
  FadeOut,
  ZoomInUp,
  useAnimatedProps,
} from 'react-native-reanimated'
import PropTypes from 'prop-types'
import SvgLogo from '@/components/svg/svg-logo'
import SvgFindAssociate from '@/components/svg/svg-find-associate'
// import AnimatedLogoNameClosure from './animated-splash-closure'

const { width, height } = Dimensions.get('window')

const DURATION = 666
// const DELAY = 2000

const LOGO_INITIAL_DIMENSION = 140
const LOGO_FINAL_DIMENSION = 70

const TEXT_INITIAL_WIDTH = 1
const TEXT_FINAL_WIDTH = 220

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
  },
  logo: {
    width: LOGO_INITIAL_DIMENSION,
    height: LOGO_INITIAL_DIMENSION,
    marginRight: 5,
  },
  text: {
    marginLeft: 5,
    width: TEXT_INITIAL_WIDTH,
    height: 30,
  },
})

// TODO do not use this as loading screen, it should be part of the intro

const AnimatedLogoNameIntro = ({
  onLoaded, color, bgColor, strokeWidth
}) => {
  const logoDimension = useSharedValue(LOGO_INITIAL_DIMENSION)
  const textWidth = useSharedValue(TEXT_INITIAL_WIDTH)

  React.useEffect(() => {
    logoDimension.value = withTiming(LOGO_FINAL_DIMENSION, { duration: DURATION })
    textWidth.value = withTiming(TEXT_FINAL_WIDTH, { duration: DURATION })
  }, [logoDimension, textWidth])

  // make text disappear
  FadeOut.delay(10)
  // .reduceMotion(ReduceMotion.Never)
    .duration(50)
    .withInitialValues({ width: 1 })
    .overshootClamping(false)
    .withCallback((finished) => {
      console.log(`finished FadeOut without interruptions: ${finished}`)
    })

  ZoomInUp.delay(70)
    // .reduceMotion(ReduceMotion.Never)
    .duration(500)
    .withInitialValues({ transform: [{ scale: 5 }] })
    .overshootClamping(false)
    .withCallback((finished) => {
      console.log(`finished ZoomInUp without interruptions: ${finished}`)
    })

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }} onLayout={() => onLoaded && onLoaded(true)}>

      <Animated.View
        style={{
          ...styles.logo,
          width: logoDimension,
          height: logoDimension,
        }}
        exiting={ZoomInUp}
      >
        <SvgLogo />
      </Animated.View>

      <Animated.View
        style={{
          ...styles.text,
          width: textWidth,
        }}
        exiting={FadeOut}
      >
        <SvgFindAssociate stroke={color} strokeWidth={strokeWidth} />
      </Animated.View>

    </View>

  )
}
AnimatedLogoNameIntro.propTypes = {
  onLoaded: PropTypes.func,
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
}

AnimatedLogoNameIntro.defaultProps = {
  onLoaded: null,
}

export default AnimatedLogoNameIntro
