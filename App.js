import React from 'react'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { useColorScheme } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper'
import App from './src'

export default function Main() {
  const colorScheme = useColorScheme()
  const { theme } = useMaterial3Theme()

  // const lightTheme = { ...MD3LightTheme, colors: theme.light }
  // console.log('------light theme-------')
  // console.log(lightTheme)
  // console.log('-------------------')

  // const darkTheme = { ...MD3DarkTheme, colors: theme.dark }
  // console.log('------dark theme-------')
  // console.log(darkTheme)
  // console.log('-------------------')

  const paperTheme = colorScheme === 'dark'
    ? { ...MD3DarkTheme, colors: theme.dark }
    : { ...MD3LightTheme, colors: theme.light }

    const customTheme = {
      ...MD3DarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        background: '#000ff0',
        primary: '#ff0000',
        text: '#00ff00',
      },
    }

  return (
    <PaperProvider theme={customTheme}>
      <App />
    </PaperProvider>
  )
}
