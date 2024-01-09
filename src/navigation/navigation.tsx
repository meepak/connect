import 'react-native-gesture-handler'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { NavigationContainer, Theme } from '@react-navigation/native'
import { AuthStatus, useAuthUser } from '../context'
// import { toastConfig } from '@/utils/show-toast'
import IntroStack from './stacks/intro-stack'
import OnboardingStack from './stacks/onboarding-stack'
import RootStack from './stacks/root-stack'
import { ScreenTemplate } from '@/components/template'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
// import LoadingScreen from '@/components/loading-screen'


export default function Navigation() {
  const { authUser } = useAuthUser()
  const theme = useTheme<Theme>()

  const getMainComponent = () => {
    if (
      authUser.status !== AuthStatus.Checking &&
      authUser.data &&
      Object.keys(authUser.data).length > 0
    ) {
      // console.log('NAVIGATION userData is on boarded??', userData.isOnboard)
      return authUser.data.isOnboard ? <RootStack /> : <OnboardingStack />
      // temporary return to fix first part of app
      // return <OnboardingStack />
    }
    
    return <IntroStack />
  }

  return (
        <NavigationContainer theme={ theme }>
          <BottomSheetModalProvider>
          <ScreenTemplate>{getMainComponent()}</ScreenTemplate>
          </BottomSheetModalProvider>
        </NavigationContainer>
  )
}
