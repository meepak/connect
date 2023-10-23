import { initializeApp } from 'firebase/app'
// authentication
import { getAuth, connectAuthEmulator, initializeAuth } from 'firebase/auth'
// firestore - real time database
import { getFirestore, connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore'
// cloud storage
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { firebaseKey } from '../config'

const app = initializeApp(firebaseKey)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
const firestore = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
})

// const auth = getAuth(app)
// const authUrl = 'http://127.0.0.1:9099'
// connectAuthEmulator(auth, authUrl)
// const firestore = getFirestore(app)

const storage = getStorage(app)

// connectFirestoreEmulator(firestore, 'dev.local', 8089)
// connectStorageEmulator(storage, 'dev.local', 9199)

export { auth, firestore, storage }
