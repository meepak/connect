import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Search from '../../scenes/search'

const Stack = createStackNavigator()

const SearchStack = () => (

  <Stack.Navigator
    screenOptions={{
      // presentation: 'modal',
      cardOverlayEnabled: false,
      headerShown: false,
      gestureEnabled: false,
      cardStyle: { flex: 1 },
    }}
  >

    <Stack.Screen
      name="Search"
      component={Search}
    />

  </Stack.Navigator>
)

export default SearchStack
