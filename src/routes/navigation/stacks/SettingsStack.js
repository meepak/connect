import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Settings from '../../../scenes/settings'

const Stack = createStackNavigator()

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            presentation: 'modal',
            headerShown: false,
            gestureEnabled: false,
            cardOverlayEnabled: false,
            ...TransitionPresets.ModalFadeTransition,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default SettingsStack
