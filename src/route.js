import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Asset } from 'expo-asset'
import { Alert } from 'react-native'
import userAuthenticatedAtom from './utils/atom'
import Navigation from './navigation'
import { UserDataContext } from './context'
import { firestore, auth } from './firebase'
import LoadingScreen from './components/loading-screen'
import { mergeJsonObjects } from './utils/functions'

// [TODO] REDUCE SUBSCRIPTION TO THE DATA THAT MAY CHANGE ONLY
// NO POINT PULLING WHO THINGS THAT DOESN'T CHANGE OFTEN
// OR WON'T BE REQUIRED FOR REALTIME DISPLAY
let unsubscribe = null
const Route = () => {
  const [userAuthenticated, setUserAuthenticated] = useAtom(userAuthenticatedAtom)
  const [userData, setUserData] = useState({})

  const updateUserData = (newUserData) => {
    // console.log('new data from snapshot to update', newUserData)
    const updatedData = newUserData
    const updateField = (fieldName, newValue, setFunction) => {
      const asset = Asset.fromModule(newValue)

      if (asset.localUri !== null) {
        setFunction(asset.localUri)
      } else {
        Promise.resolve(asset.downloadAsync()
          .then((ass) => { setFunction(ass.localUri) })
          .catch((err) => Alert.alert(fieldName, `${newValue} -- ${err.message}`)))
      }
    }

    if (updatedData.avatar) {
      updateField('avatar', updatedData.avatar, (item) => { updatedData.avatar = item })
    }
    if (updatedData.bannerImage) {
      updateField('bannerImage', updatedData.bannerImage, (item) => { updatedData.bannerImage = item })
    }

    if (Object.keys(updatedData).length > 0) {
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
    // only depenency so far are the avatar and banner.. what else change in user will require rendering of anything??
  )

  // if userAuthenticated is not yet true or false
  // lets check once before we pass through here
  if (userAuthenticated === null) {
    return <LoadingScreen />
  }

  // console.log('we passing through?? because userAuthenticated is not null --', userAuthenticated !== null)
  return (
    <UserDataContext.Provider value={user}>
      <Navigation />
    </UserDataContext.Provider>
  )
}

export default Route
