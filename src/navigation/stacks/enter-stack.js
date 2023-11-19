import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn, SignUp } from '../../scenes/enter'

const Stack = createStackNavigator()

const EnterStack = () => (
  <Stack.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}
  >
    <Stack.Screen
      name="Sign up"
      component={SignUp}
    />
    <Stack.Screen
      name="Sign in"
      component={SignIn}
    />
  </Stack.Navigator>
)

export default EnterStack
