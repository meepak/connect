import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme } from 'react-native-paper'
// import screenOptions from '../../navigationProps'

import ChatMain from '../../../scenes/chatMain'

const Tab = createMaterialTopTabNavigator()

const ChatTabs = () => {
  const { colors } = useTheme()
  return (
    <Tab.Navigator
      initialRouteName="ChatTabs"
      screenOptions={{ tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.onBackground }}
    >
      <Tab.Screen
        name="Recent"
        component={ChatMain}
        options={{ tabBarLabel: 'Recent' }}
      />
      <Tab.Screen
        name="Others"
        component={ChatMain}
        options={{ tabBarLabel: 'Others' }}
      />
    </Tab.Navigator>
  )
}

export default ChatTabs
