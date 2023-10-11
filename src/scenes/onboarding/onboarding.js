import React, { useState, useEffect, useContext } from 'react'
import {
  Alert, View, useColorScheme,
} from 'react-native'
import {
  Surface, SegmentedButtons, Text, Divider,
} from 'react-native-paper'
import { doc, updateDoc } from 'firebase/firestore'
// import { Avatar } from '@rneui/themed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { firestore } from '../../firebase'
import { colors } from '../../theme'
import { UserDataContext } from '../../context/UserDataContext'

import Header from './header'
import WhoAmI from './whoami'
import SelectIndustries from './industries'
import SelectBusinessStage from './businessstage'
import SelectOperationMode from './operationmode'
import SelectLocation from './location'

import styles from './styles'

const ScreenAboutPartnerParticipation = () => {
  const [shouldSignNda, setShouldSignNda] = useState(false)
  const [requireBackgroundCheck, setRequireBackgroundCheck] = useState(false)
  const [partnerAvailability, setPartnerAvailability] = useState(false)
  return (
    <View>
      <Text style={styles.greetingMessage}>
        Will your partner require to sign NDA?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={shouldSignNda}
        onValueChange={(text) => {
          setShouldSignNda(text)
        }}
        buttons={[
          {
            value: 'yes',
            label: 'Yes',
          },
          {
            value: 'no',
            label: 'No',
          },
        ]}
      />

      <Text style={styles.greetingMessage}>
        Will you be requesting ID Verification and background check?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={requireBackgroundCheck}
        onValueChange={(text) => {
          setRequireBackgroundCheck(text)
        }}
        buttons={[
          {
            value: 'yes',
            label: 'Yes',
          },
          {
            value: 'no',
            label: 'No',
          },
        ]}
      />

      <Text style={styles.greetingMessage}>
        When do you want the partner to join your business?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={partnerAvailability}
        onValueChange={(text) => {
          setPartnerAvailability(text)
        }}
        buttons={[
          {
            value: 'asap',
            label: 'ASAP',
          },
          {
            value: '1 month',
            label: 'Within 1 mth',
          },
          {
            value: '1 Month+',
            label: '1 Month+',
          },
        ]}
      />

      <Text style={styles.greetingMessage}>
        What is your communication preference?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={partnerAvailability}
        onValueChange={(text) => {
          setPartnerAvailability(text)
        }}
        buttons={[
          {
            value: 'online/phone',
            label: 'Online/Phone',
          },
          {
            value: 'in-person',
            label: 'In Person',
          },
          {
            value: 'flexible',
            label: 'Flexible',
          },
        ]}
      />

      <Text style={styles.greetingMessage}>
        What is your location preference?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={partnerAvailability}
        onValueChange={(text) => {
          setPartnerAvailability(text)
        }}
        buttons={[
          {
            value: 'onsite',
            label: 'Onsite',
          },
          {
            value: 'remote',
            label: 'Remote',
          },
          {
            value: 'flexible',
            label: 'Flexible',
          },
        ]}
      />

    </View>
  )
}

const ScreenAboutPartner = () => {
  const [shouldSignNda, setShouldSignNda] = useState(false)
  const [requireBackgroundCheck, setRequireBackgroundCheck] = useState(false)
  const [partnerAvailability, setPartnerAvailability] = useState(false)
  return (
    <View>

      <Text style={styles.greetingMessage}>
        What is your availablity?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={partnerAvailability}
        onValueChange={(text) => {
          setPartnerAvailability(text)
        }}
        buttons={[
          {
            value: 'asap',
            label: 'ASAP',
          },
          {
            value: '1 month',
            label: 'Within 1 mth',
          },
          {
            value: '1 Month+',
            label: '1 Month+',
          },
        ]}
      />

      <Text style={styles.greetingMessage}>
        What is your communication preference?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={partnerAvailability}
        onValueChange={(text) => {
          setPartnerAvailability(text)
        }}
        buttons={[
          {
            value: 'online/phone',
            label: 'Online/Phone',
          },
          {
            value: 'in-person',
            label: 'In Person',
          },
          {
            value: 'flexible',
            label: 'Flexible',
          },
        ]}
      />

      <Text style={styles.greetingMessage}>
        What is your location preference?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={partnerAvailability}
        onValueChange={(text) => {
          setPartnerAvailability(text)
        }}
        buttons={[
          {
            value: 'onsite',
            label: 'Onsite',
          },
          {
            value: 'remote',
            label: 'Remote',
          },
          {
            value: 'flexible',
            label: 'Flexible',
          },
        ]}
      />

      <Text style={styles.greetingMessage}>
        Will your partner require to sign NDA?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={shouldSignNda}
        onValueChange={(text) => {
          setShouldSignNda(text)
        }}
        buttons={[
          {
            value: 'yes',
            label: 'Yes',
          },
          {
            value: 'no',
            label: 'No',
          },
        ]}
      />

      <Text style={styles.greetingMessage}>
        Will you be requesting ID Verification and background check?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        // theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        // textColor={colorScheme.text}
        value={requireBackgroundCheck}
        onValueChange={(text) => {
          setRequireBackgroundCheck(text)
        }}
        buttons={[
          {
            value: 'yes',
            label: 'Yes',
          },
          {
            value: 'no',
            label: 'No',
          },
        ]}
      />

    </View>
  )
}

export default function Onboarding() {
  const { userData } = useContext(UserDataContext)
  const scheme = useColorScheme()
  const [avatar, setAvatar] = useState(userData.avatar)
  const [whoAmI, setWhoAmI] = useState()
  const [fullName, setFullName] = useState(userData.fullName)
  const [phone, setFhone] = useState(userData.phone ?? '')
  const [spinner, setSpinner] = useState(false)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark ? colors.white : colors.primaryText,
    progress: isDark ? styles.darkprogress : styles.progress,
  }

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
          whoAmI={whoAmI}
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
                businessStage=""
                onBusinessStageChanged={(item) => { console.log(item) }}
              />

              <SelectOperationMode
                businessOperationMode=""
                onBusinessOperationModeChanged={(item) => { console.log(item) }}
                // colorScheme={colorScheme}
              />

              <SelectLocation
                businessLocation=""
                onBusinessLocationChanged={(item) => { console.log(item) }}
              />

              <ScreenAboutPartnerParticipation
                colorScheme={colorScheme}
              />
            </>
          )
          : <></>}
        {whoAmI === 'associate'
          ? <ScreenAboutPartner colorScheme={colorScheme} />
          : <></>}

        <Button
            label="Update"
            color={colors.primary}
            onPress={profileUpdate}
            disable={!fullName}
        />
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
