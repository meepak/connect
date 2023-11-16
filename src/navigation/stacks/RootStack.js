import React from 'react' // , { useContext, useEffect }
// import { Platform } from 'react-native'
import { useTheme } from 'react-native-paper'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import * as Notifications from 'expo-notifications'

import TabNavigator from '../tabsBottom/Tabs'
import ModalStack from './ModalStack'
import ProfileStack from './ProfileStack'
import ChatStack from './ChatStack'
import NotificationStack from './NotificationStack'
import SearchStack from './SearchStack'
import SettingsStack from './SettingsStack'
// import HomeStack from './HomeStack'
// import ManageStack from './ManageStack'

const Stack = createStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function RootStack() {
  const { colors } = useTheme()
  // const { userData } = useContext(UserDataContext)
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
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: false,
      }}
    >
      <Stack.Screen
        name="HomeRoot"
        component={TabNavigator}
      />

      <Stack.Group
        screenOptions={{
          presentation: 'card',
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: false,
          headerTitle: '',
          headerTintColor: colors.onBackground,
        }}
      >
        {/* We should be able to access this through Tab Navigator, get rid of all redundant navigations */}
        <Stack.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        {/* <Stack.Screen
          name="HomeStack"
          component={HomeStack}
        />

        <Stack.Screen
          name="ManageStack"
          component={ManageStack}
        /> */}

        <Stack.Screen
          name="ChatStack"
          component={ChatStack}
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
          name="NotificationStack"
          component={NotificationStack}
        />

        <Stack.Screen
          name="SettingsStack"
          component={SettingsStack}
        />

        <Stack.Screen
          name="ModalStack"
          component={ModalStack}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
