import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { Animated, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import Preload from '../../Preload'

function AnimatedSplashScreen({
  children, image, resizeMode, bgColor,
}) {
  // console.log('In AnimatedSplashScreen')
  const animation = useMemo(() => new Animated.Value(1), [])
  const [isAppReady, setAppReady] = useState(false)
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // console.log('In AnimatedSplashScreen, is App ready????')
    if (isAppReady) {
      // console.log('In AnimatedSplashScreen, yes app is ready and its starting animation now??')
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true))
    }
  }, [isAppReady])

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync()
      // Load stuff
      await Preload()
      // await Promise.all([])
    } catch (e) {
      // handle errors
      console.log(`APP PRELOADING ERROR - ${e}`)
    } finally {
      setAppReady(true)
    }
  }, [])

  // TODO: Make this splsh screen animation bit fancy??
  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: bgColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode,
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 0.5, 1, 1.5, 2.0, 2.5],
                    outputRange: [1, 1.5, 1, 1.5, 1, 0.5], // Scale up, then scale down
                  }),
                },
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 0.5, 1, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5],
                    outputRange: ['0deg', '180deg', '0deg', '180deg', '0deg', '180deg', '0deg', '0deg', '180deg', '0deg'], // Rotate counterclockwise, then clockwise
                  }),
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={4000}
          />
        </Animated.View>
      )}
    </View>
  )
}

AnimatedSplashScreen.propTypes = {
  children: PropTypes.node.isRequired,
  // image can be string or number
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  resizeMode: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
}

export default AnimatedSplashScreen
