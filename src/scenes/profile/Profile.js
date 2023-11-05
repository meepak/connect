import React, { useContext, useState } from 'react'
import {
  Alert, View, StyleSheet, SafeAreaView, StatusBar,
} from 'react-native'
import {
  Text, useTheme, Surface,
} from 'react-native-paper'
import {
  useNavigation, useRoute,
} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Octicons'
import Spinner from 'react-native-loading-spinner-overlay'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  doc, updateDoc,
} from 'firebase/firestore'
import { firestore } from '../../firebase'

import PencilIconButton from '../../components/PencilIconButton'
import Styles from './components/_styles'
import Banner from './components/Banner'
import UserIntro from './components/UserIntro'
import Buttons from './components/Buttons'

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

  const [bannerImage, setBannerImage] = useState(userBannerImage?.uri ? userBannerImage.uri : null)
  const [spinner, setSpinner] = useState(false)

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
      Alert.alert('Error', e.message)
    }
  }

  const onBanerEdited = (image) => {
    if (image === null || image === undefined) {
      return
    }
    setBannerImage(image)
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

  // async function fetchConnection() {
  //   const docSnap = await getDoc(doc(firestore, 'users', userData.id, 'connection', userId))

  //   if (docSnap.exists()) {
  //     // console.log('Document data:', docSnap.data())
  //     setConnectionStatus(docSnap.data())
  //   } else {
  //     // console.log('No such document!')
  //   }
  //   setSpinner(false)
  // }

  // useEffect(() => {
  //   if (!editMode) {
  //     // setSpinner(true)
  //     fetchConnection()
  //     // console.log('connection status', connectionStatus)
  //   } else {
  //     setSpinner(false)
  //   }
  // }, [])

  const styles = StyleSheet.create({
    ...Styles(colors, fonts),
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      // position: 'relative', // Added for positioning the Avatar
    },
    scrollContent: {
      zIndex: 1,
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

            <Banner
              editMode={editMode}
              bannerImage={bannerImage}
              userId={userId}
              userAvatar={userAvatar}
              userFullName={userFullName}
              onBanerEdited={onBanerEdited}
              onAvatarEdited={onAvatarEdited}
            />

            <UserIntro
              editMode={editMode}
              userFullName={userFullName}
            />

            <Buttons
              editMode={editMode}
              userId={userId}
            />

            {/* Key Summary Start */}
            <Surface style={styles.surfaceView}>
              <View style={styles.row}>
                <Text style={styles.sectionHeading}>Summary</Text>
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
                <Text style={styles.sectionHeading}>Work Experience</Text>
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
              <Text style={styles.sectionContent}>Company Position,</Text>
              <Text style={styles.sectionContent}>Some Company Name</Text>
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

            {/* Volunteer Experience Start */}
            <Surface style={styles.surfaceView}>
              <View style={styles.row}>
                <Text style={styles.sectionHeading}>Volunteer</Text>
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
              <Text style={styles.sectionContent}>Company Position,</Text>
              <Text style={styles.sectionContent}>Some Company Name</Text>
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
            {/* Volunteer Experience End */}

            {/* Educational Qualifications Start */}
            <Surface style={styles.surfaceView}>
              <View style={styles.row}>
                <Text style={styles.sectionHeading}>Education</Text>
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
              <Text style={styles.sectionContent}>Company Position,</Text>
              <Text style={styles.sectionContent}>Some Company Name</Text>
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
                <Text style={styles.sectionHeading}>Licenses & Certificates</Text>
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
              <Text style={styles.sectionContent}>Company Position,</Text>
              <Text style={styles.sectionContent}>Some Company Name</Text>
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
                <Text style={styles.sectionHeading}>Languages</Text>
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
              <Text style={styles.sectionContent}>Company Position,</Text>
              <Text style={styles.sectionContent}>Some Company Name</Text>
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
