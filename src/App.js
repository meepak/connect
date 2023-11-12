import React from 'react'
import { useColorScheme } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider,
} from 'react-native-paper'
import { Provider } from 'jotai'
import 'utils/ignore'
// import { imageAssets } from 'theme/images'
// import { fontAssets } from 'theme/fonts'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'

import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import * as SystemUI from 'expo-system-ui'
import * as SplashScreen from 'expo-splash-screen'
import Constants from 'expo-constants'

import { UserDataContextProvider } from './context/UserDataContext'
import Icon from './components/core/Icon'
import AnimatedAppLoader from './components/splash/AnimatedAppLoader'
// assets
import Router from './routes'

// const isHermes = () => !!global.HermesInternal

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const { theme } = useMaterial3Theme()

  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme

  const { adaptedTheme } = adaptNavigationTheme(isDark ? { reactNavigationLight: paperTheme } : { reactNavigationDark: paperTheme })

  const finalTheme = { ...adaptedTheme, colors: isDark ? theme.dark : theme.light }

  // solution to white flash for android while keyboard appears
  SystemUI.setBackgroundColorAsync(finalTheme.colors.background)

  // const image = require('../assets/images/splash-new-dark.png')
  // console.log(image)
  // rendering
  // if (!didLoad) return <LoadingScreen />
  // console.log('App.js loaded')
  return (
    <AnimatedAppLoader
      isDark={isDark}
      // image={Constants.expoConfig.splash.imageSvg}
      // image={image}
      resizeMode={Constants.expoConfig.splash.resizeMode || 'contain'}
      bgColor={finalTheme.colors.background}
    >
      <Provider>
        <UserDataContextProvider>
          <ActionSheetProvider>
            <PaperProvider
              settings={{
                icon: (props) => <Icon {...props} />,
              }}
              theme={finalTheme}
            >
              <Router />
            </PaperProvider>
          </ActionSheetProvider>
        </UserDataContextProvider>
      </Provider>
    </AnimatedAppLoader>
  )
}

export default App
