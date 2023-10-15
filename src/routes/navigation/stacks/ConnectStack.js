import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HeaderStyle from '../../../components/HeaderStyle'
import Header from '../../../components/Header'
import { FollowFollowerTabs } from '../tabsTop'

const Stack = createStackNavigator()

const ConnectStack = () => (
  <Stack.Navigator>
    <Stack.Group>
      <Stack.Screen
        name="Connect"
        component={FollowFollowerTabs}
        options={(/* { navigation } */) => ({
          headerBackground: () => <HeaderStyle />,
          headerTitle: () => (
            <Header />
          ),
        })}
      />
    </Stack.Group>
  </Stack.Navigator>
)

export default ConnectStack
