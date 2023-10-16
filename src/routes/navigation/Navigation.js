import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { useTheme } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { UserDataContext } from '../../context/UserDataContext'
import { toastConfig } from '../../utils/ShowToast'
import { auth } from '../../firebase'
import IntroStack from './stacks/IntroStack'
import OnboardingStack from './stacks/OnboardingStack'
import DrawerNavigator from './drawer'

export default function Navigation() {
  const { userData } = useContext(UserDataContext)
  const theme = useTheme()
  const getMainComponent = () => {
    if (userData) {
      if (auth.currentUser && auth.currentUser.emailVerified) {
        return userData.isOnboarded ? <DrawerNavigator /> : <OnboardingStack />
      }
    }
    return <IntroStack />
  }

  return (
    <>
      <NavigationContainer theme={theme}>
        {getMainComponent()}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  )
}
