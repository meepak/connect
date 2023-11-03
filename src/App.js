import React, { useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider,
} from 'react-native-paper'
import { Provider } from 'jotai'
import 'utils/ignore'
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'

import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import * as SystemUI from 'expo-system-ui'

import FontIcon from 'react-native-vector-icons/FontAwesome5'

import { UserDataContextProvider } from './context/UserDataContext'

import LoadingScreen from './components/LoadingScreen'

import jsonData from '../assets/data/occupations.json'

// assets
import Router from './routes'

const isHermes = () => !!global.HermesInternal

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)
  console.log('isHermes', isHermes())

  // load json data to async storage
  const storeData = async () => {
    try {
      const key = 'occupation'
      // Check if the data already exists in AsyncStorage
      const existingData = await AsyncStorage.getItem(key)

      if (existingData === null) { // TODO PRE-CLEAN UP THE JSON FILE TO AVOID DELAYED LOAD TIME
      // we just want unique SOCTitles
        // Extract unique titles from jsonData
        const uniqueTitles = [...new Set(jsonData.SOCGroups.map((item) => item.SOCTitle))]

        // Create newJsonData with unique titles
        const newJsonData = uniqueTitles.map((title) => ({ title }))

        // Sort the newJsonData array by the length of the title (shortest titles first)
        const sortedJsonData = newJsonData.slice().sort((a, b) => a.title.length - b.title.length)
        // Data doesn't exist, so store it
        const jsonStr = JSON.stringify(sortedJsonData)
        // console.log(jsonStr)
        await AsyncStorage.setItem(key, jsonStr)
        console.log('Occupation Data stored successfully')
      } else {
        console.log('Occupation Data already exists in AsyncStorage')
      }
    } catch (error) {
      console.error('Error storing data:', error)
    }
  }
  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    await storeData()
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
  }, [])

  // theming
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const { theme } = useMaterial3Theme()

  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme

  const { adaptedTheme } = adaptNavigationTheme(isDark ? { reactNavigationLight: paperTheme } : { reactNavigationDark: paperTheme })

  const finalTheme = { ...adaptedTheme, colors: isDark ? theme.dark : theme.light }

  // solution to white flash for android while keyboard appears
  SystemUI.setBackgroundColorAsync(finalTheme.colors.background)

  // rendering
  // if (!didLoad) return <LoadingScreen />
  return (
    <Provider>
      <UserDataContextProvider>
        <ActionSheetProvider>
          <PaperProvider
            settings={{
              icon: (props) => <FontIcon {...props} />,
            }}
            theme={finalTheme}
          >
            {didLoad
              ? <Router />
              : <LoadingScreen />}
          </PaperProvider>
        </ActionSheetProvider>
      </UserDataContextProvider>
    </Provider>
  )
}

export default App
