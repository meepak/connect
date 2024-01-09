import React, { useEffect } from 'react'
import { Appearance, ColorValue, useColorScheme } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider,
  MD3Theme,
} from 'react-native-paper'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from '@react-navigation/native'
import { Material3Scheme, useMaterial3Theme } from '@pchmn/expo-material3-theme'

import { SafeAreaProvider } from 'react-native-safe-area-context'

// import 'utils/ignore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SystemUI from 'expo-system-ui'
import Navigation from './navigation'

// import { Preferences, PreferencesContext } from '@/context'
import Icon from './components/core/icon'
import { hexThemeFromColor, prepareThemes } from '@/theme/custom'
import { ASYNC_STORAGE_KEY, DISPLAY } from '@/utils/constants'
import { getDefaultColors, sleepSync } from '@/utils/functions'
import { AuthUserActionType, useAuthUser } from '@/context'
import {
  NavigationTheme,
  ThemeProp,
} from 'react-native-paper/lib/typescript/types'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// const { bgColor } = getDefaultColors(Appearance.getColorScheme())
// SystemUI.setBackgroundColorAsync(bgColor)

// TODO: Make this part of the app_loader as it's quick already it's better to get the theme prior if we can !
// may be doesn't matter, will reevalute later
const FindAssociate = () => {
  const { authUser, dispatchAuthUser: dispatch } = useAuthUser()
  const systemTheme = useColorScheme()
  const [themePreference, setThemePreference] = React.useState('system')
  const [themeCustomColor, setThemeCustomColor] = React.useState('')

  const [isDark, setIsDark] = React.useState(systemTheme === 'dark')
  const [useCustomColor, setUseCustomColor] = React.useState(false)
  const [debug, setDebug] = React.useState(
    process.env.EXPO_PUBLIC_DEVELOPMENT_MODE === 'true',
  )

  const PREFERENCES_KEY = ASYNC_STORAGE_KEY.Preferences
  const CUSTOM_COLOR_PALETTE = DISPLAY.Palette

  const isDarkMode = (themePref) => {
    if (!themePref || !['dark', 'light'].includes(themePref)) {
      return systemTheme === 'dark'
    }
    return themePref === 'dark'
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
  // const preferences: Preferences = React.useMemo(
  //   () => ({
  //     setThemePreference: (themePref) => {
  //       // console.log('setting themePreference', themePref)
  //       setIsDark(() => isDarkMode(themePref))
  //       setThemePreference(() => themePref)
  //     },
  //     setUseCustomColor: (value) => {
  //       if (value && !CUSTOM_COLOR_PALETTE.includes(themeCustomColor)) {
  //         setThemeCustomColor(CUSTOM_COLOR_PALETTE[7]) // set default color
  //       }
  //       setUseCustomColor(() => value)
  //     },
  //     useCustomColor,
  //     setThemeCustomColor,
  //     themePreference,
  //     themeCustomColor,
  //     isDark,
  //     showRenderCounter,
  //     setShowRenderCounter,
  //   }),
  //   [themePreference, themeCustomColor, useCustomColor, showRenderCounter],
  // )
  useEffect(() => {
    const preferences = {
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
      debug,
      setDebug,
    }
    dispatch({ type: AuthUserActionType.SET_PREFERENCES, payload: preferences })
  }, [themePreference, themeCustomColor, useCustomColor, setDebug])

  // simplified approach to theme building, test if it will work else copy back old implementation
  // Define the type of the theme
  let adaptedTheme: {
    DarkTheme?: NavigationTheme
    LightTheme?: NavigationTheme
    dark?: boolean
    colors?: {
      primary: string
      background: string
      card: string
      text: string
      border: string
      notification: string
    }
  }
  let md3Theme: MD3Theme
  let m3: Material3Scheme

  const { theme: m3Theme, updateTheme: updateTheme } = useCustomColor
    ? useMaterial3Theme({ sourceColor: themeCustomColor })
    : useMaterial3Theme()

  if (isDark) {
    adaptedTheme = adaptNavigationTheme({
      reactNavigationDark: NavigationDarkTheme,
    })
    md3Theme = MD3DarkTheme
    m3 = m3Theme.dark
  } else {
    adaptedTheme = adaptNavigationTheme({
      reactNavigationLight: NavigationDefaultTheme,
    })
    md3Theme = MD3LightTheme
    m3 = m3Theme.light
  }

  // create extended paperTheme type to support backgroundOriginal property
  type ExtendedThemeProp = ThemeProp & {
    colors: {
      backgroundOriginal?: string
    }
  }

  const paperTheme: ExtendedThemeProp = {
    ...adaptedTheme,
    ...md3Theme,
    colors: {
      ...m3,
    },
  }

  // replace background value in colors with transparent while saving original value in backgroundOriginal
  paperTheme.colors.backgroundOriginal = paperTheme.colors.background
  paperTheme.colors.background = 'transparent'

  // solution to white flash for android while keyboard appears
  // doing it again here because user preference may override system setting
  // SystemUI.setBackgroundColorAsync(paperTheme.colors.background as ColorValue)

  // console.log('App.js loaded')
  const paperSettings = {
    icon: (props: any) => <Icon {...props} />,
  }
  return (
    <PaperProvider settings={paperSettings} theme={paperTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
            <Navigation />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  )
}

export default FindAssociate
