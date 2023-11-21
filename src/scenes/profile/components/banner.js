import React from 'react'
import {
  View, ImageBackground, StyleSheet,
} from 'react-native'
import { Text, IconButton, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import Avatar from '../../../components/core/avatar'
import AvatarOfAuthUser from '../../../components/avatar-of-auth-user'
import PencilIconButton from '../../../components/pencil-icon-button'
import ImageSelectAndUpload from '../../../utils/image-select-and-upload'
import { convertHexToRGBA } from '../../../utils/functions'
import imageAssets from '../../../theme/images'

const Banner = ({
  editMode,
  bannerImage,
  userId,
  userAvatar,
  userFullName,
  onBanerEdited,
  onAvatarEdited,
  showBackButton,

}) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const finalBannerImage = bannerImage || imageAssets.default_banner.localUri

  const styles = StyleSheet.create({
    banner: {
      height: 185,
    },
    bannerImage: {
      resizeMode: 'cover',
      height: 140,
      backgroundColor: colors.secondaryContainer,
    },
    avatarContainer: {
      position: 'absolute',
      top: 60,
      right: 10,
      zIndex: 3,
      borderColor: colors.background,
      borderWidth: 4, // match this with
      borderRadius: 100,
    },
    backButton: {
      position: 'absolute',
      top: 5,
      left: 5,
      zIndex: 3,
      width: 33,
      height: 33,
      backgroundColor: convertHexToRGBA(colors.background, 0.5),
      borderRadius: 20,
    },
    bannerSpinner: {
      position: 'absolute',
      zIndex: 10,
    },
    userTypeLabelContainer: {
      // top: -19,
      borderTopWidth: 3, // match this
      borderBottomWidth: 3, // match this
      borderColor: colors.background,
      backgroundColor: colors.tertiaryContainer,
      paddingBottom: 3,
      paddingLeft: 20,
      paddingRight: 10,
      width: '100%',
    },
    userTypeLabel: {
      color: colors.onTertiaryContainer,
      fontWeight: 'bold',
    },
  })

  const setUploadProgress = (/* progress */) => {
    // setBannerSpinner(true)
    // console.log(progress)
  }

  return (
    <View style={styles.banner}>
      {/* Not sure imagebackground can use localUri if available so not taking any chances */}
      <ImageBackground source={{ uri: finalBannerImage ?? null }} style={styles.bannerImage}>
        {showBackButton
          ? (
            <IconButton
              icon="chevron-left"
              size={25}
              iconColor={colors.onBackground}
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            />
          )
          : <></>}
        {editMode
          ? (
            <PencilIconButton
              top={5}
              bgColor={colors.background}
              bgAlpha={0.5}
              onPress={() => {
                ImageSelectAndUpload({
                  userId, setProgress: setUploadProgress, onFinished: onBanerEdited, resizeWidth: 800, imageCompression: 1,
                })
              }}
            />
          )
          : <></>}
      </ImageBackground>
      <View style={styles.userTypeLabelContainer}>
        <Text style={styles.userTypeLabel} variant="titleMedium">{editMode ? 'Searching for Associates' : 'Open for opportunity'}</Text>
      </View>
      <View style={styles.avatarContainer}>
        {editMode
          ? <AvatarOfAuthUser size={120} onEdited={(newAvatar) => onAvatarEdited(newAvatar)} />
          : <Avatar fullName={userFullName} url={userAvatar || null} width={120} height={120} rounded />}
      </View>
    </View>
  )
}

Banner.propTypes = {
  editMode: PropTypes.bool.isRequired,
  bannerImage: PropTypes.string,
  userId: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  userFullName: PropTypes.string.isRequired,
  onBanerEdited: PropTypes.func.isRequired,
  onAvatarEdited: PropTypes.func.isRequired,
  showBackButton: PropTypes.bool,
}

Banner.defaultProps = {
  bannerImage: null,
  userAvatar: null,
  showBackButton: true,
}

export default Banner
