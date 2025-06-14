import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Follower from '../../scenes/follower'

const Stack = createStackNavigator()

const FollowerStack = () => (
  <Stack.Navigator
    screenOptions={(/* { route, navigation } */) => ({
      headerShown: false,
    })}
  >
    <Stack.Screen
      name="Follower"
      component={Follower}
    />
  </Stack.Navigator>
)

export default FollowerStack
