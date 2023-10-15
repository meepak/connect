import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HeaderStyle from '../../../components/HeaderStyle'
import Header from '../../../components/Header'
import Manage from '../../../scenes/manage'
import Edit from '../../../scenes/edit'

const Stack = createStackNavigator()

const ManageStack = () => (
  <Stack.Navigator>
    <Stack.Group>
      <Stack.Screen
        name="Manage"
        component={Manage}
        options={(/* { navigation } */) => ({
          headerBackground: () => <HeaderStyle />,
          headerTitle: () => (
            <Header />
          ),
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

export default ManageStack
