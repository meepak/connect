import React, {
  useState, useContext, // useLayoutEffect, // useRef,
} from 'react'
import {
  Alert, StatusBar, SafeAreaView, StyleSheet, View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import { useRoute, useNavigation } from '@react-navigation/native'
import ScreenTemplate from '../../components/ScreenTemplate'
import { firestore } from '../../firebase'
import { UserDataContext } from '../../context/UserDataContext'
import Header4Profile from '../../components/header/Header4Profile'

import WhoAmI from '../onboarding/_whoami'
import SelectIndustries from '../onboarding/_industries'
import SelectBusinessStage from '../onboarding/_businessstage'
import SelectOperationMode from '../onboarding/_operationmode'
import SelectLocation from '../onboarding/_location'
import SelectWorkArrangementPreference from '../onboarding/_workarrangement'
import SelectCommunicationPreference from '../onboarding/_communication'
import SelectPartnerTypes from '../onboarding/_partnertypes'
import SelectEducation from '../onboarding/_education'
import SelectOccupations from '../onboarding/_occupation'
import SelectYesNo from '../onboarding/_yesno'

// THIS HAS BECOME A SERIOUS TIME WASTER
// DOESN'T SCROLL PROPERLY IN ANDROID.. CAN'T FIGURE OUT YET WHY??
// JUST DELETE THIS FILE AND RE DO THIS ALL TOGETHER AGAIN, ***********FIND THE CAUSE THOUGH WHY SCROLLING IS GETTING BLOCKED ....
// PROFILE SCREENS NEED SERIOUS REFACTORING.......

// TODO COPIED FROM ONBOARDING, FIRST MAKE CONSISTENT HEADER
// NOW CUSTOMIZE THIS TO CREATE KEY SUMMARY INFO
// SOME OF THE STUFF IS ALREADY ASKED IN INTRO SO FOCUS ON REFINING ONBOARDING QUESTION ONLY
export default function EditKeySummary() {
  const { userData } = useContext(UserDataContext)
  const { fonts, colors } = useTheme()
  const route = useRoute()
  const { data, from } = route.params
  const navigation = useNavigation()

  const [avatar, setAvatar] = useState(userData.avatar)
  const [fullName] = useState(userData.fullName)
  const [phone] = useState(userData.phone ?? '')
  const [spinner, setSpinner] = useState(false)
  // Onboarding data
  const [whoAmI, setWhoAmI] = useState(userData.whoAmI ?? '')
  const [industries, setIndustries] = useState(userData.industries ?? [])
  const [businessStage, setBusinessStage] = useState(userData.businessStage ?? '')
  const [operationMode, setOperationMode] = useState(userData.operationMode ?? '')
  const [location, setLocation] = useState(userData.location ?? '')
  const [workArrangementPreference, setWorkArrangementPreference] = useState(userData.workArrangementPreference ?? '')
  const [communicationPreference, setCommunicationPreference] = useState(userData.communicationPreference ?? '')
  const [partnerTypes, setPartnerTypes] = useState(userData.partnerTypes ?? [])
  const [education, setEducation] = useState(userData.education ?? '')
  const [occupations, setOccupations] = useState(userData.occupations ?? [])
  const [ndaSign, setNdaSign] = useState(userData.ndaSign ?? '')
  const [requireBackgroundCheck, setRequireBackgroundCheck] = useState(userData.requireBackgroundCheck ?? '')
  const [agreesBackgroundCheck, setAgreesBackgroundCheck] = useState(userData.agreesBackgroundCheck ?? '')

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    content: {
      zIndex: 1,
    },
    footer: {
      marginVertical: 15,
    },
  })

  const profileUpdate = async () => {
    setSpinner(true)
    try {
      const uData = {
        id: userData.id,
        fullName,
        avatar: avatar ?? null,
        phone,
        email: userData.email,
        isOnboarded: true,
        whoAmI,
        industries,
        businessStage,
        operationMode,
        location,
        workArrangementPreference,
        communicationPreference,
        partnerTypes,
        education,
        occupations,
        ndaSign,
        requireBackgroundCheck,
        agreesBackgroundCheck,
        updatedAt: serverTimestamp(),
      }
      const usersRef = doc(firestore, 'users', userData.id)
      await updateDoc(usersRef, uData)
      // const updatedUserData = mergeJsonObjects(userData, data)
      // setUserData(updatedUserData)
      // console.log('Updated User Data')
      // console.log(updatedUserData)
    } catch (e) {
      // TODO: navigate to error screen, log errors for later debugging
      Alert.alert('Error', e.message)
    }

    setSpinner(false)
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Header4Profile
          title="Edit Key Summary"
          changed
          onSave={() => {
            profileUpdate()
            // console.log('saved changes')
            navigation.navigate('ProfileStack', {
              screen: 'Profile',
              params: { // userId, userFullName, userAvatar, userBannerImage,
                userId: userData.id,
                userFullName: userData.fullName,
                userAvatar: userData.avatar,
                userBannerImage: { uri: userData.bannerImage },
              },
            })
          }}
        />
        {/* TODO replace this with FLATLIST for lazy loading */}
        <KeyboardAwareScrollView
          style={styles.content}
          keyboardShouldPersistTaps="never"
        >

          <WhoAmI
            onWhoAmIChanged={(item) => setWhoAmI(item)}
            initialValue={userData.whoAmI}
            disabled
          />

          {whoAmI === 'founder'
            ? (
              <>
                <SelectIndustries
                  maxSelect={3}
                  initialValues={userData.industries}
                  onChecked={(values) => {
                    setIndustries(values)
                  }}
                />

                <SelectBusinessStage
                  initialValues={userData.businessStage}
                  onBusinessStageChanged={(item) => { setBusinessStage(item) }}
                />

                <SelectOperationMode
                  initialValue={userData.operationMode}
                  onBusinessOperationModeChanged={(item) => { setOperationMode(item) }}
                />

                <SelectLocation
                  initialValue={userData.location}
                  onBusinessLocationChanged={(item) => { setLocation(item) }}
                />

                <SelectWorkArrangementPreference
                  initialValue={userData.workArrangementPreference}
                  onWorkArrangementPreferenceChanged={(item) => { setWorkArrangementPreference(item) }}
                />

                <SelectCommunicationPreference
                  initialValues={userData.communicationPreference}
                  onCommunicationPreferenceChanged={(item) => { setCommunicationPreference(item) }}
                />

                <SelectPartnerTypes
                  initialValues={userData.partnerTypes}
                  onPartnerTypesChanged={(item) => { setPartnerTypes(item) }}
                />

                <SelectOccupations
                  initialValues={userData.occupations}
                  question="Do you have any preferences on occupational skills background of your partner?"
                  onOccupationsSelected={(items) => { setOccupations(items) }}
                />

                <SelectEducation
                  initialValue={userData.education}
                  onEducationChanged={(item) => { setEducation(item) }}
                />

                <SelectYesNo
                  initialValue={userData.ndaSign}
                  OnYesNoSelected={(item) => { setNdaSign(item) }}
                  question="Will you ask to sign NDA?"
                />

                <SelectYesNo
                  initialValue={userData.requireBackgroundCheck}
                  OnYesNoSelected={(item) => { setRequireBackgroundCheck(item) }}
                  question="Will you ask for references & background check?"
                />

                <SelectYesNo
                  initialValue={userData.agreesBackgroundCheck}
                  OnYesNoSelected={(item) => { setAgreesBackgroundCheck(item) }}
                  question="If requested, will you provide references & consent to background check?"
                />

              </>
            )
            : <></>}
          {whoAmI === 'associate'
            ? (
              <>
                <SelectIndustries
                  maxSelect={5}
                  initialValues={userData.industries}
                  question="Select up to 5 industries you are interested in."
                  onChecked={(values) => {
                    setIndustries(values)
                  }}
                />

                <SelectBusinessStage
                  allSelect
                  initialValues={userData.businessStage}
                  question="What stage of business are you most interested in?"
                  onBusinessStageChanged={(item) => { setBusinessStage(item) }}
                />

                <SelectOperationMode
                  initialValue={userData.operationMode}
                  question="Do you prefer business that operates online and/or offline?"
                  onBusinessOperationModeChanged={(item) => { setOperationMode(item) }}
                />

                <SelectPartnerTypes
                  initialValues={userData.partnerTypes}
                  question="What kind of role are you looking to take on?"
                  onPartnerTypesChanged={(item) => { setPartnerTypes(item) }}
                />

                <SelectWorkArrangementPreference
                  initialValue={userData.workArrangementPreference}
                  onWorkArrangementPreferenceChanged={(item) => { setWorkArrangementPreference(item) }}
                />

                <SelectLocation
                  initialValue={userData.location}
                  question="Do you have specific preference on business location? If so, select city/country."
                  onBusinessLocationChanged={(item) => { setLocation(item) }}
                />

                <SelectOccupations
                  initialValues={userData.occupations}
                  question="Select your occupational skills background."
                  maxSelect={5}
                  onOccupationsSelected={(items) => { setOccupations(items) }}
                />

                <SelectEducation
                  initialValue={userData.education}
                  question="What is your highest educational qualification?"
                  onEducationChanged={(item) => { setEducation(item) }}
                />

                <SelectYesNo
                  initialValue={userData.requireBackgroundCheck}
                  OnYesNoSelected={(item) => { setRequireBackgroundCheck(item) }}
                  question="Will you ask for references & background check?"
                />

                <SelectYesNo
                  initialValue={userData.ndaSign}
                  OnYesNoSelected={(item) => { setNdaSign(item) }}
                  question="If requested, will you sign NDA?"
                />

                <SelectYesNo
                  initialValue={userData.agreesBackgroundCheck}
                  OnYesNoSelected={(item) => { setAgreesBackgroundCheck(item) }}
                  question="If requested, will you provide references & consent to background check?"
                />

              </>
            )
            : <></>}

          <View style={styles.footer} />
        </KeyboardAwareScrollView>
      </View>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
