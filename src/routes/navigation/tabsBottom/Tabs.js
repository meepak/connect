import React, { useEffect } from 'react'
import { Keyboard, Animated, Easing } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' // kinda like the material icons in tabss for now, will see later
import { useTheme } from 'react-native-paper'

import FindStack from '../stacks/FindStack'
import ManageStack from '../stacks/ManageStack'
import ChatStack from '../stacks/ChatStack'

const Tab = createMaterialBottomTabNavigator()

const TabNavigator = () => {
  const { colors } = useTheme()
  // const [tabPosition, setTabPosition] = useState(new Animated.Value(0))
  const size = 26

  // #region Trying to solve the issue of keyboard pushing tabs in android

  const opacity = new Animated.Value(1)
  const keyboardWillShow = () => {
    Animated.timing(opacity, {
      toValue: 0, // Adjust this value to the height you want to move the tab bar
      duration: 10, // Animation duration in milliseconds
      easing: Easing.linear,
      useNativeDriver: false, // Required when using position and bottom properties
    }).start()
  }

  const keyboardWillHide = () => {
    Animated.timing(opacity, {
      toValue: 1, // Move the tab bar back to its original position
      duration: 10,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()
  }

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', keyboardWillHide)

    // returned function will be called on component unmount
    return () => {
      keyboardWillShowListener.remove()
      keyboardWillHideListener.remove()
    }
  }, [])

  const animatedStyles = {
    opacity,
  }

  // #endregion

  // material icons
  const icons = { home: 'account-search', manage: 'account-group', chat: 'comment-processing' }
  // ionic icons
  // const icons = { home: 'home', manage: 'people', chat: 'chatbox-ellipses' }
  const getTabBarIcon = (focused, tabName) => {
    let iconName = ''
    switch (tabName) {
      case 'HomeTab':
        iconName = `${icons.home}${focused ? '' : '-outline'}`
        break
      case 'ManageTab':
        iconName = `${icons.manage}${focused ? '' : '-outline'}`
        break
      case 'ChatTab':
        iconName = `${icons.chat}${focused ? '' : '-outline'}`
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
        // tabBarActiveTintColor: colors.primary,
        // tabBarInactiveTintColor: colors.gray,
        // tabBarActiveBackgroundColor: colors.secondary,
        // tabBarInactiveBackgroundColor: bgColor,
        // tabBarStyle: {
        //   borderTopColor: contrastColor,
        // },
      })}
      // sceneAnimationEnabled
      // sceneAnimationType="opacity"
      keyboardHidesNavigationBar
      initialRouteName="HomeTab"
      // theme={{colors: {secondaryContainer: 'yellow'}}}
      barStyle={[{
        // backgroundColor: '#694fad',
        position: 'absolute',
        bottom: -10,
        marginTop: 20,
        justifyContent: 'center',
        height: 80,
      }, // animatedStyles,
      ]}
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
          keyboardHidesNavigationBar: true,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, 'ChatTab'),
          tabBarBadge: 3,
          keyboardHidesNavigationBar: true,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
