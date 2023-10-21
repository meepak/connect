import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
// stack navigators
import FindStack from '../stacks/FindStack'
import ManageStack from '../stacks/ManageStack'
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
      swipeEnabled
    >
      <Tab.Screen
        name="HomeTab"
        component={FindStack}
        options={{
          tabBarLabel: 'Find',
          tabBarIcon: () => <Icon name="account-search" color={colors.onSurface} size={size} />,
        }}
      />
      {/* <Tab.Screen
        name="ProfileTab"
        component={ManageStack}
        options={{
          tabBarLabel: 'Manage',
          tabBarIcon: () => <Icon name="account-details" color={colors.onSurface} size={size} />,
        }}
      /> */}
      <Tab.Screen
        name="ManageTab"
        component={ManageStack}
        options={{
          tabBarLabel: 'Manage',
          tabBarIcon: () => <Icon name="account-group" color={colors.onSurface} size={size} />,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: () => (
            <Icon name="comment-processing-outline" color={colors.onSurface} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
