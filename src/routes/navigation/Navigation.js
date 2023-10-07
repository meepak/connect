import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { UserDataContext } from '../../context/UserDataContext'
import { toastConfig } from '../../utils/ShowToast'
import { auth } from '../../firebase'

import IntroStack from './stacks/IntroStack'
import RootStack from './stacks/RootStack'
import IntroduceStack from './stacks/IntroduceStack'

export default function Navigation() {
  const { scheme } = useContext(ColorSchemeContext)
  const { userData } = useContext(UserDataContext)

  const getMainComponent = () => {
    console.log(`user data from Navigation.js ${JSON.stringify(userData)}`)
    if (userData && auth.currentUser && auth.currentUser.emailVerified) {
      return userData.isIntroduced ? <RootStack /> : <IntroduceStack />
    }
    return <IntroStack />
  }

  return (
    <>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        {getMainComponent()}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  )
}
