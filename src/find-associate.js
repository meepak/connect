import React from 'react'
import { Appearance, useColorScheme } from 'react-native'
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

import { SafeAreaProvider } from 'react-native-safe-area-context'

// import 'utils/ignore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SystemUI from 'expo-system-ui'
import Navigation from './navigation'

import { PreferencesContext } from './context'
import Icon from './components/core/icon'
import { hexThemeFromColor, prepareThemes } from './theme/custom'
import { ASYNC_STORAGE_KEY, DISPLAY } from './utils/constants'
import { getDefaultColors, sleepSync } from './utils/functions'

const { bgColor } = getDefaultColors(Appearance.getColorScheme())
SystemUI.setBackgroundColorAsync(bgColor)

const FindAssociate = () => {
  const systemTheme = useColorScheme()
  const [themePreference, setThemePreference] = React.useState('system')
  const [themeCustomColor, setThemeCustomColor] = React.useState('')

  const [isDark, setIsDark] = React.useState(systemTheme === 'dark')
  const [useCustomColor, setUseCustomColor] = React.useState(false)
  const [showRenderCounter, setShowRenderCounter] = React.useState(process.env.EXPO_PUBLIC_DEVELOPMENT_MODE === 'true')

  const PREFERENCES_KEY = ASYNC_STORAGE_KEY.Preferences
  const CUSTOM_COLOR_PALETTE = DISPLAY.Palette

  const isDarkMode = (themePref) => {
    if (!themePref || !['dark', 'light'].includes(themePref)) {
      return systemTheme === 'dark'
    }
    return (themePref === 'dark')
  }

  React.useEffect(() => {
    const restorePref = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY)
        const preferences = JSON.parse(prefString || '')
        // console.log('restoring preferences', preferences)
        if (preferences) {
          setIsDark(() => isDarkMode(preferences.themePreference))
        }
      } catch (e) {
        // ignore error
        console.log('error restorePref', e)
      }
    }
    restorePref()
  }, [systemTheme])

  React.useEffect(() => {
    const savePref = async () => {
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
        console.log('error savePref', e)
      }
    }

    savePref()
  }, [themePreference, themeCustomColor])

  // Preferences context parameter
  const preferences = React.useMemo(
    () => ({
      setThemePreference: (themePref) => {
        // console.log('setting themePreference', themePref)
        setIsDark(() => isDarkMode(themePref))
        setThemePreference(() => themePref)
      },
      setUseCustomColor: (value) => {
        if (value && !CUSTOM_COLOR_PALETTE.includes(themeCustomColor)) {
          setThemeCustomColor(CUSTOM_COLOR_PALETTE[7]) // set default color
        }
        setUseCustomColor(() => value)
      },
      useCustomColor,
      setThemeCustomColor,
      themePreference,
      themeCustomColor,
      isDark,
      showRenderCounter,
      setShowRenderCounter,
    }),
    [themePreference, themeCustomColor, useCustomColor, showRenderCounter],
  )

  // prepare the theme
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
  // doing it again here because user preference may override system setting
  SystemUI.setBackgroundColorAsync(paperTheme.colors.background)

  // console.log('App.js loaded')
  const paperSettings = {
    icon: (props) => <Icon {...props} />,
  }
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider settings={paperSettings} theme={paperTheme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PaperProvider>
    </PreferencesContext.Provider>
  )
}

export default FindAssociate
