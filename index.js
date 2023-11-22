import { registerRootComponent } from 'expo'

import React from 'react'
import { useColorScheme } from 'react-native'

import 'utils/ignore'

import * as SplashScreen from 'expo-splash-screen'

import AnimatedAppLoader from './src/components/splash/animated-app-loader'
import Connect411 from './src/index'

// const isHermes = () => !!global.HermesInternal

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  const systemTheme = useColorScheme()

  const isDark = systemTheme === 'dark'
  const resizeMode = 'contain'
  const bgColor = isDark ? '#000000' : '#FFFFFF'
  return (
    <AnimatedAppLoader isDark={isDark} resizeMode={resizeMode} bgColor={bgColor}>
      <Connect411 />
    </AnimatedAppLoader>
  )
}

registerRootComponent(App)
