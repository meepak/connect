import React, { useState, useEffect, useContext } from 'react'
import {
  Alert, Text, View, StyleSheet,
} from 'react-native'
import { doc, updateDoc } from 'firebase/firestore'
// import { Avatar } from '@rneui/themed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox'
import { firestore } from '../../firebase'
import { layout, colors, fontSize } from '../../theme'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import Avatar from '../../components/Avatar'

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
    fontSize: fontSize.xxLarge,
  },
  avatar: {
    margin: 30,
    alignSelf: 'center',
  },
})

export default function Introduce() {
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const [fullName, setFullName] = useState(userData.fullName)
  const [phone, setFhone] = useState(userData.phone ?? '')
  const [avatar, setAvatar] = useState(userData.avatar)
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
        <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>Lets get started by creating your profile.</Text>

        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            onEdited={(item) => setAvatar(item)}
          />
        </View>

        <Text style={[styles.field, { color: colorScheme.text }]}>Name:</Text>
        <TextInputBox
          placeholder={fullName}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
          label="Full Name"
          icon="user"
        />
        <Text style={[styles.field, { color: colorScheme.text }]}>Mail:</Text>
        <Text style={[styles.title, { color: colorScheme.text }]}>
          {userData.email}
        </Text>
        <Text style={[styles.field, { color: colorScheme.text }]}>Mobile Number:</Text>
        <TextInputBox
          placeholder={phone}
          onChangeText={(text) => setFhone(text)}
          value={phone}
          autoCapitalize="none"
          keyboardType="phone-pad"
          label="Phone"
          icon="phone"
        />
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
