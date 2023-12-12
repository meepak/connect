import React, {
  useCallback, useState,
} from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Preload from '../../preload'
import AnimatedSplash from './animated-splash'

function AnimatedSplashScreen({
  children, bgColor,
}) {
  // console.log('In AnimatedSplashScreen')
  const [isAppReady, setAppReady] = useState(false)

  const getAppReady = useCallback(async () => {
    try {
      // console.log('start preloading')
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

  const onAnimationReady = (ready) => {
    if (ready) getAppReady()
  }

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {!isAppReady && <AnimatedSplash onLoaded={(p) => onAnimationReady(p)} /> }
      {isAppReady && children}
    </View>
  )
}

AnimatedSplashScreen.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
}

export default AnimatedSplashScreen
