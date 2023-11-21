import React, { useContext, useEffect } from 'react'
import { useAtom } from 'jotai'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Asset } from 'expo-asset'
import { Alert } from 'react-native'
import { userDataLoadedAtom, loggedInAtom } from './utils/atom'
import Navigation from './navigation'
import { UserDataContext } from './context/user-data-context'
import { firestore, auth } from './firebase'
import LoadingScreen from './components/loading-screen'

let unsubscribe = null
const Route = () => {
  const [, setLoggedIn] = useAtom(loggedInAtom)
  const [userDataLoaded, setUserDataLoaded] = useAtom(userDataLoadedAtom)
  const { userData, setUserData } = useContext(UserDataContext)

  const updateUserData = (newUserData) => {
    const updatedData = newUserData
    const updateField = (fieldName, newValue, setFunction) => {
      const asset = Asset.fromModule(newValue)

      if (asset.localUri !== null) {
        setFunction(asset.localUri)
      } else {
        asset.downloadAsync()
          .then(() => {})
          .catch((err) => Alert.alert(fieldName, `${newValue} -- ${err.message}`))
      }
    }

    if (!updatedData.createdAtLocale) {
      const createdAtLocale = updatedData.createdAt?.toDate()?.toLocaleDateString()
      if (createdAtLocale) updatedData.createdAtLocale = createdAtLocale
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
    const newUserData = querySnapshot.data()
    const updatedData = updateUserData(newUserData)
    if (updatedData !== userData) {
      setUserData(updatedData)
    }
    if (auth.currentUser) {
      setLoggedIn(true)
      setUserDataLoaded(true)
    }
  }

  const cleanupUnsubscribe = () => {
    // Clear any existing unsubscribe function
    if (unsubscribe !== null) {
      unsubscribe()
      unsubscribe = null
    }
  }

  const handleAuthStateChanged = (user) => {
    if (user) {
      const usersRef = doc(firestore, 'users', user.uid)
      unsubscribe = onSnapshot(usersRef, handleSnapshot)
      return () => unsubscribe()
    }
    if (!user) {
      cleanupUnsubscribe()
    }
    setLoggedIn(false)
    setUserDataLoaded(true)
    return null
  }

  useEffect(() => {
    unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged)
    return () => cleanupUnsubscribe()
  }, [])

  // rendering
  if (!userDataLoaded) {
    return <LoadingScreen />
  }

  return <Navigation />
}

export default Route
