import React from 'react'
import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
// import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'

import Profile from '../../../scenes/profile'
import Edit from '../../../scenes/edit'

const Stack = createStackNavigator()

const ProfileStack = () =>
  // const scheme = useColorScheme()
  // const navigationProps = scheme === 'dark' ? darkProps : lightProps
  (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={(/* { navigation } */) => ({
            headerBackground: () => <HeaderStyle />,
          })}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={(/* { navigation } */) => ({
            headerBackground: () => <HeaderStyle />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )

export default ProfileStack
