import 'react-native-gesture-handler'
import React, { useContext } from 'react'
// import {
//   MD3DarkTheme,
//   MD3LightTheme,
//   PaperProvider,
// } from 'react-native-paper'
// import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
// import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { UserDataContext } from '../../context/UserDataContext'
import { toastConfig } from '../../utils/ShowToast'
import { auth } from '../../firebase'

import IntroStack from './stacks/IntroStack'
import RootStack from './stacks/RootStack'
import IntroduceStack from './stacks/IntroduceStack'

export default function Navigation() {
  const { userData } = useContext(UserDataContext)
  // const colorScheme = useColorScheme()

  const getMainComponent = () => {
    if (userData) {
      if (auth.currentUser && auth.currentUser.emailVerified) {
        return userData.isIntroduced ? <RootStack /> : <IntroduceStack />
      }
    }
    return <IntroStack />
  }

  // theming
  // const { theme } = useMaterial3Theme()

  // const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme
    // ? { ...MD3DarkTheme, colors: theme.dark }
    // : { ...MD3LightTheme, colors: theme.light }

  return (
    <>
      {/* <PaperProvider theme={paperTheme}> */}
      <NavigationContainer>
        {getMainComponent()}
      </NavigationContainer>
      <Toast config={toastConfig} />
      {/* </PaperProvider> */}
    </>
  )
}
