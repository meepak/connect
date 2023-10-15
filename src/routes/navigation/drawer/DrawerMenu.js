import React from 'react'
import {
  View, Text,
} from 'react-native'
// import PropTypes from 'prop-types'
// import { DrawerActions } from '@react-navigation/native'
import {
  DrawerContentScrollView,
  // DrawerItemList,
} from '@react-navigation/drawer'
import { Drawer, useTheme } from 'react-native-paper'
import FontIcon from 'react-native-vector-icons/FontAwesome5'

const styles = {
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const DrawerMenu = (/* {navigation} */) => {
  const { colors } = useTheme()
  // console.log(`colors ==${JSON.stringify(colors)}`)
  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      style={styles.root}
    >

      <Drawer.Section
        theme={{ colors }}
      >
        <Drawer.Item
          label="First Item"
        >

          <View style={styles.head}>
            <FontIcon.Button
              name="times"
              size={20}
              color={colors.gray}
              backgroundColor="white"
              // onPress={() => {
              //   navigation.dispatch(DrawerActions.closeDrawer())
              // }}
            />
          </View>
          <View style={styles.main}>
            <Text>Drawer Menu</Text>
          </View>

        </Drawer.Item>
        <Drawer.Item
          label="Second Item"
        />
      </Drawer.Section>

    </DrawerContentScrollView>
  )
}

// DrawerMenu.propTypes = {
//   navigation: PropTypes.func.isRequired,
// }

export default DrawerMenu
