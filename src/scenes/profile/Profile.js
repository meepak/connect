import React, {
  useContext, useState, useRef, useCallback,
} from 'react'
import {
  Alert, View, StyleSheet, StatusBar,
} from 'react-native'
import {
  Text, useTheme, Surface, Button,
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

import IconLink from '../../components/core/IconLink'
import PencilIconButton from '../../components/PencilIconButton'
import Styles from './components/_styles'
import Banner from './components/Banner'
import UserIntro from './components/UserIntro'
import Buttons from './components/Buttons'
import Summary from './components/Summary'
import SheetModal from '../../components/core/SheetModal'

// Temporary measure to get user id of logged in user to test banner upload
import { UserDataContext } from '../../context/UserDataContext'
import ScreenTemplate from '../../components/ScreenTemplate'
import Experience from './components/Experience'
import Volunteer from './components/Volunteer'
import Education from './components/Education'
import Licenses from './components/Licenses'
import Languages from './components/Languages'

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

  const addSectionSheetRef = useRef(null)

  const handleAddSectionPress = useCallback(() => {
    addSectionSheetRef.current?.present()
  }, [])

  // TODO find more secure way to verify editMode, probably validate userId through auth token
  const editMode = userId === userData.id
  // console.log(`editing ;${editMode}`)

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

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Spinner
          visible={spinner}
          textStyle={{ color: colors.onSurface }}
          overlayColor="rgba(0,0,0,0.5)"
        />
        {!spinner
          ? (
            // TODO: Convert this to flatlist for performance
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

              {
                /* Section to show connection
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
              <Button
                onPress={() => handleAddSectionPress(1)}
                mode="outlined"
                style={styles.addSection}
                icon="plus"
                textColor={colors.onBackground}
              ><Text style={styles.addSectionLabel}>Add new section</Text>
              </Button>

              <Experience editMode={editMode} />

              <Volunteer editMode={editMode} />

              <Education editMode={editMode} />

              <Licenses editMode={editMode} />

              <Languages editMode={editMode} />

              {/* To be decided on Interest, References, Business documents, etc.. */}

              <View style={styles.footer} />
            </KeyboardAwareScrollView>
          ) : null }
      </View>

      <SheetModal ref={addSectionSheetRef} snapsAt={['40%']}>
        <View style={{ marginHorizontal: 40, marginVertical: 20 }}>
          <IconLink
            marginLeft={-10}
            icon="plus-circle"
            text="Professional Experiences"
            color={colors.onPrimaryContainer}
            onPress={() => {
              navigation.navigate('EditExperiences', {
                screen: 'EditExperiences',
                params: {
                  data: userData,
                  from: 'My Profilie',
                },
              })
            }}
          />
          <IconLink
            marginLeft={-10}
            icon="plus-circle"
            text="Educational Qualifications"
            color={colors.onPrimaryContainer}
            onPress={() => {
              navigation.navigate('EditExperiences', {
                screen: 'EditExperiences',
                params: {
                  data: userData,
                  from: 'My Profilie',
                },
              })
            }}
          />
          <IconLink
            marginLeft={-10}
            icon="plus-circle"
            text="Licenses & Certifications"
            color={colors.onPrimaryContainer}
            onPress={() => {
              navigation.navigate('EditExperiences', {
                screen: 'EditExperiences',
                params: {
                  data: userData,
                  from: 'My Profilie',
                },
              })
            }}
          />
          <IconLink
            marginLeft={-10}
            icon="plus-circle"
            text="Languages"
            color={colors.onPrimaryContainer}
            onPress={() => {
              navigation.navigate('EditExperiences', {
                screen: 'EditExperiences',
                params: {
                  data: userData,
                  from: 'My Profilie',
                },
              })
            }}
          />
        </View>
      </SheetModal>
    </ScreenTemplate>
  )
}

export default Profile
