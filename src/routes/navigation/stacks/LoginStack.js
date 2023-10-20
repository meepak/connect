import React from 'react'
import { useTheme } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import HeaderStyle from '../../../components/HeaderStyle'

import Login from '../../../scenes/login'
import SignUp from '../../../scenes/signup'

const Stack = createStackNavigator()

const LoginStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={(/* { navigation } */) => ({
        headerBackground: () => <HeaderStyle />,
        headerTintColor: colors.onBackground,
        headerTitleAlign: 'left',
      })}
    >
      <Stack.Screen
        name="Sign in"
        component={Login}
        options={(/* { navigation } */) => ({
        })}
      />
      <Stack.Screen
        name="Sign up"
        component={SignUp}
        options={(/* { navigation } */) => ({
        })}
      />
    </Stack.Navigator>
  )
}

export default LoginStack
