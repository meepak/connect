import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'
import HeaderStyle from '../../components/header/HeaderStyle'
import Notification from '../../scenes/notification/Notification'
import Header4Notification from '../../components/header/Header4Notification'

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
              <Header4Notification />
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default NotificationStack
