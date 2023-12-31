import { registerRootComponent } from 'expo'

import React from 'react'

import { Provider } from 'jotai'

// import 'utils/ignore'

import * as SplashScreen from 'expo-splash-screen'

// import AnimatedAppLoader from './src/components/splash/animated-app-loader'
import * as SystemUI from 'expo-system-ui'
import { Appearance, Platform } from 'react-native'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import AppLoader from './src'
import { getDefaultColors } from './src/utils/functions'
// import Preload from './src/preload'
// const isHermes = () => !!global.HermesInternal
// just in case it wasn't put through app.json config

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync()

const { bgColor, statusBarStyle } = getDefaultColors(Appearance.getColorScheme())
SystemUI.setBackgroundColorAsync(bgColor)

// console.log(statusBarStyle)
setStatusBarStyle(statusBarStyle)
// if (Platform.OS === 'android') {
//   // setStatusBarBackgroundColor(bgColor, false)
// }

const App = () => (
  <Provider>
    <AppLoader />
  </Provider>
)

registerRootComponent(App)
