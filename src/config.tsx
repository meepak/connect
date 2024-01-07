// console.log(`Firebase project name ${process.env.EXPO_PUBLIC_FIREBASE_PROJECT_NAME}`)

const firebaseKey = {
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY,
  authDomain: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECT_NAME}.firebaseapp.com`,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_NAME,
  storageBucket: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECT_NAME}.appspot.com`,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const eulaLink = 'https://findassociate.com'

const expoProjectId = process.env.EXPO_PUBLIC_EXPO_PROJECT_ID

export
{
  firebaseKey,
  eulaLink,
  expoProjectId,
}
