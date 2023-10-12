import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// import FontIcon from 'react-native-vector-icons/FontAwesome5'
// import { colors } from 'theme'
// import PropTypes from 'prop-types'
import { useColorScheme } from 'react-native'
import { colors } from '../../../theme'
// stack navigators
import HomeStack from '../stacks/HomeStack'
import ProfileStack from '../stacks/ProfileStack'
import ConnectStack from '../stacks/ConnectStack'
import ChatStack from '../stacks/ChatStack'

const Tab = createMaterialBottomTabNavigator()

// const MyTabBarIcon = ({ icon, color, size }) => (
//   <FontIcon name={icon} size={size} />
// )

const TabNavigator = () => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  // const bgColor = isDark ? '#000' : '#FFF'
  const contrastColor = isDark ? colors.white : colors.black
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
          tabBarIcon: () => <Icon name="home" color={contrastColor} size={size} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <Icon name="account-details" color={contrastColor} size={size} />,
        }}
      />
      <Tab.Screen
        name="ConnectTab"
        component={ConnectStack}
        options={{
          tabBarLabel: 'Connect',
          tabBarIcon: () => <Icon name="share-variant" color={contrastColor} size={size} />,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: () => <Icon name="chat" color={contrastColor} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

// MyTabBarIcon.propTypes = {
//   icon: PropTypes.string.isRequired,
//   color: PropTypes.string.isRequired,
//   size: PropTypes.number.isRequired,
// }

export default TabNavigator
