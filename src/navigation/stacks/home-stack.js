import React from 'react'
import { useTheme } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import HeaderStyle from '../../components/header/header-style'

import Home from '../../scenes/home'
import Detail from '../../scenes/detail'
// import Search from '../../scenes/search'

const Stack = createStackNavigator()

const HomeStack = () => {
  const { colors } = useTheme()
  return (
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

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerBackground: () => <HeaderStyle />,
          headerTintColor: colors.onBackground,

        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
