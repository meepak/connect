import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
// import screenOptions from '../../navigationProps'

import FollowStack from '../stacks/follow-stack'
import FollowerStack from '../stacks/follower-stack'

const Tab = createMaterialTopTabNavigator()

const FollowFollowerTabs = () => (
  <Tab.Navigator
    initialRouteName="FollowTab"
    // screenOptions={screenOptions}
  >
    <Tab.Screen
      name="FollowTab"
      component={FollowStack}
      options={{ tabBarLabel: 'Follow' }}
    />
    <Tab.Screen
      name="FollowerTab"
      component={FollowerStack}
      options={{ tabBarLabel: 'Follower' }}
    />
  </Tab.Navigator>
)

export default FollowFollowerTabs
