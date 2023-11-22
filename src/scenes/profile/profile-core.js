/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useState,
} from 'react'
import {
  Alert, View, StyleSheet,
} from 'react-native'
import {
  Text, useTheme, Button,
} from 'react-native-paper'
// import { useRoute } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  doc, updateDoc,
} from 'firebase/firestore'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { firestore } from '../../firebase'

import Styles from './components/_styles'
import Banner from './components/banner'
import UserIntro from './components/user-intro'
import Buttons from './components/buttons'
import Summary from './components/summary'
import AddSectionMenu from './components/sheets/add-section-menu'

// Temporary measure to get user id of logged in user to test banner upload
import { UserDataContext } from '../../context'
import Experience from './components/experience'
import Volunteer from './components/volunteer'
import Education from './components/education'
import Licenses from './components/licenses'
import Languages from './components/languages'

// eslint-disable-next-line react/prop-types
const ProfileCore = ({
  userId, userFullName, userAvatar, userBannerImage, sheetMode,
}) => {
  const { colors, fonts } = useTheme()
  const { userData } = useContext(UserDataContext)
  const [bannerImage, setBannerImage] = useState(userBannerImage)

  const [spinner] = useState(false)
  const [showAddSectionMenu, setShowAddSectionMenu] = useState(false)

  // TODO find more secure way to verify editMode, probably validate userId through auth token
  // TODO RESTORE TEMP showBackButton CHANGE & use proper way
  const editMode = (sheetMode === true) ? false : userId === userData.id
  // console.log(`editing ;${editMode}`)

  useEffect(() => {
    if (editMode) {
      setBannerImage(userData.bannerImage)
    }
  }, [userData.bannerImage])

  // TODO organize this as utility functions
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
      // console.log('profile update with', data)
      const usersRef = doc(firestore, 'users', userData.id)
      updateDoc(usersRef, data).then(() => {
        // const updatedUserData = mergeJsonObjects(userData, data)
        // setUserData(updatedUserData)
      }).catch((error) => {
        Alert.alert('Error during profile update', error)
      })
    } catch (e) {
      Alert.alert('Error', e.message)
    }
  }

  const onImageUpated = (image, name) => {
    if (image === null || image === undefined) {
      return
    }
    profileUpdate({ [name]: image })
      .then(() => {
        // console.log('profile updated')
        // console.log('triggering setupdate automatically through subscriptionn??')
      })
      .catch((error) => {
        Alert.alert(`Error during ${name} update`, error)
      })
  }

  const onBanerEdited = (image) => {
    onImageUpated(image, 'bannerImage')
  }

  const onAvatarEdited = (image) => {
    onImageUpated(image, 'avatar')
  }

  const styles = StyleSheet.create({
    ...Styles(colors, fonts),
    container: {
      flex: 1,
      backgroundColor: colors.background,
      // position: 'relative', // Added for positioning the Avatar
    },
    scrollContent: {
      zIndex: 1,
    },
    footer: {
      marginVertical: 15,
    },
    addSection: {
      marginVertical: 15,
      width: '70%',
      alignSelf: 'center',
    },
    addSectionLabel: {

    },

  })

  const ProfileScrollView = sheetMode ? BottomSheetScrollView : KeyboardAwareScrollView

  return (
    <View style={styles.container}>
      <ProfileScrollView
        style={styles.scrollContent}
        keyboardShouldPersistTaps="never"
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
      >
        <Banner
          editMode={editMode}
          bannerImage={bannerImage}
          userId={userId}
          userAvatar={userAvatar}
          userFullName={userFullName}
          onBanerEdited={onBanerEdited}
          onAvatarEdited={onAvatarEdited}
          sheetMode={sheetMode}
        />

        <UserIntro
          editMode={editMode}
          userFullName={userFullName}
          sheetMode={sheetMode}
        />

        {/* Section to show connection
                request and other buttons */
              }
        <Buttons
          editMode={editMode}
          userId={userId}
        />

        <Summary editMode={editMode} />

        {/* Section up to here can be displayed
              just based on onboarding info
              From here on, let user select which section they want to add
              Display the following button at the end of the added section
              Till all available sections are covered */}
        {editMode
          ? (
            <Button
              onPress={() => setShowAddSectionMenu(true)}
              mode="outlined"
              style={styles.addSection}
              icon="plus"
              textColor={colors.onBackground}
            >
              <Text style={styles.addSectionLabel}>Add more sections</Text>
            </Button>
          )
          : <></>}

        <Experience editMode={editMode} />

        <Volunteer editMode={editMode} />

        <Education editMode={editMode} />

        <Licenses editMode={editMode} />

        <Languages editMode={editMode} />

        {/* To be decided on Interest, References, Business documents, etc.. */}

        <View style={styles.footer} />
        <AddSectionMenu show={showAddSectionMenu} onClose={() => { setShowAddSectionMenu(false) }} />
      </ProfileScrollView>

      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  )
}

export default ProfileCore
