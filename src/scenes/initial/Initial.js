import React, { useEffect, useContext } from 'react'
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
      if (user) {
        if (!user.emailVerified) {
          Alert.alert('Error', 'Email verification required.') // To Do handle more gracefully
        }
        const usersRef = doc(firestore, 'users', user.uid)
        onSnapshot(usersRef, (querySnapshot) => {
          const userData = querySnapshot.data()
          setUserData(userData)
          setLoggedIn(true)
          setChecked(true)
        })
      } else {
        setLoggedIn(false)
        setChecked(true) // TO DO, get rid of set checked and just use logged in flag or user data context
      }
    })
  }, [])

  return (
    <LoadingScreen />
  )
}
