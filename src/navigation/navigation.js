import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { useTheme } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAtom } from 'jotai'
import { UserDataContext } from '../context'
import userAuthenticatedAtom from '../utils/atom'
import { toastConfig } from '../utils/show-toast'
import IntroStack from './stacks/intro-stack'
import OnboardingStack from './stacks/onboarding-stack'
import RootStack from './stacks/root-stack'
// import LoadingScreen from '../components/loading-screen'

// About saving navigation state -- I wonder how this works, quite not convince I need this but let's see
// Commenting out the navigation sate persistent part for now
// can't seem to get the benefit of it for now, could be useful
// later for offline application, will enable it,
// if found proper use case else will remove it
// const PERSISTENCE_KEY = 'CONNECT411_NAVIGATION_STATE'

export default function Navigation() {
  // const [isReady, setIsReady] = React.useState(false)
  // const [initialState, setInitialState] = React.useState()
  const { userData } = useContext(UserDataContext)
  const [userAuthenticated] = useAtom(userAuthenticatedAtom)
  const theme = useTheme()

  // React.useEffect(() => {
  //   const restoreState = async () => {
  //     try {
  //       const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY)
  //       const state = JSON.parse(savedStateString || '')
  //       console.log('navigation restore state', state)

  //       setInitialState(state)
  //     } catch (e) {
  //       // ignore error
  //       console.log('error navigation', e)
  //     } finally {
  //       setIsReady(true)
  //     }
  //   }

  //   if (!isReady) {
  //     restoreState()
  //   }
  // }, [isReady])

  // if (!isReady) {
  //   return <LoadingScreen />
  // }

  const getMainComponent = () => {
    if (userAuthenticated && userData && Object.keys(userData).length > 0) {
      // console.log('NAVIGATION userData is on boarded??', userData.isOnboard)
      return userData.isOnboard ? <RootStack /> : <OnboardingStack />
    }
    return <IntroStack />
  }

  return (
    <>
      <NavigationContainer
        theme={theme}
        // initialState={initialState}
        // onStateChange={(state) => {
        //   const data = JSON.stringify(state)
        //   // console.log('navigation state changed, saving ', data)
        //   try {
        //     AsyncStorage.setItem(PERSISTENCE_KEY, data)
        //   } catch (e) {
        //     // ignore error
        //     console.log('error savePref', e)
        //   }
        // }}
      >
        {getMainComponent()}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  )
}
