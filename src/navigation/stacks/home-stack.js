import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../../scenes/home'

const Stack = createStackNavigator()

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardOverlayEnabled: false,
    }}
  >
    <Stack.Screen
      name="Home"
      component={Home}
    />

  </Stack.Navigator>
)

export default HomeStack
