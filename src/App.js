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
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import * as SystemUI from 'expo-system-ui'
import * as SplashScreen from 'expo-splash-screen'

import { UserDataContextProvider } from './context/UserDataContext'
import PreferencesContext from './context/PreferencesContext'
// import { PreferencesContextProvider } from './context/PreferencesContext'
import Icon from './components/core/Icon'
import AnimatedAppLoader from './components/splash/AnimatedAppLoader'
import Route from './Route'
import { hexThemeFromColor, prepareThemes } from './theme/custom'

// const isHermes = () => !!global.HermesInternal

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  const systemTheme = useColorScheme()
  const [themePreference, setThemePreference] = React.useState('system')
  const [themeCustomColor, setThemeCustomColor] = React.useState('')

  const [isDark, setIsDark] = React.useState(systemTheme === 'dark')
  const [useCustomColor, setUseCustomColor] = React.useState(false)

  const PREFERENCES_KEY = Constants.expoConfig.asyncStorage.key.preferences
  const CUSTOM_COLOR_PALETTE = Constants.expoConfig.display.palette

  const isDarkMode = (themePref) => {
    if (!themePref || !['dark', 'light'].includes(themePref)) {
      return systemTheme === 'dark'
    }
    return (themePref === 'dark')
  }

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY)
        const preferences = JSON.parse(prefString || '')
        // console.log('restoring preferences', preferences)
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
        // console.log('saving preferences', themePreference, themeCustomColor)
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
  }, [themePreference, themeCustomColor])

  // Preferences context parameter
  // would have ben need if I was able to define
  // it within allocated provider file,
  // but it seems I can't
  const preferences = React.useMemo(
    () => ({
      setThemePreference: (themePref) => {
        // console.log('setting themePreference', themePref)
        setIsDark(() => isDarkMode(themePref))
        setThemePreference(() => themePref)
      },
      setThemeCustomColor: (customColor) => {
        if (CUSTOM_COLOR_PALETTE.includes(customColor)) {
          setUseCustomColor(() => true)
          setThemeCustomColor(() => customColor)
        } else {
          setUseCustomColor(() => false)
          setThemeCustomColor('')
        }
      },
      themePreference,
      themeCustomColor,
      isDark,
      useCustomColor,
    }),
    [themePreference, themeCustomColor],
  )

  const { adaptedTheme } = adaptNavigationTheme(isDark
    ? { reactNavigationLight: NavigationDefaultTheme }
    : { reactNavigationDark: NavigationDarkTheme })

  const md3Theme = isDark ? MD3DarkTheme : MD3LightTheme
  const { theme: m3Theme } = useMaterial3Theme() // do i even need this???

  const resultTheme = useCustomColor
    ? (() => {
      const customBaseTheme = hexThemeFromColor(themeCustomColor, isDark ? 'dark' : 'light')
      const customTheme = prepareThemes(customBaseTheme)
      const customColors = isDark ? customTheme.dark : customTheme.light
      return {
        ...adaptedTheme,
        ...md3Theme,
        colors: {
          // ...m3,
          ...customColors,
        },
      }
    }
    )
    : (() => {
      const m3 = isDark ? m3Theme.dark : m3Theme.light
      return {
        ...adaptedTheme,
        ...md3Theme,
        colors: {
          ...m3,
        },
      }
    }
    )

  const paperTheme = resultTheme()

  // console.log('paper Theme', paperTheme)

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
