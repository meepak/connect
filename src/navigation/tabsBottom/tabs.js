import React from 'react'
// import { Keyboard, Animated, Easing } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' // kinda like the material icons in tabss for now, will see later
import { useTheme } from 'react-native-paper'

import HomeStack from '../stacks/home-stack'
import ManageStack from '../stacks/manage-stack'
import ChatStack from '../stacks/chat-stack'

const Tab = createMaterialBottomTabNavigator()

const TabNavigator = () => {
  const { colors } = useTheme()
  // const [tabPosition, setTabPosition] = useState(new Animated.Value(0))
  const size = 26

  // #region Trying to solve the issue of keyboard pushing tabs in android

  // const opacity = new Animated.Value(1)
  // const keyboardWillShow = () => {
  //   console.log('keyboardWillShow')
  //   Animated.timing(opacity, {
  //     toValue: 0, // Adjust this value to the height you want to move the tab bar
  //     duration: 10, // Animation duration in milliseconds
  //     easing: Easing.linear,
  //     useNativeDriver: true, // Required when using position and bottom properties
  //   }).start()
  // }

  // const keyboardWillHide = () => {
  //   console.log('keyboardWillHide')
  //   Animated.timing(opacity, {
  //     toValue: 1, // Move the tab bar back to its original position
  //     duration: 10,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start()
  // }

  // useEffect(() => {
  //   const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
  //   const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', keyboardWillHide)

  //   // returned function will be called on component unmount
  //   return () => {
  //     console.log('tabbars returning')
  //     keyboardWillShowListener.remove()
  //     keyboardWillHideListener.remove()
  //   }
  // }, [])

  // #endregion

  // material icons
  const icons = { home: 'home', manage: 'account-group', chat: 'comment-processing' }
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
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
      })}
      keyboardHidesNavigationBar
      initialRouteName="HomeTab"
      barStyle={[{
        position: 'absolute',
        bottom: -10,
        marginTop: 20,
        justifyContent: 'center',
        height: 80,
      },
      ]}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, 'HomeTab'),
        }}
      />
      <Tab.Screen
        name="ManageTab"
        component={ManageStack}
        options={{
          tabBarLabel: 'Manage',
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, 'ManageTab'),
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, 'ChatTab'),
          tabBarBadge: 10,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
