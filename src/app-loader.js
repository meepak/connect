import * as SystemUI from 'expo-system-ui'
import React, {
  useEffect, useCallback, useState,
} from 'react'
import { useAtom } from 'jotai'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Asset } from 'expo-asset'
import * as SplashScreen from 'expo-splash-screen'
import { Appearance, Platform, View } from 'react-native'
import { setStatusBarTranslucent, setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'

import FindAssociate from './find-associate'

import Preload from './preload'
import AnimatedSplash from './components/animated/animated-splash'

// import { Alert, useColorScheme } from 'react-native'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
import userAuthenticatedAtom from './utils/atom'
import { UserDataContext } from './context'
import { firestore, auth } from './firebase'
import { mergeJsonObjects, getDefaultColors, sleep } from './utils/functions'
// import LoadingScreen from '../../components/animated/loading/loading-screen'

// SplashScreen.preventAutoHideAsync()

const { bgColor, color, statusBarStyle, isDark } = getDefaultColors(Appearance.getColorScheme())
SystemUI.setBackgroundColorAsync(bgColor)
setStatusBarStyle(statusBarStyle)
if (Platform.OS === 'android') {
  setStatusBarBackgroundColor('transparent', false)
  setStatusBarTranslucent(true)
}

let unsubscribe = null

const AppLoader = () => {
  // console.log('In AnimatedSplashScreen')
  const [appDataPreloaded, setAppDataPreloaded] = useState(false)
  // userAuthenticated must be true or false, if it's null,
  // it means we haven't finished determining authentication status yet
  const [userAuthenticated, setUserAuthenticated] = useAtom(userAuthenticatedAtom)
  const [userData, setUserData] = useState({})

  // once splash animation is ready to be loaded, this callback will be called
  // we must use callback and the delay hack to avoid white flash
  // basically we must have things ready to display, if we are getting rid of default splash
  const onSplashReady = useCallback(async (ready) => {
    if (ready) {
      // console.log('closing builtin splash to display animated one, and you should see white flash right now.')
      // if splash screen is loaded but app is not yet ready,
      // show our animated splash instead of default static splash specified in app.json
      // https://docs.expo.dev/versions/latest/sdk/font/
      // https://stackoverflow.com/questions/64780275/at-using-expo-after-splash-screen-blinkflash-with-white-screen
      // TODO: NOT IDEAL AT ALL, ENABLE IF WHITE FLASH BEFORE SPLASH APPEARS
      // await sleep(300)
      await SplashScreen.hideAsync()
    }
  })
  
  // Function to preload any data we might have necessary for app to function
  async function preloadAppData() {
    try {
      // Load stuff
      await Preload()

      // additional simulated delay,debugging
      // await sleep(2000)
      // await Promise.all([])
    } catch (e) {
      // handle errors
      console.log(`APP PRELOADING ERROR - ${e}`)
    } finally {
      // Tell the application to render
      // console.log('app data preloading is done')
      setAppDataPreloaded(() => true)
    }
  }


  // TODO: move this to some different helper file, this updates existing userdata with new available data
  const updateUserData = (newUserData) => {
    if (!newUserData) return null
    // console.log('new data from snapshot to update', newUserData)
    const updatedData = newUserData
    const updateField = (fieldName, newValue, setFunction) => {
      const asset = Asset.fromModule(newValue)

      if (asset.localUri !== null) {
        setFunction(asset.localUri)
      } else {
        Promise.resolve(asset.downloadAsync()
          .then((ass) => { setFunction(ass.localUri) })
          .catch((err) => console.log(fieldName, `${newValue} -- ${err.message}`)))
      }
    }

    if (updatedData?.avatar) {
      updateField('avatar', updatedData.avatar, (item) => { updatedData.avatar = item })
    }
    if (updatedData?.bannerImage) {
      updateField('bannerImage', updatedData.bannerImage, (item) => { updatedData.bannerImage = item })
    }

    if (updatedData && Object.keys(updatedData).length > 0) {
      return updatedData
    }
    return null
  }

  const handleSnapshot = (querySnapshot) => {
    // console.log('received new user data from snapshot')
    // console.log('User data update through snapshot, replacing old user data', userData)!!auth?.currentUser

    const newUserData = querySnapshot.data()
    const updatedData = updateUserData(newUserData)
    const requireUpdate = JSON.stringify(updatedData) !== JSON.stringify(userData)
    if (requireUpdate) {
      setUserData(() => updatedData)
    }

    // we checked, set userAuthenticated to true or false
    setUserAuthenticated(() => (!!auth?.currentUser))
  }

  const cleanupSubscription = () => {
    // Clear any existing unsubscribe function
    if (unsubscribe !== null) {
      // console.log('unsubscribing -- ', unsubscribe, ' because userAuthenticated = ', userAuthenticated)
      unsubscribe()
      unsubscribe = null
    }
  }

  const handleAuthStateChanged = (user) => {
    // console.log('Auth state changed, received user authentication data')
    if (userAuthenticated === null) { // if we want to terminate the authentication we should be able to just set this back to null
      // console.log('calling unsubscribe')
      cleanupSubscription()
    }
    if (user) {
      // console.log('returning new subscription to fetch detailed user data')
      const usersRef = doc(firestore, 'users', user.uid)
      return onSnapshot(usersRef, handleSnapshot)
    }

    setUserAuthenticated(false)
    // console.log('we checked, user needs to sign in, let them pass through')
    return null
  }

  const user = React.useMemo(
    () => ({
      setUserData: (value) => {
        setUserData((oldValue) => mergeJsonObjects(oldValue, value))
      },
      userData,
    }),
    [userData], // probably define each attribute of user, that would be too much??
    // only dependency so far are the avatar and banner.. what else change in user will require rendering of anything??
  )

  // let's keep loading the app
  // no point waiting for the splash screen to get ready
  useEffect(() => {
    if (!appDataPreloaded) {
      preloadAppData()
    }
  }, [])

  useEffect(() => {
    if (unsubscribe === null) {
      unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged)
      return () => cleanupSubscription()
    }
    return () => null
  }, [unsubscribe, userAuthenticated])

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {/*
          TODO: TO CHECK TO DISPLAY  HOME SCREEN LOADING SPLASH OR INTRO SPLASH & display accordingly
                Issue is, The delay at the moment is while resolving userAuthenticated value
                so may be later if there is significant delay in loading home screen, create new splash
                for home screen and hook it up here, for now it's not necessary.
      */}
      {
        appDataPreloaded && userAuthenticated !== null
          ? (
            <UserDataContext.Provider value={user}>
              <FindAssociate />
            </UserDataContext.Provider>
          )
          : <AnimatedSplash bgColor={bgColor} color={color} onLoaded={(p) => onSplashReady(p)} strokeWidth={isDark?5:6} />
      }
    </View>
  )
}

export default AppLoader
