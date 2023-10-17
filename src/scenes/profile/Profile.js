import React, { useContext, useState } from 'react'
import {
  Alert, View, ImageBackground, StyleSheet, SafeAreaView, StatusBar,
} from 'react-native'
import {
  Text, IconButton, useTheme,
} from 'react-native-paper'
import {
  useNavigation, useRoute,
} from '@react-navigation/native'

import Spinner from 'react-native-loading-spinner-overlay'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../firebase'

import Avatar from '../../components/core/Avatar'
import AvatarOfAuthUser from '../../components/AvatarOfAuthUser'
import ImageSelectAndUpload from '../../utils/ImageSelectAndUpload'

// Temporary measure to get user id of logged in user to test banner upload
import { UserDataContext } from '../../context/UserDataContext'

const Profile = () => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const {
    userId, userFullName, userAvatar, userBannerImage,
  } = route.params
  const { userData } = useContext(UserDataContext)
  const userDataId = userId || userData.id // temp
  const bannerImageHardCoded = { uri: 'https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg?auto=compress&cs=tinysrgb&w=400' }
  const [bannerImage, setBannerImage] = useState(userBannerImage.uri ? userBannerImage : bannerImageHardCoded)
  const [bannerSpinner, setBannerSpinner] = useState(false)

  // TODO find more secure way to verify editMode, probably validate userId through auth token
  const editMode = userId !== undefined && userId !== null
  console.log(`editing ;${editMode}`)

  // TODO orgaize this as utility functions
  const profileUpdate = async (data) => {
    try {
      // const data = {
      //   id: userData.id,
      //   email: userData.email,
      //   fullName,
      //   avatar: avatar ?? null,
      //   phone,
      //   isOnboarded,
      // }
      const usersRef = doc(firestore, 'users', userData.id)
      await updateDoc(usersRef, data)
    } catch (e) {
      setBannerSpinner(false)
      Alert.alert('Error', e.message)
    }
  }

  const setUploadProgress = (progress) => {
    setBannerSpinner(true)
    console.log(progress)
  }

  const onBanerEdited = (image) => {
    console.log(`NEW BANNER PEOPLE :: ${image}`)
    setBannerImage({ uri: image })
    // save to db?
    profileUpdate({ bannerImage: image }).then(() => {
      setBannerSpinner(false)
    })
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      // position: 'relative', // Added for positioning the Avatar
    },
    banner: {
      height: 150,
    },
    bannerImage: {
      flex: 1,
      resizeMode: 'cover', // Use 'cover' for better image fitting
      height: 150,
    },
    avatarContainer: {
      position: 'absolute', // Position the Avatar absolutely
      top: 100, // Place at the bottom
      right: 20, // Place at the right
      zIndex: 1, // Ensure the Avatar is above the ImageBackground
      borderColor: colors.onBackground,
      borderWidth: 4,
      // borderStartColor: 'red',
      // borderLeftColor: 'pink',
      // borderBlockEndColor: 'white',
      // borderBlockColor: 'green',
      // borderBottomColor: 'blue',
      // borderEndColor: 'violet',
      borderRadius: 100,
      // backgroundColor: 'transparent',
      // borderRadius: '50 50 0 0',
    },
    backButton: {
      position: 'absolute', // Position the Avatar absolutely
      top: 5, // Place at the bottom
      left: 5, // Place at the right
      zIndex: 1, // Ensure the Avatar is above the ImageBackground
      width: 25,
      height: 25,
    },
    editBannerImage: {
      position: 'absolute', // Position the Avatar absolutely
      bottom: 2, // Place at the bottom
      left: 10, // Place at the right
      zIndex: 1, // Ensure the Avatar is above the ImageBackground
      backgroundColor: colors.tertiaryContainer,
      borderRadius: 50,
      width: 28,
      height: 28,
    },
    userFullName: {
      fontSize: fonts.headlineMedium.fontSize,
      fontWeight: 'bold',
      marginLeft: 30,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground source={bannerImage} style={styles.bannerImage}>
          <View style={styles.avatarContainer}>
            {editMode
              ? <AvatarOfAuthUser size={100} onEdited={(newAvatar) => console.log(newAvatar)} />
              : <Avatar fullName={userFullName} url={userAvatar || null} width={100} height={100} rounded />}
          </View>
          {/* <View style={styles.BackButtonContainer}> */}
          <IconButton
            icon="arrow-left"
            size={25}
            iconColor={colors.onBackground}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          {editMode
            ? (
              <IconButton
                icon="image-edit-outline"
                size={22}
                iconColor={colors.onBackground}
                underlayColor={colors.background}
                style={styles.editBannerImage}
                onPress={() => {
                  ImageSelectAndUpload({
                    userId: userDataId, setProgress: setUploadProgress, onFinished: onBanerEdited, resizeWidth: 800, imageCompression: 1,
                  })
                }}
              />
            )
            : <></>}
          <View style={{ position: 'absolute', zIndex: 10 }} visible={bannerSpinner}>
            <Spinner
              visible={bannerSpinner}
              textStyle={{ color: colors.onSurface }}
              overlayColor="rgba(0,0,0,0.5)"
            />
          </View>
          {/* </View> */}
        </ImageBackground>
      </View>
      <Text style={styles.userFullName}>{userFullName}</Text>
      {/* Rest of your content */}
    </SafeAreaView>
  )
}

export default Profile
