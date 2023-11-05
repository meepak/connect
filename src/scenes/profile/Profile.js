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
import Icon from 'react-native-vector-icons/Octicons'
import {
  doc, updateDoc, serverTimestamp, getDoc, query, setDoc, collection,
} from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firestore } from '../../firebase'

import Avatar from '../../components/core/Avatar'
import AvatarOfAuthUser from '../../components/AvatarOfAuthUser'
import ImageSelectAndUpload from '../../utils/ImageSelectAndUpload'
import PencilIconButton from '../../components/PencilIconButton'
import { convertHexToRGBA } from '../../utils/functions'

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
  // console.log(`editing ;${editMode}`)

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
    // console.log(progress)
  }

  const onBanerEdited = (image) => {
    if (image === null || image === undefined) {
      return
    }
    setBannerImage({ uri: image })
    // save to db?
    profileUpdate({ bannerImage: image })
      .then(() => {
      // setBannerSpinner(false)
      })
      .catch((error) => {
        Alert.alert('Error during profile update', error)
      })
  }

  const onAvatarEdited = (image) => {
    profileUpdate({ avatar: image })
      .then(() => {
        // console.log('Avatar updated in db')
      })
      .catch((error) => {
        Alert.alert('Error during profile update', error)
      })
  }

  async function fetchConnection() {
    const docSnap = await getDoc(doc(firestore, 'users', userData.id, 'connection', userId))

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data())
      setConnectionStatus(docSnap.data())
    } else {
      // console.log('No such document!')
    }
    setSpinner(false)
  }

  useEffect(() => {
    if (!editMode) {
      // setSpinner(true)
      fetchConnection()
      // console.log('connection status', connectionStatus)
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
      height: 185,
      // backgroundColor: colors.background,
      // zIndex: 2,
    },
    bannerImage: {
      resizeMode: 'cover', // Use 'cover' for better image fitting
      height: 140,
      // zIndex: 2,
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
      // zIndex: 2,
      width: '100%',
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
      borderWidth: 4,
      borderRadius: 100,
      // backgroundColor: 'transparent',
      // borderRadius: '50 50 0 0',
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
    scrollContent: {
      zIndex: 1,
    },
    userIntro: {
      marginHorizontal: 20,
      paddingBottom: 20,
    },
    userIntroContent: {
      marginRight: 30,
    },
    sectionTitle: {
      fontSize: fonts.headlineSmall.fontSize,
      fontWeight: 600,
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
      marginHorizontal: 20,
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
      marginLeft: 10,
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
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center', // Center items vertically in the row
      justifyContent: 'space-between', // Space out items horizontally
      alignSelf: 'stretch',
    },
    footer: {
      marginVertical: 15,
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

          <KeyboardAwareScrollView
            style={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll
          >

            {/* Banner Start */}
            <View style={styles.banner}>
              <ImageBackground source={bannerImage} style={styles.bannerImage}>
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
            {/* Banner End */}

            {/* User Intro Start */}
            <View style={styles.userIntro}>
              <View style={styles.userIntroContent}>
                <Text style={styles.sectionTitle}>{userFullName} asfdvxczvasdds asdfasfdasfdsafdsasdfasfdasfdsafds</Text>
                <Text style={styles.userOccupationTitle}>Chief Digital Transformation Officer and something else and more</Text>
                {/* Location */}
                <Text style={styles.userLocation}>Seacombe Gardens - 5047, South Australia, Australia</Text>
              </View>
              {editMode
                ? (
                  <PencilIconButton
                    right={-10}
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
            {/* User Intro End */}

            {/* Connect Buttons Start */}
            {(!editMode)
              ? (
                <View style={styles.connectContainer}>
                  <Button
                    disabled={!(connectionStatus.requestSent === undefined && connectionStatus.requestReceived === undefined)}
                    icon="person-add"
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
            {/* Connect Buttons End */}

            {/* Key Summary Start */}
            <Surface style={styles.surfaceView}>
              <View style={styles.row}>
                <Text style={styles.sectionTitle}>Summary</Text>
                {editMode
                  ? (
                    <PencilIconButton
                      top={-10}
                      right={-10}
                      onPress={() => {
                        navigation.navigate('EditKeySummary', {
                          screen: 'EditKeySummary',
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
                        <Text style={styles.userHighlightedListItemText}> {item.key}</Text>
                      </View>
                    ))
                  }
              </View>
            </Surface>
            {/* Key Summary End */}

            {/* Professional Experience Start */}
            <Surface style={styles.surfaceView}>
              <View style={styles.row}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {editMode
                  ? (
                    <PencilIconButton
                      top={-10}
                      right={-10}
                      onPress={() => {
                        navigation.navigate('EditExperience', {
                          screen: 'EditExperience',
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
              <Text style={styles.userLocation}>Company Position,</Text>
              <Text style={styles.userLocation}>Some Company Name</Text>
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
            {/* Professional Experience End */}

            {/* Educational Qualifications Start */}
            <Surface style={styles.surfaceView}>
              <View style={styles.row}>
                <Text style={styles.sectionTitle}>Education</Text>
                {editMode
                  ? (
                    <PencilIconButton
                      top={-10}
                      right={-10}
                      onPress={() => {
                        navigation.navigate('EditExperience', {
                          screen: 'EditExperience',
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
              <Text style={styles.userLocation}>Company Position,</Text>
              <Text style={styles.userLocation}>Some Company Name</Text>
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
            {/* Educational Qualifications End */}

            {/* Licenses & Certification Start */}
            <Surface style={styles.surfaceView}>
              <View style={styles.row}>
                <Text style={styles.sectionTitle}>Licenses & Certificates</Text>
                {editMode
                  ? (
                    <PencilIconButton
                      top={-10}
                      right={-10}
                      onPress={() => {
                        navigation.navigate('EditExperience', {
                          screen: 'EditExperience',
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
              <Text style={styles.userLocation}>Company Position,</Text>
              <Text style={styles.userLocation}>Some Company Name</Text>
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
            {/* Educational Qualifications End */}


            {/* Languages Start */}
            <Surface style={styles.surfaceView}>
              <View style={styles.row}>
                <Text style={styles.sectionTitle}>Languages</Text>
                {editMode
                  ? (
                    <PencilIconButton
                      top={-10}
                      right={-10}
                      onPress={() => {
                        navigation.navigate('EditExperience', {
                          screen: 'EditExperience',
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
              <Text style={styles.userLocation}>Company Position,</Text>
              <Text style={styles.userLocation}>Some Company Name</Text>
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
            {/* Languages End */}

            <View style={styles.footer} />
          </KeyboardAwareScrollView>
        ) : null }
    </SafeAreaView>
  )
}

export default Profile
