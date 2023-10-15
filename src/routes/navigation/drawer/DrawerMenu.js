import React, { useContext } from 'react'
import {
  View, Text,
} from 'react-native'
// import PropTypes from 'prop-types'
// import { DrawerActions } from '@react-navigation/native'
import {
  DrawerContentScrollView,
  // DrawerItemList,
} from '@react-navigation/drawer'
import { Drawer, Divider, useTheme } from 'react-native-paper'
import AvatarOfAuthUser from '../../../components/AvatarOfAuthUser'
import { UserDataContext } from '../../../context/UserDataContext'
import { fontSize } from '../../../theme'

const DrawerMenu = (/* {navigation} */) => {
  const { colors } = useTheme()
  const { userData } = useContext(UserDataContext)

  const styles = {
    root: {
      flex: 1,
      flexDirection: 'column',
    },
    head: {
      marginTop: 30,
      marginLeft: 10,
      flexDirection: 'column',
      paddingHorizontal: 10,
    },
    name: {
      marginTop: 5,
      fontWeight: 'bold',
      fontSize: fontSize.xxxLarge,
      color: colors.onBackground,
      paddingHorizontal: 10,
    },
    link: {
      marginTop: 5,
      fontSize: fontSize.middle,
      color: colors.onSurfaceVariant,
      paddingHorizontal: 10,
    },
    divider: {
      marginTop: 15,
      color: colors.shadow,
      height: 2,
    },
    main: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    lastItem: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  }

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={styles.root}
    >

      <View style={styles.head}>
        <AvatarOfAuthUser size="large" />
        <Text style={styles.name}>{userData.fullName}</Text>
        <Text style={styles.link}>Manage Profile</Text>
      </View>

      <Divider style={styles.divider} />

      <Drawer.Section
        theme={{ colors }}
      >
        <Drawer.Item
          label="First Item"
        />
        <Drawer.Item
          label="Second Item"
        />
      </Drawer.Section>

      <Drawer.Section
        theme={{ colors }}
        style={styles.lastItem}
        showDivider={false}
      >
        <Drawer.Item
          label="Sign Out"
          onPress={() => {
            // Handle sign-out logic here
          }}
        />
      </Drawer.Section>

    </DrawerContentScrollView>
  )
}

export default DrawerMenu
