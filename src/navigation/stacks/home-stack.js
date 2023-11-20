import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'
import Home from '../../scenes/home'
import { HeaderHome } from '../../components/header'

const Stack = createStackNavigator()

const HomeStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        cardOverlayEnabled: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerTintColor: colors.background,
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            color: colors.background,
          },
          headerStyle: { height: 42 },
          headerTitle: () => (
            <HeaderHome />
          ),
          // ...TransitionPresets.SlideFromRightIOS,
        })}
      />

    </Stack.Navigator>
  )
}

export default HomeStack
