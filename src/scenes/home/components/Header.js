import React, {
  useContext,
} from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  IconButton, Text, useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { UserDataContext } from '../../../context/UserDataContext'
import AvatarOfAuthUser from '../../../components/AvatarOfAuthUser'
import Button from '../../../components/core/Button'

const Styles = (colors) => StyleSheet.create({
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

  searchButton: {
    width: '100%',
    backgroundColor: colors.secondaryContainer,
    color: colors.onSecondaryContainer,
    borderRadius: 7,
    textAlign: 'left',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: colors.shadow,
  },
})

const Header = () => {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  const { userData } = useContext(UserDataContext)

  const openSettings = () => {
    navigation.navigate('SettingsStack', {
      screen: 'Settings',
    })
  }

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
        userBannerImage: { uri: userData.bannerImage },
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
          icon="gear"
          color={colors.onBackground}
          size={24}
          onPress={() => openSettings()}
        />
      </View>
      <Text style={styles.hi} variant="headlineLarge">Hi {userData.fullName.split(' ')[0]}</Text>

      <Button
        onPress={() => openSearch()}
        mode="contained"
        style={styles.searchButton}
        icon="search"
        iconSize={18}
        label="&nbsp;&nbsp;Search"
        backgroundColor={colors.elevation.level1}
        color={colors.onSecondaryContainer}
        alignLabel="flex-start"
        fontSize={fonts.bodyLarge.fontSize}
        marginHorizontal={10}
        marginVertical={5}
        elevation={2}
      />

      {/* <SquareMenu /> */}
      {/* <Text style={styles.title}>Matches based on your preferences.</Text>
        <Text style={styles.resultCount}>{dataItems.length} results.</Text> */}
    </View>
  )
}

export default Header
