import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'

import Login from '../../../scenes/login'
import SignUp from '../../../scenes/signup'

const Stack = createStackNavigator()

const LoginStack = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const navigationProps = scheme === 'dark' ? darkProps : lightProps
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        name="Sign in"
        component={Login}
        options={(/* { navigation } */) => ({
          headerBackground: scheme === 'dark' ? null : () => <HeaderStyle />,
        })}
      />
      <Stack.Screen
        name="Sign up"
        component={SignUp}
        options={(/* { navigation } */) => ({
          headerBackground: scheme === 'dark' ? null : () => <HeaderStyle />,
        })}
      />
    </Stack.Navigator>
  )
}

export default LoginStack
