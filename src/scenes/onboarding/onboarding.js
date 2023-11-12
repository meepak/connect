import React, {
  useState, useContext, // useRef,
} from 'react'
import { Alert } from 'react-native'
import { useTheme } from 'react-native-paper'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
import { firestore } from '../../firebase'
import { UserDataContext } from '../../context/UserDataContext'

import Header from './__header'
import WhoAmI from './_whoami'
import SelectIndustries from './_industries'
import SelectBusinessStage from './_businessstage'
import SelectOperationMode from './_operationmode'
import SelectLocation from './_location'
import SelectWorkArrangementPreference from './_workarrangement'
import SelectCommunicationPreference from './_communication'
import SelectPartnerTypes from './_partnertypes'
import SelectEducation from './_education'
import SelectOccupations from './_occupation'
import SelectYesNo from './_yesno'

import Styles from './Styles'

// import mergeJsonObjects from '../../utils/functions'

export default function Onboarding() {
  const { colors, fonts } = useTheme()
  const { userData } = useContext(UserDataContext)
  const styles = Styles(fonts)

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
  const [education, setEducation] = useState(userData.education ?? [])
  const [occupations, setOccupations] = useState(userData.occupations ?? [])
  const [ndaSign, setNdaSign] = useState(userData.ndaSign ?? '')
  const [requireBackgroundCheck, setRequireBackgroundCheck] = useState(userData.requireBackgroundCheck ?? '')
  const [agreesBackgroundCheck, setAgreesBackgroundCheck] = useState(userData.agreesBackgroundCheck ?? '')

  const profileUpdate = async () => {
    setSpinner(true)
    try {
      const data = {
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
      await updateDoc(usersRef, data)
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
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="never"
        // enableOnAndroid
      >

        <Header
          fullName={userData.fullName}
          onAvatarChanged={(item) => setAvatar(item)}
        />

        <WhoAmI
          onWhoAmIChanged={(item) => setWhoAmI(item)}
          initialValue={userData.whoAmI}
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

        <Button
          label="Let's Go!"
          color={colors.primary}
          onPress={profileUpdate}
        />
        {/* <Button
          label="Simulate Error"
          color={colors.secondary}
          onPress={() => {
            block1.current.scrollIntoView({ behavior: 'smooth' })
          }}
        /> // tried with forward ref, didn't work, retry again */}
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onBackground }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
