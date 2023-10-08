import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
// import { colors } from 'theme'
import PropTypes from 'prop-types'
import { useColorScheme } from 'react-native'
import { colors } from '../../../theme'
// stack navigators
import HomeStack from '../stacks/HomeStack'
import ProfileStack from '../stacks/ProfileStack'
import ConnectStack from '../stacks/ConnectStack'
import ChatStack from '../stacks/ChatStack'

const Tab = createBottomTabNavigator()

const MyTabBarIcon = ({ icon, color, size }) => (
  <FontIcon name={icon} color={color} size={size} />
)

const TabNavigator = () => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const bgColor = isDark ? '#000' : '#FFF'
  const borderColor = isDark ? '#FFF' : '#000'

  return (
    <Tab.Navigator
      defaultScreenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
      screenOptions={(/* { route } */) => ({
        headerShown: false,
        // cardOverlayEnabled: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarActiveBackgroundColor: bgColor,
        tabBarInactiveBackgroundColor: bgColor,
        tabBarStyle: {
          borderTopColor: borderColor,
        },
      })}
      initialRouteName="HomeTab"
      swipeEnabled={false}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (props) => <MyTabBarIcon {...props} icon="home" />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: (props) => <MyTabBarIcon {...props} icon="user" />,
        }}
      />
      <Tab.Screen
        name="ConnectTab"
        component={ConnectStack}
        options={{
          tabBarLabel: 'Connect',
          tabBarIcon: (props) => <MyTabBarIcon {...props} icon="share-alt" />,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: (props) => <MyTabBarIcon {...props} icon="comments" />,
        }}
      />
    </Tab.Navigator>
  )
}

MyTabBarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default TabNavigator
