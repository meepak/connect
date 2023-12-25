import { registerRootComponent } from 'expo'

import React, { useEffect } from 'react'

// import 'utils/ignore'

// import * as SplashScreen from 'expo-splash-screen'

// import AnimatedAppLoader from './src/components/splash/animated-app-loader'
import * as SystemUI from 'expo-system-ui'
import { Appearance } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Connect411 from './src/index'
// import AnimatedSplashScreen from './src/components/splash/animated-splash-screen'
import Preload from './src/preload'

// Instruct SplashScreen not to hide yet, we want to do this manually
// SplashScreen.preventAutoHideAsync()

const isDark = Appearance.getColorScheme()
// const isHermes = () => !!global.HermesInternal
// just in case it wasn't put through app.json config
const bgColor = isDark ? 'black' : 'white'
SystemUI.setBackgroundColorAsync(bgColor)
const statusBarStyle = isDark ? 'light' : 'dark'

const App = () => {
  useEffect(() => {
    async function getAppReady() {
      try {
        // Load stuff
        await Preload()
        // additional simulated delay
        // await new Promise((resolve) => setTimeout(resolve, 5000))
        // await Promise.all([])
      } catch (e) {
        // handle errors
        console.log(`APP PRELOADING ERROR - ${e}`)
      } finally {
        // Let's remove the native splash screen
        // await SplashScreen.hideAsync()
        // this can be used if we get into use case of loading a
        // heavy stuff without which app can't proceed & which can be loaded asynchronously.
        // at the moment we have no such requirement want app to be light as possilbe
        // so not using it but it's a good option to have, can be tested with simulated delay within preload function
      }
    }

    getAppReady()
  }, [])

  return (
    <>
      <StatusBar hidden={false} animated={false} style={statusBarStyle} />
      <Connect411 />
    </>
  )
}

registerRootComponent(App)
