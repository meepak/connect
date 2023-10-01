import { initializeApp } from 'firebase/app'
// authentication
import { initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// firestore
import { initializeFirestore } from 'firebase/firestore'
// cloud storage
import { getStorage } from 'firebase/storage'

import { firebaseKey } from '../config'

const app = initializeApp(firebaseKey)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
const firestore = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
})
const storage = getStorage(app)

export { auth, firestore, storage }
