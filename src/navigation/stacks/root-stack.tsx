import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import * as Notifications from 'expo-notifications'

import ProfileStack from './profile-stack'
import ChatStack from './chat-stack'
import SearchStack from './search-stack'
import SettingsStack from './settings-stack'
import HomeStack from './home-stack'
import ManageStack from './manage-stack'

const Stack = createStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function RootStack() {
  //  const { authUser } = useAuthUser()
  // const userData = authUser.data
  // const isIos = Platform.OS === 'ios'

  // TODO -- TAKE CARE OF NOTIFICATION WHEN IT COMES TO THAT
  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS === 'android') {
  //       await Notifications.setNotificationChannelAsync('default', {
  //         name: 'default',
  //         importance: Notifications.AndroidImportance.MAX,
  //         vibrationPattern: [0, 250, 250, 250],
  //         lightColor: '#FF231F7C',
  //       })
  //     }
  //     const { isDevice } = Device
  //     if (!isDevice) return
  //     console.log('get push token')
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync()
  //     let finalStatus = existingStatus
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync()
  //       finalStatus = status
  //     }
  //     if (finalStatus !== 'granted') {
  //       return
  //     }
  //     const token = await Notifications.getExpoPushTokenAsync({
  //       projectId: expoProjectId,
  //     })
  //     const tokensRef = doc(firestore, 'tokens', userData.id)
  //     await setDoc(tokensRef, {
  //       token: token.data,
  //       id: userData.id,
  //     })
  //   })()
  // }, [userData])

  // useEffect(() => {
  //   const subscription = Notifications.addNotificationReceivedListener((notification) => {
  //     console.log('Notification request content')
  //     console.log(notification.request.content)
  //   })
  //   return () => subscription.remove()
  // }, [])

  return (
    <Stack.Navigator
      initialRouteName="Homestack"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: false,
      }}
    >

      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
      />

      <Stack.Group
        screenOptions={{
          presentation: 'card',
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: false,
          headerTitle: '',
        }}
      >
        <Stack.Screen
          name="ChatStack"
          component={ChatStack}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
            gestureDirection: 'horizontal-inverted',
          }}
        />

        <Stack.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: false,
          cardOverlayEnabled: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      >
        <Stack.Screen
          name="SearchStack"
          component={SearchStack}
        />

        <Stack.Screen
          name="SettingsStack"
          component={SettingsStack}
        />

        <Stack.Screen
          name="ManageStack"
          component={ManageStack}
        />

      </Stack.Group>
    </Stack.Navigator>
  )
}
