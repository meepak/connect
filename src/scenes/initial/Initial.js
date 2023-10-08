import React, { useEffect, useContext } from 'react'
import {
  Alert,
  // Text,
  // View,
  // StyleSheet,
} from 'react-native'
import { doc, onSnapshot } from 'firebase/firestore'
import { decode, encode } from 'base-64'
import { onAuthStateChanged } from 'firebase/auth'
import { useAtom } from 'jotai'
import { UserDataContext } from '../../context/UserDataContext'
// import ScreenTemplate from '../../components/ScreenTemplate'
import { firestore, auth } from '../../firebase'
// import { colors, fontSize } from '../../theme'
import LoadingScreen from '../../components/LoadingScreen'

import { checkedAtom, loggedInAtom } from '../../utils/atom'

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: fontSize.xxxLarge,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// })

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
      console.log('onAuthStateChanged')
      if (user) {
        if (!user.emailVerified) {
          Alert.alert('Error', 'Email verification required.')
        }
        const usersRef = doc(firestore, 'users', user.uid)
        console.log('entering on snapshot')
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
    // <ScreenTemplate>
    //   <View
    //     style={[styles.container, { backgroundColor: colorScheme.container }]}
    //   >
    //     <Text style={[styles.title, { color: colorScheme.text }]}>
    //       loading...
    //     </Text>
    //   </View>
    // </ScreenTemplate>
  )
}
