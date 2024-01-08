import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'
import Notification from '@/scenes/notification/notification'
import { HeaderStyle, HeaderNotification } from '@/components/header'

const Stack = createStackNavigator()

const NotificationStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={(/* { navigation } */) => ({
            headerTintColor: colors.onBackground,
            headerBackTitleVisible: false,
            headerBackTitleStyle: {
              color: colors.onBackground,
            },
            headerBackground: () => <HeaderStyle />,
            headerTitle: () => (
              <HeaderNotification />
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default NotificationStack
