import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Asset } from 'expo-asset'
// import { Alert, useColorScheme } from 'react-native'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import PropTypes from 'prop-types'
import userAuthenticatedAtom from './utils/atom'
import Navigation from './navigation'
import { UserDataContext } from './context'
import { firestore, auth } from './firebase'
import LoadingScreen from './components/animated/loading/loading-screen'
import { mergeJsonObjects } from './utils/functions'

import AnimatedSplashScreen from './animated-splash-screen'

let unsubscribe = null
// replacing route.js to load user authentication status ???
const AnimatedAppLoader = ({
  children, isDark, // isDark, resizeMode,
}) => {
  // STUFF FROM ROUTE.JS STARTS

  // const isDark = useColorScheme() === 'dark'
  const [userAuthenticated, setUserAuthenticated] = useAtom(userAuthenticatedAtom)
  const [userData, setUserData] = useState({})

  // TODO move this to preload like function, app.js, all this does is to create UserData context
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
    const newUserData = querySnapshot.data()
    // console.log('new data', newUserData)
    const updatedData = updateUserData(newUserData)
    // console.log('updated data', updatedData)
    const requireUpdate = JSON.stringify(updatedData) !== JSON.stringify(userData)
    // console.log('requireUpdate', requireUpdate)
    if (requireUpdate) {
      // console.log('User data update through snapshot, replacing old user data', userData)
      setUserData(updatedData)
    }

    // we checked, set userAuthenticated to true or false
    setUserAuthenticated(!!auth?.currentUser)
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

  useEffect(() => {
    // console.log('useEffect got triggered - userAuthenticated = ', userAuthenticated, 'unsubscribed = ', unsubscribe)
    if (unsubscribe === null) {
      // console.log('lets start subscription')
      unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged)
      return () => cleanupSubscription()
    }
    // console.log('we were already subscribed')
    return null
  }, [unsubscribe, userAuthenticated])

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

  // if userAuthenticated is not yet true or false
  // lets check once before we pass through here
  if (userAuthenticated === null) {
    // return <AnimatedLoadingScreen />
    return <LoadingScreen />
  }

  // console.log('we passing through?? because userAuthenticated is not null --', userAuthenticated !== null)
  // return (
  //   <UserDataContext.Provider value={user}>
  //     <SafeAreaProvider>
  //       <Navigation />
  //     </SafeAreaProvider>
  //   </UserDataContext.Provider>
  // )

  // STUFF FROM ROUTE.JS ENDS

  return (
    <AnimatedSplashScreen isDark={isDark}>
      {children}
    </AnimatedSplashScreen>
  )
}

AnimatedAppLoader.propTypes = {
  children: PropTypes.node.isRequired,
  isDark: PropTypes.bool.isRequired,
}

export default AnimatedAppLoader
