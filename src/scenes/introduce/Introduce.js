import React, { useState, useEffect, useContext } from 'react'
import {
  Alert, Text, View, StyleSheet,
} from 'react-native'
import { doc, updateDoc } from 'firebase/firestore'
// import { Avatar } from '@rneui/themed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import { SegmentedButtons } from 'react-native-paper'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox'
import RadioButtonGroup from '../../components/RadioButtonGroup'
import { firestore } from '../../firebase'
import { layout, colors, fontSize } from '../../theme'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import Avatar from '../../components/Avatar'
import CheckboxGroup from '../../components/CheckboxGroup'

const styles = StyleSheet.create({
  progress: {
    alignSelf: 'center',
  },
  darkprogress: {
    alignSelf: 'center',
    color: colors.white,
  },
  main: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
  greeting: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginBottom: layout.marginBottom,
    paddingTop: 20,
    fontSize: fontSize.xxxLarge,
    fontWeight: 'bold',
  },
  greetingMessage: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginBottom: layout.marginBottom,
    fontSize: fontSize.xLarge,
  },
  avatar: {
    margin: 30,
    alignSelf: 'center',
  },
  segmentedButtons: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginBottom: layout.marginBottom,
  },
})

const ScreenWhoAmI = ({
  whoAmI, onWhoAmIChanged, onAvatarChanged, colorScheme,
}) => (
  <View>
    <View style={styles.avatar}>
      <Avatar
        size="xlarge"
        onEdited={(item) => onAvatarChanged(item)}
      />
    </View>

    <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
      What describes you best?
    </Text>

    <RadioButtonGroup
      items={[
        {
          id: 1,
          text: 'I am a founder, looking for associates',
          value: 'founder',
          checked: whoAmI === 'founder',
        },
        {
          id: 2,
          text: 'I want to be an associate of a business',
          value: 'associate',
          checked: whoAmI === 'associate',
        },
      ]}
      textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
      onChecked={(value) => {
        onWhoAmIChanged(value)
      }}
    />
  </View>
)

const industries = [
  'Agriculture and Agribusiness',
  'Manufacturing',
  'Energy and Utilities',
  'Information Technology (IT) and Software',
  'Healthcare and Pharmaceuticals',
  'Financial Services and Banking',
  'Transportation and Logistics',
  'Retail and Consumer Goods',
  'Real Estate and Construction',
  'Education and Training',
]

const ScreenSelectIndustry = ({
  maxSelect = 3, colorScheme, onChecked, checked,
}) => (
  <View>
    <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
      {maxSelect > 1 ? `Select up to ${maxSelect} related industries.` : 'Select your industry.'}
    </Text>
    <CheckboxGroup
      items={industries.map((industry, index) => ({
        id: index + 1,
        text: industry,
        value: industry,
        checked: checked && checked.isArray() ? checked.includes(industry) : false,
      }))}
      maxSelect={maxSelect}
      textColor={colorScheme.text}
      onChecked={onChecked || (() => {})}
    />
  </View>
)

const businessStages = [
  'Idea',
  'Startup',
  'Growth',
  'Established',
  'Scaling',
  'Exit',
]

const ScreenSelectBusinessStage = ({
  businessStage, onBusinessStageChanged, colorScheme,
}) => (
  <View>

    <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
      What stage is your business in?
    </Text>

    <RadioButtonGroup
      items={businessStages.map((stage, index) => ({
        id: index + 1,
        text: stage,
        value: stage,
        checked: businessStage === stage,
      }))}
      textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
      onChecked={(value) => {
        onBusinessStageChanged(value)
      }}
    />
  </View>
)

// TODO -- geolocation autocomplete
const ScreenBusinessLocation = ({
  businessLocation, businessOperationMode, onBusinessLocationChanged, onBusinessOperationModeChanged, colorScheme,
}) => {
  const [location, setLocation] = useState(businessLocation)
  const [operationMode, setOperationMode] = useState(businessOperationMode)
  return (
    <View>
      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        Where is your business located?
      </Text>

      <TextInputBox
        placeholder="City, Country"
        onChangeText={(text) => {
          setLocation(text)
          onBusinessLocationChanged(text)
        }}
        value={location}
        autoCapitalize="none"
        label="Business Location"
        icon="user"
      />
      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        What is the mode of operation of your business?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
        value={operationMode}
        onValueChange={(text) => {
          setOperationMode(text)
          onBusinessOperationModeChanged(text)
        }}
        buttons={[
          {
            value: 'online',
            label: 'Online Only',
          },
          {
            value: 'offline',
            label: 'Offline only',
          },
          { value: 'both', label: 'Both' },
        ]}
      />

    </View>
  )
}

const ScreenAboutPartnerParticipation = (colorScheme) => {
  const [shouldSignNda, setShouldSignNda] = useState(false)
  const [requireBackgroundCheck, setRequireBackgroundCheck] = useState(false)
  const [partnerAvailability, setPartnerAvailability] = useState(false)
  return (
    <View>
      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        Will your partner require to sign NDA?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        Will you be requesting ID Verification and background check?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        When do you want the partner to join your business?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        What is your communication preference?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        What is your location preference?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

const ScreenAboutPartner = (colorScheme) => {
  const [shouldSignNda, setShouldSignNda] = useState(false)
  const [requireBackgroundCheck, setRequireBackgroundCheck] = useState(false)
  const [partnerAvailability, setPartnerAvailability] = useState(false)
  return (
    <View>

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        What is your availablity?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        What is your communication preference?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        What is your location preference?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        Will your partner require to sign NDA?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        Will you be requesting ID Verification and background check?
      </Text>
      <SegmentedButtons
        style={styles.segmentedButtons}
        theme={{ colors: { primary: colorScheme.text, primaryContainer: 'red', secondaryContainer: colors.primary } }}
        textColor={colorScheme.text}
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

export default function Introduce() {
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
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
        isIntroduced: !userData.isIntroduced,
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
        <Text style={[styles.greeting, { color: colorScheme.text }]}>Welcome {userData.fullName},</Text>
        <Text style={[styles.greetingMessage, { color: colorScheme.text, fontStyle: 'italic' }]}>Lets get started with minimum information needed to find you a match.</Text>

        <ScreenWhoAmI
          whoAmI={whoAmI}
          onAvatarChanged={(item) => setAvatar(item)}
          onWhoAmIChanged={(item) => setWhoAmI(item)}
          colorScheme={colorScheme}
        />

        {whoAmI === 'founder'
          ? (
            <>
              <ScreenSelectIndustry
                maxSelect={3}
                colorScheme={colorScheme}
                onChecked={(values) => {
                  console.log(values)
                }}
              />

              <ScreenSelectBusinessStage
                businessStage=""
                onBusinessStageChanged={(item) => { console.log(item) }}
                colorScheme={colorScheme}
              />

              <ScreenBusinessLocation
                businessLocation=""
                onBusinessLocationChanged={(item) => { console.log(item) }}
                businessOperationMode=""
                onBusinessOperationModeChanged={(item) => { console.log(item) }}
                colorScheme={colorScheme}
              />

              <ScreenAboutPartnerParticipation
                colorScheme={colorScheme}
              />
            </>
          )
          : <ScreenAboutPartner colorScheme={colorScheme} />}

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
