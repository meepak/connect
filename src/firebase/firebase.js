import { initializeApp } from 'firebase/app'
// authentication
import { getAuth, connectAuthEmulator, initializeAuth } from 'firebase/auth'
// firestore - real time database
import { getFirestore, connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore'
// cloud storage
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// eslint-disable-next-line import/no-unresolved
import { USE_FIREBASE_EMULATOR as useEmulator } from '@env'
import { firebaseKey } from '../config'

const app = initializeApp(firebaseKey)

const localhost = '10.0.2.2'

const auth = useEmulator
  ? getAuth()
  : initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })

if (useEmulator) {
  connectAuthEmulator(auth, `http://${localhost}:9099`)
}

const firestore = useEmulator
  ? getFirestore()
  : initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  })

if (useEmulator) {
  connectFirestoreEmulator(firestore, localhost, 8089)
}

const storage = useEmulator
  ? getStorage()
  : getStorage(app)

if (useEmulator) {
  connectStorageEmulator(storage, localhost, 9199)
}

export { auth, firestore, storage }
