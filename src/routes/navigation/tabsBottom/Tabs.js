import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
// stack navigators
import HomeStack from '../stacks/HomeStack'
import ProfileStack from '../stacks/ProfileStack'
import ConnectStack from '../stacks/ConnectStack'
import ChatStack from '../stacks/ChatStack'

const Tab = createMaterialBottomTabNavigator()

const TabNavigator = () => {
  const { colors } = useTheme()
  const size = 26

  return (
    <Tab.Navigator
      // defaultScreenOptions={{
        // headerShown: false,
        // headerTransparent: true,
      // }}
      screenOptions={(/* { route } */) => ({
        headerShown: false,
        // cardOverlayEnabled: false,
        tabBarHideOnKeyboard: true,
        // tabBarActiveTintColor: colors.primary,
        // tabBarInactiveTintColor: colors.gray,
        // tabBarActiveBackgroundColor: colors.secondary,
        // tabBarInactiveBackgroundColor: bgColor,
        // tabBarStyle: {
        //   borderTopColor: contrastColor,
        // },
      })}
      initialRouteName="HomeTab"
      // swipeEnabled={false}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon name="home" color={colors.onSurface} size={size} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <Icon name="account-details" color={colors.onSurface} size={size} />,
        }}
      />
      <Tab.Screen
        name="ConnectTab"
        component={ConnectStack}
        options={{
          tabBarLabel: 'Connect',
          tabBarIcon: () => <Icon name="share-variant" color={colors.onSurface} size={size} />,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: () => <Icon name="chat" color={colors.onSurface} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
