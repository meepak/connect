import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import PropTypes from 'prop-types'
import DrawerMenu from './DrawerMenu'
import RootStack from '../stacks/RootStack'

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props
  const newState = { ...state }
  newState.routes = newState.routes.filter((item) => item.name !== 'Home')
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  )
}
// drawerContent={DrawerMenuContainer}>
const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      cardOverlayEnabled: false,
    }}
    initialRouteName="Home"
  >
    <Drawer.Screen name="Home" component={RootStack} />
  </Drawer.Navigator>
)

// DrawerMenuContainer.propTypes = {
//   state: PropTypes.arrayOf.isRequired,
// }

export default DrawerNavigator
