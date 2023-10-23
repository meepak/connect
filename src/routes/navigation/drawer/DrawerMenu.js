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
import {
  Drawer, Divider, useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import AvatarOfAuthUser from '../../../components/AvatarOfAuthUser'
import { UserDataContext } from '../../../context/UserDataContext'
import { fontSize } from '../../../theme'

const DrawerMenu = (/* {navigation} */) => {
  const { colors } = useTheme()
  const { userData } = useContext(UserDataContext)
  const navigation = useNavigation()

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
      fontSize: 24,
    },
    settingsItem: {
      fontWeight: 'bold',
      color: colors.onBackground,
      fontSize: 24,
    },
  }

  const openProfile = () => {
    // console.log('Lets go to profile')
    navigation.navigate('ProfileStack', {
      screen: 'Profile',
      params: { // userId, userFullName, userAvatar, userBannerImage,
        userId: userData.id,
        userFullName: userData.fullName,
        userAvatar: userData.avatar,
        userBannerImage: { uri: userData.bannerImage },
      },
    })
  }

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={styles.root}
    >

      <View
        style={styles.head}
      >
        <AvatarOfAuthUser
          size="large"
          onPress={() => openProfile()}
        />
        <Text
          style={styles.name}
          onPress={() => openProfile()}
        >{userData.fullName}
        </Text>
        <Text
          style={styles.link}
          onPress={() => openProfile()}
        >Manage Profile
        </Text>
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
          style={styles.settingsItem}
          icon="cogs"
          label="Settings"
          onPress={() => {
            // Handle sign-out logic here
            // console.log('lets not put signout at front screen')
          }}
        />
      </Drawer.Section>

    </DrawerContentScrollView>
  )
}

export default DrawerMenu
