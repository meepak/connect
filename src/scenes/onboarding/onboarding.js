import React, {
  useState, useEffect, useContext, // useRef,
} from 'react'
import {
  Alert,
} from 'react-native'
import { doc, updateDoc } from 'firebase/firestore'
// import { Avatar } from '@rneui/themed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
import { firestore } from '../../firebase'
import { colors } from '../../theme'
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

import styles from './styles'

export default function Onboarding() {
  const { userData } = useContext(UserDataContext)
  // const route = useRoute()
  // const scheme = useColorScheme()
  const [avatar, setAvatar] = useState(userData.avatar)
  const [whoAmI, setWhoAmI] = useState()
  const [fullName] = useState(userData.fullName)
  const [phone] = useState(userData.phone ?? '')
  const [spinner, setSpinner] = useState(false)
  // const block1 = useRef(null)
  // const isDark = scheme === 'dark'
  // const colorScheme = {
  //   text: isDark ? colors.white : colors.primaryText,
  //   progress: isDark ? styles.darkprogress : styles.progress,
  // }

  useEffect(() => {
    console.log('Edit screen')
  }, [])

  const profileUpdate = async () => {
    setSpinner(true)

    try {
      const data = {
        id: userData.id,
        fullName,
        avatar: avatar ?? null,
        phone,
        isOnboarded: !userData.isOnboarded,
      }
      const usersRef = doc(firestore, 'users', userData.id)
      await updateDoc(usersRef, data)
      console.log(userData)
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
      >

        <Header
          fullName={userData.fullName}
          onAvatarChanged={(item) => setAvatar(item)}
        />

        <WhoAmI
          onWhoAmIChanged={(item) => setWhoAmI(item)}
        />

        {whoAmI === 'founder'
          ? (
            <>
              <SelectIndustries
                maxSelect={3}
                onChecked={(values) => {
                  console.log(values)
                }}
              />

              <SelectBusinessStage
                onBusinessStageChanged={(item) => { console.log(item) }}
              />

              <SelectOperationMode
                onBusinessOperationModeChanged={(item) => { console.log(item) }}
              />

              <SelectLocation
                onBusinessLocationChanged={(item) => { console.log(`selected business location - ${item}`) }}
              />

              <SelectWorkArrangementPreference
                onWorkArrangementPreferenceChanged={(item) => { console.log(item) }}
              />

              <SelectCommunicationPreference
                onCommunicationPreferenceChanged={(item) => { console.log(item) }}
              />

              <SelectPartnerTypes
                onPartnerTypesChanged={(item) => { console.log(item) }}
              />

              <SelectOccupations
                question="Do you have any preferences on occupational skills background of your partner?"
                onOccupationsSelected={(items) => { console.log(`selected occupation - ${JSON.stringify(items)}`) }}
              />

              <SelectEducation
                onEducationChanged={(item) => { console.log(item) }}
              />

              <SelectYesNo
                OnYesNoSelected={(item) => { console.log(item) }}
                question="Will you ask to sign NDA?"
              />

              <SelectYesNo
                OnYesNoSelected={(item) => { console.log(item) }}
                question="Will you ask for references & background check?"
              />

              <SelectYesNo
                OnYesNoSelected={(item) => { console.log(item) }}
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
                question="Select up to 5 industries you are interested in."
                onChecked={(values) => {
                  console.log(values)
                }}
              />

              <SelectBusinessStage
                allSelect
                question="What stage of business are you most interested in?"
                onBusinessStageChanged={(item) => { console.log(item) }}
              />

              <SelectOperationMode
                question="Do you prefer business that operates online and/or offline?"
                onBusinessOperationModeChanged={(item) => { console.log(item) }}
              />

              <SelectPartnerTypes
                question="What kind of role are you looking to take on?"
                onPartnerTypesChanged={(item) => { console.log(item) }}
              />

              <SelectWorkArrangementPreference
                onWorkArrangementPreferenceChanged={(item) => { console.log(item) }}
              />

              <SelectLocation
                question="Do you have specific preference on business location? If so, select city/country."
                onBusinessLocationChanged={(item) => { console.log(`selected business location - ${item}`) }}
              />

              <SelectOccupations
                question="Select your occupational skills background."
                maxSelect={5}
                onOccupationsSelected={(items) => { console.log(`selected occupation - ${JSON.stringify(items)}`) }}
              />

              <SelectEducation
                question="What is your highest educational qualification?"
                onEducationChanged={(item) => { console.log(item) }}
              />

              <SelectYesNo
                OnYesNoSelected={(item) => { console.log(item) }}
                question="Will you ask for references & background check?"
              />

              <SelectYesNo
                OnYesNoSelected={(item) => { console.log(item) }}
                question="If requested, will you sign NDA?"
              />

              <SelectYesNo
                OnYesNoSelected={(item) => { console.log(item) }}
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
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
