import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import screenOptions from '../../navigationProps'

import { FollowStacks, FollowerStacks } from '../stacks'

const Tab = createMaterialTopTabNavigator()

const FollowFollowerTabs = () => (
  <Tab.Navigator
    initialRouteName="FollowTab"
    screenOptions={screenOptions}
  >
    <Tab.Screen
      name="FollowTab"
      component={FollowStacks}
      options={{ tabBarLabel: 'Follow' }}
    />
    <Tab.Screen
      name="FollowerTab"
      component={FollowerStacks}
      options={{ tabBarLabel: 'Follower' }}
    />
  </Tab.Navigator>
)

export default FollowFollowerTabs
