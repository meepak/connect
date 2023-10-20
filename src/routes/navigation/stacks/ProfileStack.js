import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../../../scenes/profile'

const Stack = createStackNavigator()

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >

    <Stack.Screen
      name="Profile"
      component={Profile}
      // options={{
      //   title: 'Hello',
      //   headerBackTitle: 'Back',
      //   headerTitleAlign: 'center',
      //   // headerBackground: () => <HeaderStyle />,
      //   // headerTintColor: isDark ? colors.white : colors.white,
      // }}
    />

  </Stack.Navigator>
)

export default ProfileStack
