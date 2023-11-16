import React from 'react'
import { useColorScheme } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider,
} from 'react-native-paper'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'

import { Provider } from 'jotai'
import 'utils/ignore'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import * as SystemUI from 'expo-system-ui'
import * as SplashScreen from 'expo-splash-screen'
import Constants from 'expo-constants'

import { UserDataContextProvider } from './context/UserDataContext'
import PreferencesContext from './context/PreferencesContext'
// import { PreferencesContextProvider } from './context/PreferencesContext'
import Icon from './components/core/Icon'
import AnimatedAppLoader from './components/splash/AnimatedAppLoader'
import Route from './Route'

// const isHermes = () => !!global.HermesInternal

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const PREFERENCES_KEY = 'CONNECT411_PREFERENCES'

const App = () => {
  const systemTheme = useColorScheme()
  const [themePreference, setThemePreference] = React.useState('system')

  const isDarkMode = (themePref) => {
    if (!themePref) {
      return systemTheme === 'dark'
    }
    if (themePref === 'system') {
      return systemTheme === 'dark'
    } if (themePref === 'dark') {
      return true
    }
    return false
  }
  const [isDark, setIsDark] = React.useState(systemTheme === 'dark')

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY)
        const preferences = JSON.parse(prefString || '')
        if (preferences) {
          setIsDark(() => isDarkMode(preferences.themePreference))
        }
      } catch (e) {
        // ignore error
        console.log('error restorePrefs', e)
      }
    }
    restorePrefs()
  }, [])

  React.useEffect(() => {
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(
          PREFERENCES_KEY,
          JSON.stringify({
            themePreference,
          }),
        )
      } catch (e) {
        // ignore error
        console.log('error savePrefs', e)
      }
    }

    savePrefs()
  }, [themePreference])

  // Preferences context parameter
  // would have ben need if I was able to define
  // it within allocated provider file,
  // but it seems I can't
  const preferences = React.useMemo(
    () => ({
      themePreference,
      isDark,
      setThemePreference: (themePref) => {
        // console.log('setting themePreference', themePref)
        setIsDark(() => isDarkMode(themePref))
        setThemePreference(themePref)
      },
    }),
    [themePreference],
  )

  const { adaptedTheme } = adaptNavigationTheme(isDark
    ? { reactNavigationLight: NavigationDefaultTheme }
    : { reactNavigationDark: NavigationDarkTheme })

  const md3Theme = isDark ? MD3DarkTheme : MD3LightTheme

  const { theme: m3Theme } = useMaterial3Theme() // do i even need this???

  const paperTheme = { ...adaptedTheme, ...md3Theme, colors: isDark ? m3Theme.dark : m3Theme.light }

  // solution to white flash for android while keyboard appears
  SystemUI.setBackgroundColorAsync(paperTheme.colors.background)

  // if (!didLoad) return <LoadingScreen />
  // console.log('App.js loaded')
  const paperSettings = {
    icon: (props) => <Icon {...props} />,
  }
  const resizeMode = Constants.expoConfig.splash.resizeMode || 'contain'
  const bgColor = paperTheme.colors.background
  return (
    <AnimatedAppLoader isDark={isDark} resizeMode={resizeMode} bgColor={bgColor}>
      <Provider>
        <PreferencesContext.Provider value={preferences}>
          <UserDataContextProvider>
            <ActionSheetProvider>
              <PaperProvider settings={paperSettings} theme={paperTheme}>
                <Route />
              </PaperProvider>
            </ActionSheetProvider>
          </UserDataContextProvider>
        </PreferencesContext.Provider>
      </Provider>
    </AnimatedAppLoader>
  )
}

export default App
