import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Follow from '../../../scenes/follow'

const Stack = createStackNavigator()

const FollowStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="Follow"
        component={Follow}
      />
    </Stack.Navigator>
  )
}

export default FollowStack
