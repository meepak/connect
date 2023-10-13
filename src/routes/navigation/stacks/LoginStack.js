import React from 'react'
// import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
// import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'

import Login from '../../../scenes/login'
import SignUp from '../../../scenes/signup'

const Stack = createStackNavigator()

const LoginStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Sign in"
      component={Login}
      options={(/* { navigation } */) => ({
        headerBackground: () => <HeaderStyle />,
      })}
    />
    <Stack.Screen
      name="Sign up"
      component={SignUp}
      options={(/* { navigation } */) => ({
        headerBackground: () => <HeaderStyle />,
      })}
    />
  </Stack.Navigator>
)

export default LoginStack
