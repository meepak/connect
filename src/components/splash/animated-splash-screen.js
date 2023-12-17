import React, {
  useCallback, useEffect, useState,
} from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { View, useColorScheme } from 'react-native'
import PropTypes from 'prop-types'
import * as SystemUI from 'expo-system-ui'
import Preload from '../../preload'
import AnimatedSplash from './animated-splash'

const AnimatedSplashScreen = ({ children }) => {
  const isDark = useColorScheme() === 'dark'
  // console.log('In AnimatedSplashScreen')
  const [isAppReady, setAppReady] = useState(false)
  const bgColor = isDark ? 'black' : 'white'

  // let's keep loading the app
  // no point waiting for the splash screen to get ready
  // TODO this doesn't start to run straight away to optimize app keep loading this straight away in background
  // TODO we don't need to wait for fancy animation splace to load stuf
  useEffect(() => {
    async function getAppReady() {
      try {
        // Load stuff
        await Preload()
        // additional simulated delay
        await new Promise((resolve) => setTimeout(resolve, 5000))
        // await Promise.all([])
      } catch (e) {
        // handle errors
        console.log(`APP PRELOADING ERROR - ${e}`)
      } finally {
        // Tell the application to render
        setAppReady(true)
      }
    }

    getAppReady()
  }, [])

  const onSplashReady = useCallback(async (ready) => {
    if (ready && !isAppReady) {
      // console.log('closing builtin splash to display animated onee, and you should see white flash right now.')
      // if splash screen is loaded but app is not yet ready,
      // show our animated splash instead of default static splash specified in app.json
      await SystemUI.setBackgroundColorAsync(bgColor)
      // const existingBg = await SystemUI.getBackgroundColorAsync()
      // console.log('existing bg color', existingBg)
      await SplashScreen.hideAsync()
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {/* <AnimatedSplash onLoaded={(p) => onAnimationReady(p)} /> */}
      {!isAppReady && <AnimatedSplash isDark={isDark} onLoaded={(p) => onSplashReady(p)} />}
      {isAppReady && children}
    </View>
  )
}

AnimatedSplashScreen.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AnimatedSplashScreen
