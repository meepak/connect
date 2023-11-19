import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  IconButton,
  useTheme,
} from 'react-native-paper'

import { useNavigation } from '@react-navigation/native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AvatarOfAuthUser from '../avatar-of-auth-user'
import { UserDataContext } from '../../context/user-data-context'

import { convertHexToRGBA } from '../../utils/functions'

const Header = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const onBgColor = colors.onBackground
  const { userData } = useContext(UserDataContext)
  const insets = useSafeAreaInsets()

  const openSettings = () => {
    navigation.navigate('SettingsStack', {
      screen: 'Settings',
    })
  }

  const styles = StyleSheet.create({
    container: {
      top: insets.top,
      width: '100%',
      paddingBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rightIcons: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    rightIcon: {
      marginTop: 0,
      marginRight: -5,
      marginLeft: 18,
      backgroundColor: convertHexToRGBA(colors.onBackground, 0.1),
    },

  })

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
    <View style={styles.container}>
      <View style={styles.leftIcon}>
        <AvatarOfAuthUser
          size={42}
          onPress={() => openProfile()}
        />
      </View>
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

export default Header
