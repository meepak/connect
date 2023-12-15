import React, {
  useCallback, useState,
} from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { View, useColorScheme } from 'react-native'
import PropTypes from 'prop-types'
import Preload from '../../preload'
import AnimatedSplash from './animated-splash'

const AnimatedSplashScreen = ({ children }) => {
  const systemTheme = useColorScheme()
  const isDark = systemTheme === 'dark'
  // console.log('In AnimatedSplashScreen')
  const [isAppReady, setAppReady] = useState(false)
  const bgColor = isDark ? '#000000' : '#FFFFFF'

  const getAppReady = useCallback(async () => {
    try {
      // console.log('start preloading')
      await SplashScreen.hideAsync()
      // Load stuff
      await Preload()
      // additional simulated delay
      await new Promise((resolve) => setTimeout(resolve, 2000))
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

  onAnimationReady(true)

  // TODO check if this made build fail
  SystemUI.setBackgroundColorAsync(isDark ? '#000000' : '#ffffff')

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
    <StatusBar hidden={false} animated={false}  style={isDark ? 'light' : 'dark'} backgroundColor={bgColor}/>
      {/* <AnimatedSplash onLoaded={(p) => onAnimationReady(p)} /> */}
      {!isAppReady && <AnimatedSplash onLoaded={(p) => onAnimationReady(p)} /> }
      {isAppReady && children}
    </View>
  )
}

AnimatedSplashScreen.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AnimatedSplashScreen
