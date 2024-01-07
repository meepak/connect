import * as SystemUI from 'expo-system-ui'
import React, {
  useEffect, useCallback, useState,
} from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore, auth } from './firebase'; // Import your Firebase instance

import { User, onAuthStateChanged } from 'firebase/auth'
import { Asset } from 'expo-asset'
import * as SplashScreen from 'expo-splash-screen'
import { Appearance, Platform, View } from 'react-native'


import { setStatusBarTranslucent, setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'

import FindAssociate from '@/find-associate'

import Preload from '@/preload'
import AnimatedSplash from '@/components/animated/animated-splash'

// import { Alert, useColorScheme } from 'react-native'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { authenticationCheckedAtom, userAuthenticatedAtom } from '@/utils/atom'
import { AuthStatus, AuthUserActionType, useAuthUser } from '@/context'
import { getDefaultColors, /* mergeJsonObjects, sleep */} from '@/utils/functions'
// import LoadingScreen from '../../components/animated/loading/loading-screen'

// SplashScreen.preventAutoHideAsync()

const { bgColor, color, statusBarStyle, isDark } = getDefaultColors(Appearance.getColorScheme())
SystemUI.setBackgroundColorAsync(bgColor)
setStatusBarStyle(statusBarStyle)
if (Platform.OS === 'android') {
  setStatusBarBackgroundColor('transparent', false)
  setStatusBarTranslucent(true)
}

const AppLoader = () => {
    const { authUser, dispatchAuthUser: dispatch } = useAuthUser();
    const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);
  const [appDataPreloaded, setAppDataPreloaded] = useState(false)


  // once splash animation is ready to be loaded, this callback will be called
  // we must use callback and the delay hack to avoid white flash
  // basically we must have things ready to display, if we are getting rid of default splash
  const onSplashReady = useCallback(async (ready: boolean) => {
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
  },[])

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
  const updateUserData = (newUserData: any) => {
    if (!newUserData) return null
    // console.log('new data from snapshot to update', newUserData)
    const updatedData = newUserData
    const updateField = (fieldName: string, newValue: string | number, setFunction: { (item: any): void; (item: any): void; (arg0: string | null): void }) => {
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
      updateField('avatar', updatedData.avatar, (item: any) => { updatedData.avatar = item })
    }
    if (updatedData?.bannerImage) {
      updateField('bannerImage', updatedData.bannerImage, (item: any) => { updatedData.bannerImage = item })
    }

    if (updatedData && Object.keys(updatedData).length > 0) {
      return updatedData
    }
    return null
  }

   const handleAuthStateChanged = (user: User | null) => {
    if (user) {
      dispatch({type: AuthUserActionType.SET_AUTH_STATUS, payload: AuthStatus.Authenticated});
      const usersRef = doc(firestore, 'users', user.uid);
      return onSnapshot(usersRef, handleSnapshot);
    } else {
      dispatch({type: AuthUserActionType.SET_AUTH_STATUS, payload: AuthStatus.NotAuthenticated});
    }
  };

  const handleSnapshot = (querySnapshot) => {
    const newUserData = querySnapshot.data();
    const updatedData = updateUserData(newUserData);
    const requireUpdate = JSON.stringify(updatedData) !== JSON.stringify(authUser.data);
    if (requireUpdate) {
      dispatch({type: AuthUserActionType.SET_USER_DATA, payload: updatedData});
    }
  };

  const cleanupSubscription = () => {
    if (unsubscribe !== null) {
      unsubscribe();
      setUnsubscribe(null);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, handleAuthStateChanged);
    return cleanupSubscription;
  }, [unsubscribe, authUser.status]);

  useEffect(() => {
    if (!appDataPreloaded) {
      preloadAppData();
    }
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {
        appDataPreloaded && authUser.status !== AuthStatus.Checking
        ? <FindAssociate />
        : <AnimatedSplash bgColor={bgColor} color={color} onLoaded={(p) => onSplashReady(p)} strokeWidth={isDark?5:6} />
      }
    </View>
  )
}

export default AppLoader
