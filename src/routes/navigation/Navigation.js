import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { UserDataContext } from '../../context/UserDataContext'
import { toastConfig } from '../../utils/ShowToast'
import { auth } from '../../firebase'

import IntroStack from './stacks/IntroStack'
import RootStack from './stacks/RootStack'
import IntroduceStack from './stacks/IntroduceStack'

export default function Navigation() {
  const { userData } = useContext(UserDataContext)
  const scheme = useColorScheme()

  const getMainComponent = () => {
    console.log(`user data from Navigation.js ${JSON.stringify(userData)}`)
    if (userData && auth.currentUser && auth.currentUser.emailVerified) {
      return userData.isIntroduced ? <RootStack /> : <IntroduceStack />
    }
    return <IntroStack />
  }
  const darkBg = { colors: { background: '#000' } }
  const lightBg = { colors: { background: '#FFF' } }
  const themeBg = scheme === 'dark' ? darkBg : lightBg
  // console.log(themeBg)

  return (
    <>
      <NavigationContainer theme={themeBg}>
        {getMainComponent()}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  )
}
