import React, { useContext, useEffect } from 'react'
import { useAtom } from 'jotai'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { userDataLoadedAtom, loggedInAtom } from './utils/atom'
import Navigation from './navigation'
import { UserDataContext } from './context/UserDataContext'
import { firestore, auth } from './firebase'
import LoadingScreen from './components/LoadingScreen'

const Route = () => {
  const [, setLoggedIn] = useAtom(loggedInAtom)
  const [userDataLoaded, setUserDataLoaded] = useAtom(userDataLoadedAtom)
  const { setUserData } = useContext(UserDataContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log('Initial.js -- Auth state changed')
      if (user) {
        console.log('Route.js -- received user data')
        // if (!user.emailVerified) {
        //   Alert.alert('Error', 'Email verification required.') // To Do handle more gracefully
        // }
        const usersRef = doc(firestore, 'users', user.uid)
        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
          // console.log('Initial.js -- snapshot fired', querySnapshot)
          let newUserData = querySnapshot.data()
          // console.log(userData)
          if (newUserData !== setUserData) {
            // convert date format to local formats, still this sets up in mm/dd/yyyy instead of dd/mm/yyyy
            const createdAtLocale = `${newUserData.createdAt.toDate().toLocaleDateString()} ${newUserData.createdAt.toDate().toLocaleTimeString()}`
            // console.log(createdAtLocale)
            newUserData = { ...newUserData, createdAtLocale }
            setUserData(newUserData)
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
