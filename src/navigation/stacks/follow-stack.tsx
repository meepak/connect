import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Follow from '@/scenes/notification'

const Stack = createStackNavigator()

const FollowStack = () => (
  <Stack.Navigator
    screenOptions={(/* { route, navigation } */) => ({
      headerShown: false,
    })}
  >
    <Stack.Screen
      name="Follow"
      component={Follow}
    />
  </Stack.Navigator>
)

export default FollowStack
