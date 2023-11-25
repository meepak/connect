import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { SignIn, SignUp } from '../../scenes/auth'
import Intro from '../../scenes/intro'

const Stack = createStackNavigator()

const IntroStack = () => (
  <Stack.Navigator
    screenOptions={() => ({
      presentation: 'modal',
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      headerTitle: '',
    })}
  >
    <Stack.Screen
      name="Intro"
      component={Intro}
    />

    <Stack.Screen
      name="Sign up"
      component={SignUp}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="Sign in"
      component={SignIn}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: 'horizontal-inverted',
      }}
    />

  </Stack.Navigator>
)

export default IntroStack
