import React, { useContext, useEffect } from 'react'
import {
  Alert,
} from 'react-native'
import { doc, onSnapshot } from 'firebase/firestore'
import { decode, encode } from 'base-64'
import { onAuthStateChanged } from 'firebase/auth'
import { useAtom } from 'jotai'
import { UserDataContext } from '../../context/UserDataContext'
import { firestore, auth } from '../../firebase'
import LoadingScreen from '../../components/LoadingScreen'

import { checkedAtom, loggedInAtom } from '../../utils/atom'

if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

export default function Initial() {
  const [, setChecked] = useAtom(checkedAtom)
  const [, setLoggedIn] = useAtom(loggedInAtom)
  const { setUserData } = useContext(UserDataContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log('Initial.js -- Auth state changed')
      if (user) {
        // console.log('Initial.js -- received user data')
        if (!user.emailVerified) {
          Alert.alert('Error', 'Email verification required.') // To Do handle more gracefully
        }
        const usersRef = doc(firestore, 'users', user.uid)
        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
          // console.log('Initial.js -- snapshot fired', querySnapshot)
          const newUserData = querySnapshot.data()
          // console.log(userData)
          if (newUserData !== setUserData) {
            setUserData(newUserData)
          }
          if (auth.currentUser) {
            setLoggedIn(true)
            setChecked(true)
          }

          // lets just wait and see
          // console.log('Initial.js -- Set User Data called')
          // console.log('Initial.js -- loggin querysnapshot after set user data', querySnapshot)
        })

        return () => {
          // console.log('Initial.js -- Unsubscribe')
          // Unsubscribe when the component is unmounted
          unsubscribe()
        }
      }
      setLoggedIn(false)
      setChecked(true) // TO DO, get rid of set checked and just use logged in flag or user data context
      return () => {} // just to satisfy eslint
    })
  }, [])

  // console.log('Initial.js -- Returning Loading Screen')
  return (
    <LoadingScreen />
  )
}
