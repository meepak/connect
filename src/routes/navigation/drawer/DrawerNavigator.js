import React from 'react'
import {
  createDrawerNavigator,
} from '@react-navigation/drawer'
import { useTheme } from 'react-native-paper'
import DrawerMenu from './DrawerMenu'
import RootStack from '../stacks/RootStack'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const { colors } = useTheme()
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: false,
        gestureEnabled: true,
        drawerStyle: {
          backgroundColor: colors.elevation.level3,
        },
      }}
      initialRouteName="Home"
      drawerContent={DrawerMenu}
    >
      <Drawer.Screen name="Home" component={RootStack} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
