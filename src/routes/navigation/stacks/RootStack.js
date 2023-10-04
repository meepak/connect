import React, { useContext, useEffect } from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import * as Notifications from 'expo-notifications'
import { setDoc, doc } from 'firebase/firestore'
import * as Device from 'expo-device'
import TabNavigator from '../tabsBottom/Tabs'
import ModalStack from './ModalStack'
import { firestore } from '../../../firebase'
import { UserDataContext } from '../../../context/UserDataContext'
import { expoProjectId } from '../../../config'

const Stack = createStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function RootStack() {
  const { userData } = useContext(UserDataContext)
  // const isIos = Platform.OS === 'ios'

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }
      const { isDevice } = Device
      if (!isDevice) return
      console.log('get push token')
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        return
      }
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: expoProjectId,
      })
      const tokensRef = doc(firestore, 'tokens', userData.id)
      await setDoc(tokensRef, {
        token: token.data,
        id: userData.id,
      })
    })()
  }, [userData])

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification request content')
      console.log(notification.request.content)
    })
    return () => subscription.remove()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeRoot"
        component={TabNavigator}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <Stack.Screen
          name="ModalStacks"
          component={ModalStack}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
