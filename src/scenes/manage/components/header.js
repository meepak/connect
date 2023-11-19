import React, {
  useContext,
} from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  // eslint-disable-next-line no-unused-vars
  IconButton, Text, useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { UserDataContext } from '../../../context/user-data-context'
import AvatarOfAuthUser from '../../../components/avatar-of-auth-user'

const Styles = () => StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',

    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
    // marginTop: 5, // probably put it back for android only
  },
  hi: {
    marginLeft: 20,
    marginVertical: 5,
    fontWeight: 700,
  },

})

const Header = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = Styles()
  const { userData } = useContext(UserDataContext)
  const openSearch = () => {
    navigation.navigate('SearchStack', {
      screen: 'Search',
    })
  }

  const openProfile = () => {
    navigation.navigate('ProfileStack', {
      screen: 'Profile',
      params: { // userId, userFullName, userAvatar, userBannerImage,
        userId: userData.id,
        userFullName: userData.fullName,
        userAvatar: userData.avatar,
        userBannerImage: userData.bannerImage,
      },
    })
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerIcons}>
        <AvatarOfAuthUser
          size={45}
          onPress={() => openProfile()}
        />
        <IconButton
          icon="search"
          color={colors.onBackground}
          size={24}
          onPress={() => openSearch()}
        />
      </View>
    </View>
  )
}

export default Header
