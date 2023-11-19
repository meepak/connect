import React, {
  useContext,
} from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  IconButton, Text,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'

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
    marginLeft: 10,
    backgroundColor: convertHexToRGBA(onBgColor, 0.1),
  },
  hi: {
    marginTop: 22,
    marginHorizontal: 15,
    fontWeight: 700,
  },

})

const HeaderBar = ({ onBgColor }) => {
  const navigation = useNavigation()
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
    <>
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
      <Text style={styles.hi} variant="headlineLarge">Hi {userData.fullName.split(' ')[0]}</Text>
    </>

  )
}

HeaderBar.propTypes = {
  onBgColor: PropTypes.string.isRequired,
}

export default HeaderBar
