import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme, Badge } from 'react-native-paper'
// stack navigators
import FindStack from '../stacks/FindStack'
import ManageStack from '../stacks/ManageStack'
import ConnectStack from '../stacks/ConnectStack'

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
        name="ConnectTab"
        component={ConnectStack}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: () => (
            <View>
              <Icon name="bell" color={colors.onSurface} size={size} />
              <Badge
                size={16}
                style={{ position: 'absolute', top: 0, left: 20 }}
              >
                3
              </Badge>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
