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

// firebase emulators:start --import  ./data-backup --export-on-exit
const useEmulator = process.env.EXPO_PUBLIC_USE_FIREBASE_EMULATOR
const localhost = process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_IP
const authPort = process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_AUTH_PORT
const firestorePort = process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_FIRESTORE_PORT
const storagePort = process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_STORAGE_PORT

console.log('using emulator why??', useEmulator)

const auth = useEmulator
  ? getAuth()
  : initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })

if (useEmulator) {
  connectAuthEmulator(auth, `http://${localhost}:${authPort}`)
}

const firestore = useEmulator
  ? getFirestore()
  : initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  })

if (useEmulator) {
  connectFirestoreEmulator(firestore, localhost, firestorePort)
}

const storage = useEmulator
  ? getStorage()
  : getStorage(app)

if (useEmulator) {
  connectStorageEmulator(storage, localhost, storagePort)
}

export { auth, firestore, storage }
