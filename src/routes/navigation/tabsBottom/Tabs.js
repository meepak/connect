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

  const getTabBarIcon = (focused, tabName) => {
    let iconName = ''
    switch (tabName) {
      case 'HomeTab':
        iconName = `account-search${focused ? '' : '-outline'}`
        break
      case 'ManageTab':
        iconName = `account-group${focused ? '' : '-outline'}`
        break
      case 'ChatTab':
        iconName = `comment-processing${focused ? '' : '-outline'}`
        break
      default:
        break
    }
    return (
      <Icon
        name={iconName}
        color={colors.onSurface}
        size={size}
      />
    )
  }

  return (
    <Tab.Navigator
      // defaultScreenOptions={{
        // headerShown: false,
        // headerTransparent: true,
      // }}
      screenOptions={(/* { route } */) => ({
        headerShown: false,
        // cardOverlayEnabled: false,
        gestureEnabled: true,
        tabBarHideOnKeyboard: true,
        // tabBarActiveTintColor: colors.primary,
        // tabBarInactiveTintColor: colors.gray,
        // tabBarActiveBackgroundColor: colors.secondary,
        // tabBarInactiveBackgroundColor: bgColor,
        // tabBarStyle: {
        //   borderTopColor: contrastColor,
        // },
        sceneAnimationEnabled: true,
      })}
      // tabBarHideOnKeyboard
      // windowSoftInputMode="adjustResize" //set in app.json for android
      keyboardHidesNavigationBar
      initialRouteName="HomeTab"
      // theme={{colors: {secondaryContainer: 'yellow'}}}
      barStyle={{
        // backgroundColor: '#694fad',
        // position: 'absolute',
        justifyContent: 'center',
        height: 50,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={FindStack}
        options={{
          tabBarLabel: 'Find',
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, 'HomeTab'),
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
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, 'ManageTab'),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, 'ChatTab'),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
