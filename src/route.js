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

const Route = () => {
  const [, setLoggedIn] = useAtom(loggedInAtom)
  const [userDataLoaded, setUserDataLoaded] = useAtom(userDataLoadedAtom)
  const { userData, setUserData } = useContext(UserDataContext)

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     // console.log('Initial.js -- Auth state changed')
  //     if (user) {
  //       // console.log('Route.js -- received user data')
  //       // if (!user.emailVerified) {
  //       //   Alert.alert('Error', 'Email verification required.') // To Do handle more gracefully
  //       // }
  //       const usersRef = doc(firestore, 'users', user.uid)
  //       const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
  //         // console.log('Initial.js -- snapshot fired', querySnapshot)
  //         let newUserData = querySnapshot.data()
  //         console.log('******', userData.id, newUserData.id, newUserData, userData)
  //         if (newUserData !== userData) {
  //           let updatedData = []

  //           if (!userData.createdAtLocale) {
  //           // convert date format to local formats, still this sets up in mm/dd/yyyy instead of dd/mm/yyyy
  //             const createdAtLocale = `${newUserData.createdAt.toDate().toLocaleDateString()} ${newUserData.createdAt.toDate().toLocaleTimeString()}`
  //             // console.log(createdAtLocale)
  //             updatedData = { createdAtLocale }
  //           }

  //           const newAvatar = Asset.fromModule(newUserData.avatar)
  //           if (newAvatar.localUri !== userData.avatar) {
  //             if (newAvatar.localUri !== null) {
  //             // console.log('Avatar is already cached:', newAvatar)
  //               updatedData = { ...updatedData, avatar: newAvatar.localUri }
  //             } else {
  //               newAvatar.downloadAsync().then((aValue) => {
  //               // update state once this is ready
  //                 setUserData((adata) => ({ ...adata, avatar: aValue.localUri }))
  //               // console.log('Avatar is now cached:', newAvatar)
  //               })
  //                 .catch((err) => { Alert.alert('newBannerImage', err.message) })
  //             }
  //           }

  //           const newBannerImage = Asset.fromModule(newUserData.bannerImage)
  //           if (newBannerImage.localUri !== userData.bannerImage) {
  //             if (newBannerImage.localUri !== null) {
  //             // console.log('Banner is already cached:', newBannerImage)
  //               updatedData = { ...updatedData, bannerImage: newBannerImage.localUri }
  //             } else {
  //               newBannerImage.downloadAsync().then((bValue) => {
  //               // update state once this is ready
  //                 setUserData((bdata) => ({ ...bdata, bannerImage: bValue.localUri }))
  //               // console.log('bannerImage is now cached:', newBannerImage)
  //               })
  //                 .catch((err) => { Alert.alert('newBannerImage', err.message) })
  //             }
  //           }

  //           // console.log(newUserData)
  //           // const updatedData = { createdAtLocale, avatar: newAvatar.localUri, bannerImage: newBannerImage.localUri }
  //           if (Object.keys(updatedData).length > 0) {
  //             newUserData = { ...newUserData, ...updatedData }
  //             setUserData(newUserData)
  //           }
  //         }

  //         if (auth.currentUser) {
  //           setLoggedIn(true)
  //           setUserDataLoaded(true)
  //         }
  //       })

  //       return () => {
  //         // Unsubscribe when the component is unmounted
  //         unsubscribe()
  //       }
  //     }
  //     setLoggedIn(false)
  //     setUserDataLoaded(true) // Shouldn't this be false???
  //     return () => {} // just to satisfy eslint
  //   })
  // }, [])

  useEffect(() => {
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
        // console.log('********************************', updatedData)
        setUserData(updatedData)
      }

      if (auth.currentUser) {
        setLoggedIn(true)
        setUserDataLoaded(true)
      }
    }

    const handleAuthStateChanged = (user) => {
      if (user) {
        const usersRef = doc(firestore, 'users', user.uid)
        const unsubscribe = onSnapshot(usersRef, handleSnapshot)

        return () => unsubscribe()
      }

      setLoggedIn(false)
      setUserDataLoaded(true)
      return null
    }

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged)

    return () => unsubscribe()
  }, [])

  // rendering
  if (!userDataLoaded) {
    return <LoadingScreen />
  }

  return <Navigation />
}

export default Route
