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
// const app = initializeApp({projectId: 'connect-411'})

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// })
// const firestore = initializeFirestore(app, {
//   experimentalAutoDetectLongPolling: true,
// })
const storage = getStorage(app)

const auth = getAuth(app)
const firestore = getFirestore(app)


const authUrl = 'http://192.168.16.47:9099'
connectAuthEmulator(auth, authUrl)
connectFirestoreEmulator(firestore, 'localhost', 8088)
connectStorageEmulator(storage, 'locahost', 9199)

export { auth, firestore, storage }
