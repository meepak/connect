import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Intro from '../../../scenes/intro'
import LoginStack from './LoginStack'

const Stack = createStackNavigator()

const IntroStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Intro"
      component={Intro}
    />

    <Stack.Screen
      name="LoginStack"
      component={LoginStack}
    />
  </Stack.Navigator>
)

export default IntroStack
