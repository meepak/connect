import * as SystemUI from 'expo-system-ui'
import React, { useState, useEffect } from 'react'
import { Appearance, Dimensions, Platform, StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import PropTypes from 'prop-types'
import SvgLogo from '../svg/svg-logo'
import SvgFindAssociate from '../svg/svg-find-associate'
import { setStatusBarBackgroundColor, setStatusBarStyle, setStatusBarTranslucent } from 'expo-status-bar'
import { getDefaultColors } from '../../utils/functions'


const { bgColor, color, statusBarStyle, isDark } = getDefaultColors(Appearance.getColorScheme())
SystemUI.setBackgroundColorAsync(bgColor)
setStatusBarStyle(statusBarStyle)
if (Platform.OS === 'android') {
  setStatusBarBackgroundColor('transparent', false)
  setStatusBarTranslucent(true)
}

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const ANIMATION_DURATION = 666 
const EXIT_DURATION = 300

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
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logo: {
    width: LOGO_INITIAL_DIMENSION,
    height: LOGO_INITIAL_DIMENSION,
    marginRight: 5,
    zIndex: 2,
  },
  text: {
    marginLeft: 5,
    width: TEXT_INITIAL_WIDTH,
    height: 30,
    zIndex: 1,
  },
})

// TODO do not use this as loading screen, it should be part of the intro

const AnimatedSplash = ({
  onLoaded, color, bgColor, strokeWidth
}) => {

  const logoDimension = useSharedValue(LOGO_INITIAL_DIMENSION)
  const textWidth = useSharedValue(TEXT_INITIAL_WIDTH)
  const logoOpacity = useSharedValue(0.2)
  const textOpacity = useSharedValue(1)

  useEffect(() => {
    logoOpacity.value = withTiming(1, {duration: 200})
    logoDimension.value = withTiming(LOGO_FINAL_DIMENSION, { duration: ANIMATION_DURATION })
    textWidth.value = withTiming(TEXT_FINAL_WIDTH, { duration: ANIMATION_DURATION })
  }, []
  )

  const logoAnimationStyle = useAnimatedStyle(() => ({
   width: logoDimension.value,
   height: logoDimension.value,
   opacity: logoOpacity.value, 
  }), [logoDimension, logoOpacity])

  const textAnimationStyle = useAnimatedStyle(() => ({
    width: textWidth.value,
    opacity: textOpacity.value, 
   }), [textWidth, textOpacity])


   // https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/custom-animations/#custom-exiting-animation
  const exitingLogo = (values) => {
    "worklet"

    // console.log(initialScale, targetScale)
    const animations = {
      transform: [{ 
                    scale: withTiming(
                      SCREEN_HEIGHT*4/LOGO_INITIAL_DIMENSION, {
                        duration: EXIT_DURATION , easing: Easing.linear
                      }
                    ) 
                 }],
      // width: withTiming(SCREEN_HEIGHT, {duration: EXIT_DURATION}),
      // height: withTiming(SCREEN_HEIGHT, {duration: EXIT_DURATION}),
      // originX: withTiming(0, {duration: EXIT_DURATION}),
      // originY: withTiming(0, {duration: EXIT_DURATION}),
      opacity: withTiming(0, {duration: EXIT_DURATION, easing: Easing.linear} ),
    }

    const initialValues = {
      transform: [{ scale:  1 }],
      // width: values.currentHeight,
      // height: values.currentHeight,
      // originX: values.currentOriginX,
      // originY: values.currentOriginY,
      opacity: 1,
    }

    // const callback = (finished) => {
    //   // optional callback that will fire when layout animation ends
    //   if(finished) {
    //     console.log('animated-splash logo exited')
    //   }
    // };

    return {
      initialValues,
      animations,
      // callback
    }
  }

  // if we hide text immediately, it will create jerky motion for log
  const exitingText = (values) => {
    "worklet"
    const animations = {
      transform: [{ scale: withTiming(0.1, {duration: EXIT_DURATION } )}],
      opacity: withTiming(0, {duration: EXIT_DURATION} ),
    }

    const initialValues = {
      transform: [{ scale:  1 }],
      opacity: 1,
    }

    // const callback = (finished) => {
    //   // optional callback that will fire when layout animation ends
    //   if(finished) {
    //     console.log('animated-splash text exited')
    //   }
    // };

    return {
      initialValues,
      animations,
      // callback
    }
  }
  


  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }} onLayout={() => onLoaded && onLoaded(true)}>

      <Animated.View
        style={[ styles.logo, logoAnimationStyle ]}
        exiting={exitingLogo}
      >
        <SvgLogo style={{borderWidth: 1, borderColor: 'green'}} />
      </Animated.View>

      <Animated.View
        style={[ styles.text, textAnimationStyle]}
        exiting={exitingText}
      >
        <SvgFindAssociate stroke={color} strokeWidth={strokeWidth} />
      </Animated.View>

    </View>

  )
}
AnimatedSplash.propTypes = {
  onLoaded: PropTypes.func,
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
}

AnimatedSplash.defaultProps = {
  onLoaded: null,
}

export default AnimatedSplash
