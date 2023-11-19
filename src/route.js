import React, { useContext, useEffect } from 'react'
import { useAtom } from 'jotai'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Asset } from 'expo-asset'
import { userDataLoadedAtom, loggedInAtom } from './utils/atom'
import Navigation from './navigation'
import { UserDataContext } from './context/user-data-context'
import { firestore, auth } from './firebase'
import LoadingScreen from './components/loading-screen'

const Route = () => {
  const [, setLoggedIn] = useAtom(loggedInAtom)
  const [userDataLoaded, setUserDataLoaded] = useAtom(userDataLoadedAtom)
  const { userData, setUserData } = useContext(UserDataContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log('Initial.js -- Auth state changed')
      if (user) {
        // console.log('Route.js -- received user data')
        // if (!user.emailVerified) {
        //   Alert.alert('Error', 'Email verification required.') // To Do handle more gracefully
        // }
        const usersRef = doc(firestore, 'users', user.uid)
        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
          // console.log('Initial.js -- snapshot fired', querySnapshot)
          let newUserData = querySnapshot.data()
          // console.log(newUserData)
          if (newUserData !== userData) {
            let updatedData = []

            if (!userData.createdAtLocale) {
            // convert date format to local formats, still this sets up in mm/dd/yyyy instead of dd/mm/yyyy
              const createdAtLocale = `${newUserData.createdAt.toDate().toLocaleDateString()} ${newUserData.createdAt.toDate().toLocaleTimeString()}`
              // console.log(createdAtLocale)
              updatedData = { createdAtLocale }
            }

            const newAvatar = Asset.fromModule(newUserData.avatar)
            if (newAvatar.localUri !== userData.avatar) {
              if (newAvatar.localUri !== null) {
              // console.log('Avatar is already cached:', newAvatar)
                updatedData = { ...updatedData, avatar: newAvatar.localUri }
              } else {
                newAvatar.downloadAsync().then((aValue) => {
                // update state once this is ready
                  setUserData((adata) => ({ ...adata, avatar: aValue.localUri }))
                // console.log('Avatar is now cached:', newAvatar)
                })
              }
            }

            const newBannerImage = Asset.fromModule(newUserData.bannerImage)
            if (newBannerImage.localUri !== userData.bannerImage) {
              if (newBannerImage.localUri !== null) {
              // console.log('Banner is already cached:', newBannerImage)
                updatedData = { ...updatedData, bannerImage: newBannerImage.localUri }
              } else {
                newBannerImage.downloadAsync().then((bValue) => {
                // update state once this is ready
                  setUserData((bdata) => ({ ...bdata, bannerImage: bValue.localUri }))
                // console.log('bannerImage is now cached:', newBannerImage)
                })
              }
            }

            // console.log(newUserData)
            // const updatedData = { createdAtLocale, avatar: newAvatar.localUri, bannerImage: newBannerImage.localUri }
            if (Object.keys(updatedData).length > 0) {
              newUserData = { ...newUserData, ...updatedData }
              setUserData(newUserData)
            }
          }

          if (auth.currentUser) {
            setLoggedIn(true)
            setUserDataLoaded(true)
          }
        })

        return () => {
          // Unsubscribe when the component is unmounted
          unsubscribe()
        }
      }
      setLoggedIn(false)
      setUserDataLoaded(true) // Shouldn't this be false???
      return () => {} // just to satisfy eslint
    })
  }, [])

  // rendering
  if (!userDataLoaded) {
    return <LoadingScreen />
  }

  return <Navigation />
}

export default Route
