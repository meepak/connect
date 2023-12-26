import React, {
  useCallback, useState,
} from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { Appearance, View } from 'react-native'
import PropTypes from 'prop-types'
import * as SystemUI from 'expo-system-ui'
import { StatusBar, setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import Preload from '../../preload'
import AnimatedLogoNameIntro from '../animated/animated-logo-name-intro'
import { getDefaultColors } from '../../utils/functions'

// SplashScreen.preventAutoHideAsync()

const { bgColor, color, statusBarStyle } = getDefaultColors(Appearance.getColorScheme())
SystemUI.setBackgroundColorAsync(bgColor)
setStatusBarStyle(statusBarStyle)
setStatusBarBackgroundColor(bgColor)

const AnimatedSplashScreen = ({ children }) => {
  // console.log('In AnimatedSplashScreen')
  const [isAppReady, setAppReady] = useState(false)

  // let's keep loading the app
  // no point waiting for the splash screen to get ready
  async function getAppReady() {
    try {
      console.log('app preloading')
      // Load stuff
      await Preload()
      // additional simulated delay, to show the app name, hope it won't hurt.
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // await Promise.all([])
    } catch (e) {
      // handle errors
      console.log(`APP PRELOADING ERROR - ${e}`)
    } finally {
      // Tell the application to render
      setAppReady(true)
    }
  }

  const onSplashReady = useCallback(async (ready) => {
    if (ready && !isAppReady) {
      // console.log('closing builtin splash to display animated onee, and you should see white flash right now.')
      // if splash screen is loaded but app is not yet ready,
      // show our animated splash instead of default static splash specified in app.json
      // https://docs.expo.dev/versions/latest/sdk/font/
      // https://stackoverflow.com/questions/64780275/at-using-expo-after-splash-screen-blinkflash-with-white-screen
      await new Promise((resolve) => setTimeout(resolve, 300))
      await SplashScreen.hideAsync()
      // const existingBg = await SystemUI.getBackgroundColorAsync()
      // console.log('existing bg color', existingBg)
      await getAppReady()
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {/* <StatusBar hidden={false} style={statusBarStyle} /> */}
      {!isAppReady && <AnimatedLogoNameIntro bgColor={bgColor} color={color} onLoaded={(p) => onSplashReady(p)} />}
      {isAppReady && children}
    </View>
  )
}

AnimatedSplashScreen.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AnimatedSplashScreen
