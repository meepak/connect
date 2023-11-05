import React from 'react'
import {
  View, Text, ImageBackground, StyleSheet,
} from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import Avatar from '../../../components/core/Avatar'
import AvatarOfAuthUser from '../../../components/AvatarOfAuthUser'
import PencilIconButton from '../../../components/PencilIconButton'
import ImageSelectAndUpload from '../../../utils/ImageSelectAndUpload'
import { convertHexToRGBA } from '../../../utils/functions'

// TODO find better default bannner Image
const defaultBannerImage = { uri: 'https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg?auto=compress&cs=tinysrgb&w=400' }

const Banner = ({
  editMode,
  bannerImage,
  userId,
  userAvatar,
  userFullName,
  onBanerEdited,
  onAvatarEdited,

}) => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()
  const finalBannerImage = { uri: bannerImage ?? defaultBannerImage }

  const styles = StyleSheet.create({
    banner: {
      height: 185,
    },
    bannerImage: {
      resizeMode: 'cover',
      height: 140,
    },
    avatarContainer: {
      position: 'absolute',
      top: 60,
      right: 10,
      zIndex: 3,
      borderColor: colors.background,
      borderWidth: 4,
      borderRadius: 100,
    },
    backButton: {
      position: 'absolute',
      top: 5,
      left: 5,
      zIndex: 3,
      width: 30,
      height: 30,
      backgroundColor: convertHexToRGBA(colors.background, 0.5),
      borderRadius: 20,
    },
    bannerSpinner: {
      position: 'absolute',
      zIndex: 10,
    },
    userTypeLabelContainer: {
      // top: -19,
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderColor: colors.background,
      backgroundColor: colors.tertiaryContainer,
      paddingBottom: 3,
      paddingLeft: 20,
      paddingRight: 10,
      width: '100%',
    },
    userTypeLabel: {
      color: colors.onTertiaryContainer,
      fontSize: fonts.titleMedium.fontSize,
      fontWeight: 'bold',
    },
  })

  const setUploadProgress = (/* progress */) => {
    // setBannerSpinner(true)
    // console.log(progress)
  }

  return (
    <View style={styles.banner}>
      <ImageBackground source={finalBannerImage} style={styles.bannerImage}>
        <IconButton
          icon="arrow-left"
          size={25}
          iconColor={colors.onBackground}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
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
        <Text style={styles.userTypeLabel}>{editMode ? 'Searching for Associates' : 'Open for opportunity'}</Text>
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
  bannerImage: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  userFullName: PropTypes.string.isRequired,
  onBanerEdited: PropTypes.func.isRequired,
  onAvatarEdited: PropTypes.func.isRequired,
}

export default Banner
