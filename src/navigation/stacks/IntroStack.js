import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Intro from '../../scenes/intro'
import EnterStack from './EnterStack'

const Stack = createStackNavigator()

const IntroStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Intro"
      component={Intro}
    />

    <Stack.Screen
      name="EnterStack"
      component={EnterStack}
    />
  </Stack.Navigator>
)

export default IntroStack
