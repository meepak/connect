import React, { useState, useEffect } from 'react'
import { View, useColorScheme } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper'
import { Provider } from 'jotai'
import 'utils/ignore'
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { UserDataContextProvider } from './context/UserDataContext'

// assets
import Router from './routes'

const isHermes = () => !!global.HermesInternal

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)
  console.log('isHermes', isHermes())

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
  }, [])

  // theming
  const colorScheme = useColorScheme()
  const { theme } = useMaterial3Theme()

  const paperTheme = colorScheme === 'dark'
    ? { ...MD3DarkTheme, colors: theme.dark }
    : { ...MD3LightTheme, colors: theme.light }

  // rendering
  if (!didLoad) return <View />
  return (
    <Provider>
      <UserDataContextProvider>
        <PaperProvider theme={paperTheme}>
          <Router />
        </PaperProvider>
      </UserDataContextProvider>
    </Provider>
  )
}

export default App
