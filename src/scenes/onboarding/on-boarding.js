import React, {
  useState, useContext, useRef,
} from 'react'
import { Alert, ScrollView } from 'react-native'
import { useTheme, Button, Text } from 'react-native-paper'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import { ScreenTemplate } from '../../components/templates'
// import Button from '../../components/core/button'
import { firestore } from '../../firebase'
import { UserDataContext } from '../../context/user-data-context'

import Header from './__header'
import WhoAmI from './_who-am-i'
import SelectIndustries from './_industries'
import SelectBusinessStage from './_business-stage'
import SelectOperationMode from './_operation-mode'
import SelectLocation from './_location'
import SelectWorkArrangementPreference from './_work-arrangement'
import SelectCommunicationPreference from './_communication'
import SelectPartnerTypes from './_partner-types'
import SelectEducation from './_education'
import SelectOccupations from './_occupation'
import SelectYesNo from './_yes-no'

import Styles from './styles'

// import mergeJsonObjects from '../../utils/functions'

export default function OnBoarding() {
  const ref = useRef(null)
  const { userData } = useContext(UserDataContext)
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)

  const [avatar, setAvatar] = useState(userData.avatar)
  const [fullName] = useState(userData.fullName)
  const [phone] = useState(userData.phone ?? '')
  const [spinner, setSpinner] = useState(false)

  // OnBoarding data
  const [whoAmI, setWhoAmI] = useState(userData.whoAmI ?? '')
  const [whoAmIError, setWhoAmIError] = useState(false)

  const [industries, setIndustries] = useState(userData.industries ?? [])
  const [industriesError, setIndustriesError] = useState(false)

  const [businessStage, setBusinessStage] = useState(userData.businessStage ?? '')
  const [businessStageError, setBusinessStageError] = useState(false)

  const [operationMode, setOperationMode] = useState(userData.operationMode ?? '')
  const [operationModeError, setOperationModeError] = useState(false)

  const [location, setLocation] = useState(userData.location ?? '')
  const [locationError, setLocationError] = useState(false)

  const [workArrangementPreference, setWorkArrangementPreference] = useState(userData.workArrangementPreference ?? '')
  const [workArrangementPreferenceError, setWorkArrangementPreferenceError] = useState(false)

  const [communicationPreference, setCommunicationPreference] = useState(userData.communicationPreference ?? [])
  const [communicationPreferenceError, setCommunicationPreferenceError] = useState(false)

  const [partnerTypes, setPartnerTypes] = useState(userData.partnerTypes ?? [])
  const [partnerTypesError, setPartnerTypesError] = useState(false)

  const [education, setEducation] = useState(userData.education ?? '')
  const [educationError, setEducationError] = useState(false)

  const [occupations, setOccupations] = useState(userData.occupations ?? [])
  const [occupationError, setOccupationError] = useState(false)

  const [ndaSign, setNdaSign] = useState(userData.ndaSign ?? '')
  const [ndaSignError, setNdaSignError] = useState(false)

  const [requireBackgroundCheck, setRequireBackgroundCheck] = useState(userData.requireBackgroundCheck ?? '')
  const [requireBackgroundCheckError, setRequireBackgroundCheckError] = useState(false)

  const [agreesBackgroundCheck, setAgreesBackgroundCheck] = useState(userData.agreesBackgroundCheck ?? '')
  const [agreeBackgroundCheckError, setAgreesBackgroundCheckError] = useState(false)

  const [coordinates, setCoordinates] = useState([])
  const validate = () => {
    setWhoAmIError(false)
    if (whoAmI.length === 0) {
      setWhoAmIError(true)
      return false
    }
    setIndustriesError(false)
    if (industries.length === 0) {
      setIndustriesError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.industries, animated: true })
      return false
    }
    setBusinessStageError(false)
    if (businessStage.length === 0) {
      setBusinessStageError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.businessStage, animated: true })
      return false
    }

    setOperationModeError(false)
    if (operationMode.length === 0) {
      setOperationModeError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.operationMode, animated: true })
      return false
    }

    setLocationError(false)
    if (location.length === 0) {
      setLocationError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.location, animated: true })
      return false
    }

    setWorkArrangementPreferenceError(false)
    if (workArrangementPreference.length === 0) {
      setWorkArrangementPreferenceError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.workArrangementPreference, animated: true })
      return false
    }

    setCommunicationPreferenceError(false)
    if (communicationPreference.length === 0) {
      setCommunicationPreferenceError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.communicationPreference, animated: true })
      return false
    }

    setPartnerTypesError(false)
    if (partnerTypes.length === 0) {
      setPartnerTypesError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.partnerTypes, animated: true })
      return false
    }

    setEducationError(false)
    if (education.length === 0) {
      setEducationError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.education, animated: true })
      return false
    }

    setOccupationError(false)
    if (occupations.length === 0) {
      setOccupationError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.occupations, animated: true })
      return false
    }

    setNdaSignError(false)
    if (ndaSign.length === 0) {
      setNdaSignError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.ndaSign, animated: true })
      return false
    }

    setRequireBackgroundCheckError(false)
    if (requireBackgroundCheck.length === 0) {
      setRequireBackgroundCheckError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.requireBackgroundCheck, animated: true })
      return false
    }

    setAgreesBackgroundCheckError(false)
    if (agreesBackgroundCheck.length === 0) {
      setAgreesBackgroundCheckError(true)
      ref.current.scrollTo({ x: 10, y: coordinates.agreesBackgroundCheck, animated: true })
      return false
    }

    // all good
    return true
  }
  const profileUpdate = async () => {
    setSpinner(true)
    if (!validate()) {
      setSpinner(false)
      return
    }
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
      <ScrollView
        style={styles.main}
        keyboardShouldPersistTaps="never"
        ref={ref}
      >

        <Header
          fullName={userData.fullName}
          onAvatarChanged={(item) => setAvatar(item)}
        />

        <WhoAmI
          onWhoAmIChanged={(item) => setWhoAmI(item)}
          initialValue={whoAmI}
          error={whoAmIError}
          onLayout={(event) => setCoordinates({ ...coordinates, whoAmI: event.nativeEvent.layout.y })}
        />

        {whoAmI === 'founder'
          ? (
            <>
              <SelectIndustries
                maxSelect={3}
                initialValues={industries}
                onChecked={(values) => {
                  setIndustries(values)
                }}
                error={industriesError}
                onLayout={(event) => setCoordinates({ ...coordinates, industries: event.nativeEvent.layout.y })}
              />

              <SelectBusinessStage
                initialValues={businessStage}
                onBusinessStageChanged={(item) => { setBusinessStage(item) }}
                error={businessStageError}
                onLayout={(event) => setCoordinates({ ...coordinates, businessStage: event.nativeEvent.layout.y })}
              />

              <SelectOperationMode
                initialValue={operationMode}
                onBusinessOperationModeChanged={(item) => { setOperationMode(item) }}
                error={operationModeError}
                onLayout={(event) => setCoordinates({ ...coordinates, operationMode: event.nativeEvent.layout.y })}
              />

              <SelectLocation
                initialValue={location}
                onBusinessLocationChanged={(item) => { setLocation(item) }}
                error={locationError}
                onLayout={(event) => setCoordinates({ ...coordinates, location: event.nativeEvent.layout.y })}
              />

              <SelectWorkArrangementPreference
                initialValue={workArrangementPreference}
                onWorkArrangementPreferenceChanged={(item) => { setWorkArrangementPreference(item) }}
                error={workArrangementPreferenceError}
                onLayout={(event) => setCoordinates({ ...coordinates, workArrangementPreference: event.nativeEvent.layout.y })}
              />

              <SelectCommunicationPreference
                initialValues={communicationPreference}
                onCommunicationPreferenceChanged={(item) => { setCommunicationPreference(item) }}
                error={communicationPreferenceError}
                onLayout={(event) => setCoordinates({ ...coordinates, communicationPreference: event.nativeEvent.layout.y })}
              />

              <SelectPartnerTypes
                initialValues={partnerTypes}
                onPartnerTypesChanged={(item) => { setPartnerTypes(item) }}
                error={partnerTypesError}
                onLayout={(event) => setCoordinates({ ...coordinates, partnerTypes: event.nativeEvent.layout.y })}
              />

              <SelectOccupations
                initialValues={occupations}
                question="Do you have any preferences on occupational skills background of your partner?"
                onOccupationsSelected={(items) => { setOccupations(items) }}
                error={occupationError}
                onLayout={(event) => setCoordinates({ ...coordinates, occupations: event.nativeEvent.layout.y })}
              />

              <SelectEducation
                initialValue={education}
                onEducationChanged={(item) => { setEducation(item) }}
                error={educationError}
                onLayout={(event) => setCoordinates({ ...coordinates, education: event.nativeEvent.layout.y })}
              />

              <SelectYesNo
                initialValue={ndaSign}
                OnYesNoSelected={(item) => { setNdaSign(item) }}
                question="Will you ask to sign NDA?"
                error={ndaSignError}
                onLayout={(event) => setCoordinates({ ...coordinates, ndaSign: event.nativeEvent.layout.y })}
              />

              <SelectYesNo
                initialValue={requireBackgroundCheck}
                OnYesNoSelected={(item) => { setRequireBackgroundCheck(item) }}
                question="Will you ask for references & background check?"
                error={requireBackgroundCheckError}
                onLayout={(event) => setCoordinates({ ...coordinates, requireBackgroundCheck: event.nativeEvent.layout.y })}
              />

              <SelectYesNo
                initialValue={agreesBackgroundCheck}
                OnYesNoSelected={(item) => { setAgreesBackgroundCheck(item) }}
                question="If requested, will you provide references & consent to background check?"
                error={agreeBackgroundCheckError}
                onLayout={(event) => setCoordinates({ ...coordinates, agreesBackgroundCheck: event.nativeEvent.layout.y })}
              />

            </>
          )
          : <></>}
        {whoAmI === 'associate'
          ? (
            <>
              <SelectIndustries
                maxSelect={5}
                initialValues={industries}
                question="Select up to 5 industries you are interested in."
                onChecked={(values) => {
                  setIndustries(values)
                }}
                error={industriesError}
                onLayout={(event) => setCoordinates({ ...coordinates, industries: event.nativeEvent.layout.y })}
              />

              <SelectBusinessStage
                allSelect
                initialValues={businessStage}
                question="What stage of business are you most interested in?"
                onBusinessStageChanged={(item) => { setBusinessStage(item) }}
                error={businessStageError}
                onLayout={(event) => setCoordinates({ ...coordinates, businessStage: event.nativeEvent.layout.y })}
              />

              <SelectOperationMode
                initialValue={operationMode}
                question="Do you prefer business that operates online and/or offline?"
                onBusinessOperationModeChanged={(item) => { setOperationMode(item) }}
                error={operationModeError}
                onLayout={(event) => setCoordinates({ ...coordinates, operationMode: event.nativeEvent.layout.y })}
              />

              <SelectPartnerTypes
                initialValues={partnerTypes}
                question="What kind of role are you looking to take on?"
                onPartnerTypesChanged={(item) => { setPartnerTypes(item) }}
                error={partnerTypesError}
                onLayout={(event) => setCoordinates({ ...coordinates, partnerTypes: event.nativeEvent.layout.y })}
              />

              <SelectWorkArrangementPreference
                initialValue={workArrangementPreference}
                onWorkArrangementPreferenceChanged={(item) => { setWorkArrangementPreference(item) }}
                error={workArrangementPreferenceError}
                onLayout={(event) => setCoordinates({ ...coordinates, workArrangementPreference: event.nativeEvent.layout.y })}
              />

              <SelectCommunicationPreference
                initialValues={communicationPreference}
                onCommunicationPreferenceChanged={(item) => { setCommunicationPreference(item) }}
                error={communicationPreferenceError}
                onLayout={(event) => setCoordinates({ ...coordinates, communicationPreference: event.nativeEvent.layout.y })}
              />

              <SelectLocation
                initialValue={location}
                question="Do you have specific preference on business location? If so, select city/country."
                onBusinessLocationChanged={(item) => { setLocation(item) }}
                error={locationError}
                onLayout={(event) => setCoordinates({ ...coordinates, location: event.nativeEvent.layout.y })}
              />

              <SelectOccupations
                initialValues={occupations}
                question="Select your occupational skills background."
                maxSelect={5}
                onOccupationsSelected={(items) => { setOccupations(items) }}
                error={occupationError}
                onLayout={(event) => setCoordinates({ ...coordinates, occupations: event.nativeEvent.layout.y })}
              />

              <SelectEducation
                initialValue={education}
                question="What is your highest educational qualification?"
                onEducationChanged={(item) => { setEducation(item) }}
                error={educationError}
                onLayout={(event) => setCoordinates({ ...coordinates, education: event.nativeEvent.layout.y })}
              />

              <SelectYesNo
                initialValue={requireBackgroundCheck}
                OnYesNoSelected={(item) => { setRequireBackgroundCheck(item) }}
                question="Will you ask for references & background check?"
                error={requireBackgroundCheckError}
                onLayout={(event) => setCoordinates({ ...coordinates, requireBackgroundCheck: event.nativeEvent.layout.y })}
              />

              <SelectYesNo
                initialValue={ndaSign}
                OnYesNoSelected={(item) => { setNdaSign(item) }}
                question="If requested, will you sign NDA?"
                error={ndaSignError}
                onLayout={(event) => setCoordinates({ ...coordinates, ndaSign: event.nativeEvent.layout.y })}
              />

              <SelectYesNo
                initialValue={agreesBackgroundCheck}
                OnYesNoSelected={(item) => { setAgreesBackgroundCheck(item) }}
                question="If requested, will you provide references & consent to background check?"
                error={agreeBackgroundCheckError}
                onLayout={(event) => setCoordinates({ ...coordinates, agreesBackgroundCheck: event.nativeEvent.layout.y })}
              />

            </>
          )
          : <></>}

        <Button
          onPress={() => profileUpdate()}
          mode="contained"
          style={styles.submitButton}
          icon="rocket"
          textColor={colors.onPrimaryContainer}
        >
          <Text style={styles.submitButtonText}>Let&apos;s Go!</Text>
        </Button>

      </ScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onBackground }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
