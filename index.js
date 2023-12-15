import { registerRootComponent } from 'expo'

import React from 'react'

import 'utils/ignore'

import * as SplashScreen from 'expo-splash-screen'

// import AnimatedAppLoader from './src/components/splash/animated-app-loader'
import Connect411 from './src/index'
import AnimatedSplashScreen from './src/components/splash/animated-splash-screen'

// const isHermes = () => !!global.HermesInternal

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  return (
    <AnimatedSplashScreen>
      <Connect411 />
    </AnimatedSplashScreen>
  )
}

registerRootComponent(App)
