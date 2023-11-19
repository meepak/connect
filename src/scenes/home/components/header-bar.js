import React, {
  useContext,
} from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  IconButton, useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { UserDataContext } from '../../../context/user-data-context'
import AvatarOfAuthUser from '../../../components/avatar-of-auth-user'
import { convertHexToRGBA } from '../../../utils/functions'

const Styles = (onBgColor) => StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',

    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
  },
  rightIcon: {
    marginTop: 0,
    marginRight: 0,
    marginLeft: 11,
    backgroundColor: convertHexToRGBA(onBgColor, 0.1),
  },

})

const HeaderBar = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const onBgColor = colors.onBackground
  const { userData } = useContext(UserDataContext)
  const styles = Styles(onBgColor)

  const openSettings = () => {
    navigation.navigate('SettingsStack', {
      screen: 'Settings',
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

  const openChat = () => {
    navigation.navigate('ChatStack', {
      screen: 'ChatTabs',
      params: { // userId, userFullName, userAvatar, userBannerImage,
        userId: userData.id,
        userFullName: userData.fullName,
        userAvatar: userData.avatar,
        userBannerImage: userData.bannerImage ?? null,
      },
    })
  }

  return (
    <View style={styles.headerIcons}>
      <AvatarOfAuthUser
        size={42}
        onPress={() => openProfile()}
      />
      <View style={styles.rightIcons}>
        <IconButton
          style={styles.rightIcon}
          icon="gear"
          iconColor={onBgColor}
          size={18}
          onPress={() => openSettings()}
        />
        <IconButton
          style={styles.rightIcon}
          icon="comment-discussion"
          iconColor={onBgColor}
          size={18}
          onPress={() => openChat()}
        />
      </View>
    </View>

  )
}

export default HeaderBar
