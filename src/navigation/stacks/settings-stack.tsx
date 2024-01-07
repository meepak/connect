import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Settings from '../../scenes/settings'

const Stack = createStackNavigator()

const SettingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Settings"
      component={Settings}
    />

  </Stack.Navigator>
)

export default SettingsStack
