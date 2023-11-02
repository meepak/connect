import React, { useContext, useEffect, useState } from 'react'
import {
  Alert, View, ImageBackground, StyleSheet, SafeAreaView, StatusBar, ScrollView,
} from 'react-native'
import {
  Text, IconButton, useTheme, Button, Surface,
} from 'react-native-paper'
import {
  useNavigation, useRoute,
} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  doc, updateDoc, serverTimestamp, getDoc, query, setDoc, collection,
} from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
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
  const bannerImageHardCoded = { uri: 'https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg?auto=compress&cs=tinysrgb&w=400' }
  const [bannerImage, setBannerImage] = useState(userBannerImage?.uri ? userBannerImage : bannerImageHardCoded)
  // const [bannerSpinner, setBannerSpinner] = useState(true)
  const [spinner, setSpinner] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState([])

  // TODO find more secure way to verify editMode, probably validate userId through auth token
  const editMode = userId === userData.id
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
      updateDoc(usersRef, data).then(() => {
        // const updatedUserData = mergeJsonObjects(userData, data)
        // setUserData(updatedUserData)
      }).catch((error) => {
        Alert.alert('Error during profile update', error)
      })

      // update userdata context
    } catch (e) {
      // setBannerSpinner(false)
      Alert.alert('Error', e.message)
    }
  }

  const setUploadProgress = (progress) => {
    // setBannerSpinner(true)
    console.log(progress)
  }

  const onBanerEdited = (image) => {
    if (image === null || image === undefined) {
      return
    }
    setBannerImage({ uri: image })
    // save to db?
    profileUpdate({ bannerImage: image }).then(() => {
      // setBannerSpinner(false)
    })
  }

  const onAvatarEdited = (image) => {
    profileUpdate({ avatar: image }).then(() => {
      console.log('Avatar updated in db')
    })
  }

  async function fetchConnection() {
    const docSnap = await getDoc(doc(firestore, 'users', userData.id, 'connection', userId))

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      setConnectionStatus(docSnap.data())
    } else {
      console.log('No such document!')
    }
    setSpinner(false)
  }

  useEffect(() => {
    if (!editMode) {
      // setSpinner(true)
      fetchConnection()
      console.log('connection status', connectionStatus)
    } else {
      setSpinner(false)
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      // position: 'relative', // Added for positioning the Avatar
    },
    banner: {
      height: 160,
      zIndex: 2,
    },
    bannerImage: {
      flex: 1,
      resizeMode: 'cover', // Use 'cover' for better image fitting
      height: 160,
      zIndex: 2,
    },
    userTypeLabelContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: colors.tertiaryContainer,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 20,
      paddingRight: 10,
      zIndex: 3,
    },
    userTypeLabel: {
      color: colors.onTertiaryContainer,
      fontSize: fonts.titleMedium.fontSize,
      fontWeight: 'bold',
    },
    avatarContainer: {
      position: 'absolute',
      top: 60,
      right: 10,
      zIndex: 3,
      borderColor: colors.background,
      borderWidth: 6,
      borderRadius: 100,
      // backgroundColor: 'transparent',
      // borderRadius: '50 50 0 0',
    },
    backButton: {
      position: 'absolute',
      top: 5,
      left: 5,
      zIndex: 3,
      width: 40,
      height: 40,
      backgroundColor: colors.background,
      borderRadius: 20,
    },
    editBannerImage: {
      position: 'absolute',
      top: 5,
      right: 10,
      zIndex: 3,
      backgroundColor: colors.background,
      color: colors.onPrimary,
      borderRadius: 20,
      width: 40,
      height: 40,
    },
    bannerSpinner: {
      position: 'absolute',
      zIndex: 10,
    },
    scrollContent: {
      zIndex: 1,
    },
    editUserIntro: {
      position: 'absolute',
      top: 40,
      right: 10,
      zIndex: 3,
      backgroundColor: colors.background,
      borderRadius: 20,
      width: 40,
      height: 40,
    },
    userIntro: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 25,
      paddingBottom: 20,
    },
    userIntroHeader: {
      marginRight: 30,
    },
    userFullName: {
      fontSize: fonts.headlineSmall.fontSize,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    userOccupationTitle: {
      fontSize: fonts.titleMedium.fontSize,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    userLocation: {
      paddingTop: 20,
      fontSize: fonts.titleMedium.fontSize,
      textTransform: 'capitalize',
    },
    connectContainer: {
      paddingTop: 20,
      // backgroundColor: 'green',
    },
    connectButton: {
      backgroundColor: colors.primaryContainer,
    },
    connectLabel: {
      color: colors.onPrimaryContainer,
      fontSize: fonts.titleLarge.fontSize,
    },
    userHighlightedList: {
      paddingTop: 20,
      marginLeft: 30,
      fontSize: fonts.titleMedium.fontSize,
    },
    userHighlightedListItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userHighlightedListItemText: {
      fontSize: fonts.titleMedium.fontSize,
      color: colors.onBackground,
    },
    surfaceView: {
      marginBottom: 20,
      marginTop: 30,
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      />
      {!spinner
        ? (
          <>
            <View style={styles.banner}>
              <ImageBackground source={bannerImage} style={styles.bannerImage}>
                <View style={styles.avatarContainer}>
                  {editMode
                    ? <AvatarOfAuthUser size={120} onEdited={(newAvatar) => onAvatarEdited(newAvatar)} />
                    : <Avatar fullName={userFullName} url={userAvatar || null} width={120} height={120} rounded />}
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
                      icon="lead-pencil"
                      size={22}
                      iconColor={colors.onBackground}
                      style={styles.editBannerImage}
                      onPress={() => {
                        ImageSelectAndUpload({
                          userId, setProgress: setUploadProgress, onFinished: onBanerEdited, resizeWidth: 800, imageCompression: 1,
                        })
                      }}
                    />
                  )
                  : <></>}
                <View style={styles.userTypeLabelContainer}>
                  <Text style={styles.userTypeLabel}>{editMode ? 'Searching for Associates' : 'Open for opportunity'}</Text>
                </View>
              </ImageBackground>
            </View>
            <ScrollView style={styles.scrollContent}>
              {/* USER INTRO */}
              <View>
                <View style={styles.userIntro}>
                  <View style={styles.userIntroHeader}>
                    <Text style={styles.userFullName}>{userFullName} asfdvxczvasdds asdfasfdasfdsafdsasdfasfdasfdsafds</Text>
                    <Text style={styles.userOccupationTitle}>Chief Digital Transformation Officer and something else and more</Text>
                  </View>
                  {/* Location */}
                  <Text style={styles.userLocation}>Seacombe Gardens - 5047, South Australia, Australia</Text>
                  {/* connect button */}
                  {(!editMode)
                    ? (
                      <View style={styles.connectContainer}>
                        <Button
                          disabled={!(connectionStatus.requestSent === undefined && connectionStatus.requestReceived === undefined)}
                          icon="account-arrow-right-outline"
                          onPress={async () => {
                            console.log('connect button')
                            // send connection request, TODO ADD/UPDATE APPROPRIATELY LATER
                            await setDoc(doc(firestore, 'users', userData.id, 'connection', userId), {
                              requestSent: serverTimestamp(),
                            })
                            setConnectionStatus({ requestSent: serverTimestamp() })

                            // TODO -- do this through firebase function, as in client
                            // auth user can only write their own document,
                            // also probably notification need to be generated
                            await setDoc(doc(firestore, 'users', userId, 'connection', userData.id), {
                              requestReceived: serverTimestamp(),
                            })
                          }}
                          mode="elevated"
                          labelStyle={styles.buttonLabel}
                          style={styles.connectButton}
                        >
                          {
                           // eslint-disable-next-line no-nested-ternary
                           connectionStatus.requestSent !== undefined
                             ? 'Connection Request Sent'
                             : (connectionStatus.requestReceived !== undefined
                               ? 'Connection Request Received'
                               : 'Request Connection')
                        }
                        </Button>
                      </View>
                    )
                    : <></>}
                  {/* Onboarding point list */}
                  <View style={styles.userHighlightedList}>
                    {
            [
              { key: 'Investor/Active Partner/Advisory Partner' },
              { key: 'Interested in business at any stage' },
              { key: 'Occupation skill' },
              { key: 'Work arrangement' },
              { key: 'Mode of Operation' },
              { key: 'Communication Preference' },
              { key: 'References / NDA / Background Check' },
            ].map((item) => (
              <View style={styles.userHighlightedListItem} key={item.key}>
                <Icon style={styles.userHighlightedListItemText} name="check" />
                <Text style={styles.userHighlightedListItemText}>{item.key}</Text>
              </View>
            ))
          }
                  </View>
                </View>
                {editMode
                  ? (
                    <IconButton
                      icon="lead-pencil"
                      size={22}
                      iconColor={colors.onBackground}
              // underlayColor={colors.background}
                      style={styles.editUserIntro}
                      onPress={() => {
                        navigation.navigate('ProfileStack', {
                          screen: 'EditIntro',
                          params: {
                            data: userData,
                            from: 'My Profilie',
                          },
                        })
                      }}
                    />
                  )
                  : <></>}
              </View>
              {/* Rest of your content */}
              {/* USER INTRO */}
              <Surface style={styles.surfaceView}>
                <Text style={styles.userFullName}>Professional Experience</Text>
                <Text style={styles.userOccupationTitle}>Chief Digital Transformation Officer and something else and more</Text>
                {/* Location */}
                <Text style={styles.userLocation}>Seacombe Gardens - 5047, South Australia, Australia</Text>
                {/* Onboarding point list */}
                <View style={styles.userHighlightedList}>
                  {
            [
              { key: 'Investor/Active Partner/Advisory Partner' },
              { key: 'Interested in business at any stage' },
              { key: 'Occupation skill' },
              { key: 'Work arrangement' },
              { key: 'Mode of Operation' },
              { key: 'Communication Preference' },
              { key: 'References / NDA / Background Check' },
            ].map((item) => (
              <View style={styles.userHighlightedListItem} key={item.key}>
                <Icon style={styles.userHighlightedListItemText} name="check" />
                <Text style={styles.userHighlightedListItemText}>{item.key}</Text>
              </View>
            ))
          }
                </View>
              </Surface>
              {/* USER INTRO */}
              <Surface style={styles.surfaceView}>
                <Text style={styles.userFullName}>Educational Qualifications</Text>
                <Text style={styles.userOccupationTitle}>Chief Digital Transformation Officer and something else and more</Text>
                {/* Location */}
                <Text style={styles.userLocation}>Seacombe Gardens - 5047, South Australia, Australia</Text>
                {/* Onboarding point list */}
                <View style={styles.userHighlightedList}>
                  {
            [
              { key: 'Investor/Active Partner/Advisory Partner' },
              { key: 'Interested in business at any stage' },
              { key: 'Occupation skill' },
              { key: 'Work arrangement' },
              { key: 'Mode of Operation' },
              { key: 'Communication Preference' },
              { key: 'References / NDA / Background Check' },
            ].map((item) => (
              <View style={styles.userHighlightedListItem} key={item.key}>
                <Icon style={styles.userHighlightedListItemText} name="check" />
                <Text style={styles.userHighlightedListItemText}>{item.key}</Text>
              </View>
            ))
          }
                </View>
              </Surface>
              {/* USER INTRO */}
              <Surface style={styles.surfaceView}>
                <Text style={styles.userFullName}>Licenses & Certifications</Text>
                <Text style={styles.userOccupationTitle}>Chief Digital Transformation Officer and something else and more</Text>
                {/* Location */}
                <Text style={styles.userLocation}>Seacombe Gardens - 5047, South Australia, Australia</Text>
                {/* Onboarding point list */}
                <View style={styles.userHighlightedList}>
                  {
            [
              { key: 'Investor/Active Partner/Advisory Partner' },
              { key: 'Interested in business at any stage' },
              { key: 'Occupation skill' },
              { key: 'Work arrangement' },
              { key: 'Mode of Operation' },
              { key: 'Communication Preference' },
              { key: 'References / NDA / Background Check' },
            ].map((item) => (
              <View style={styles.userHighlightedListItem} key={item.key}>
                <Icon style={styles.userHighlightedListItemText} name="check" />
                <Text style={styles.userHighlightedListItemText}>{item.key}</Text>
              </View>
            ))
          }
                </View>
              </Surface>
              {/* USER INTRO */}
              <Surface style={styles.surfaceView}>
                <Text style={styles.userFullName}>Langauges</Text>
                <Text style={styles.userOccupationTitle}>Chief Digital Transformation Officer and something else and more</Text>
                {/* Location */}
                <Text style={styles.userLocation}>Seacombe Gardens - 5047, South Australia, Australia</Text>
                {/* Onboarding point list */}
                <View style={styles.userHighlightedList}>
                  {
            [
              { key: 'Investor/Active Partner/Advisory Partner' },
              { key: 'Interested in business at any stage' },
              { key: 'Occupation skill' },
              { key: 'Work arrangement' },
              { key: 'Mode of Operation' },
              { key: 'Communication Preference' },
              { key: 'References / NDA / Background Check' },
            ].map((item) => (
              <View style={styles.userHighlightedListItem} key={item.key}>
                <Icon style={styles.userHighlightedListItemText} name="check" />
                <Text style={styles.userHighlightedListItemText}>{item.key}</Text>
              </View>
            ))
          }
                </View>
              </Surface>
            </ScrollView>
          </>
        ) : null }
    </SafeAreaView>
  )
}

export default Profile
