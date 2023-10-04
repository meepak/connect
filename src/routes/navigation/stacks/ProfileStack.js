import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'

import Profile from '../../../scenes/profile'
import Edit from '../../../scenes/edit'

const Stack = createStackNavigator()

const ProfileStack = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const navigationProps = scheme === 'dark' ? darkProps : lightProps
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Group>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={(/* { navigation } */) => ({
            headerBackground: scheme === 'dark' ? null : () => <HeaderStyle />,
          })}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={(/* { navigation } */) => ({
            headerBackground: scheme === 'dark' ? null : () => <HeaderStyle />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default ProfileStack
