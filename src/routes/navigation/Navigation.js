import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { UserDataContext } from '../../context/UserDataContext'
import { toastConfig } from '../../utils/ShowToast'
import { auth } from '../../firebase'

import IntroStack from './stacks/IntroStack'
import RootStack from './stacks/RootStack'
import IntroduceStack from './stacks/IntroduceStack'

export default function Navigation() {
  const { userData } = useContext(UserDataContext)
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const getMainComponent = () => {
    if (userData) {
      if (auth.currentUser && auth.currentUser.emailVerified) {
        return userData.isIntroduced ? <RootStack /> : <IntroduceStack />
      }
    }
    return <IntroStack />
  }

  // theming
  const { theme } = useMaterial3Theme()

  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme

  const { adaptedTheme } = adaptNavigationTheme(isDark ? { reactNavigationLight: paperTheme } : { reactNavigationDark: paperTheme })

  const finalTheme = { ...adaptedTheme, colors: isDark ? theme.dark : theme.light }

  return (
    <>
      <PaperProvider theme={finalTheme}>
        <NavigationContainer theme={finalTheme}>
          {getMainComponent()}
        </NavigationContainer>
        <Toast config={toastConfig} />
      </PaperProvider>
    </>
  )
}
