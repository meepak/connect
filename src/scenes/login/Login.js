import React, { useState, useContext, useEffect } from 'react'
import {
  Alert, Text, View, StyleSheet, LogBox,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { doc, getDoc } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { firestore, auth } from '../../firebase/config'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox'
import Logo from '../../components/Logo'
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { UserDataContext } from '../../context/UserDataContext'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: fontSize.large,
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
})

// To ignore a useless warning in terminal.
// https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
LogBox.ignoreLogs(['Setting a timer'])

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()
  const { scheme } = useContext(ColorSchemeContext)
  const { userData } = useContext(UserDataContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark ? colors.white : colors.primaryText,
  }

  const onFooterLinkPress = () => {
    navigation.navigate('Registration')
  }

  const onSendVerificationLinkPress = async () => {
    await sendEmailVerification(auth.currentUser)
    Alert.alert('Info', 'Email verification link sent.')
  }

  useEffect(() => {
    console.log('Login screen')
  }, [])

  const onLoginPress = async () => {
    try {
      setSpinner(true)
      const response = await signInWithEmailAndPassword(auth, email, password)
      const { user } = response
      const usersRef = doc(firestore, 'users', user.uid)
      const firestoreDocument = await getDoc(usersRef)
      console.log(firestoreDocument)
      /*
      {"_converter": null, "_document": null, "_firestore": {"app": [FirebaseAppImpl], "databaseId": [Dt], "settings": [lc]},
      "_firestoreImpl": {"app": [FirebaseAppImpl], "databaseId": [Dt], "settings": [lc]},
      "_key": {"path": {"len": 2, "offset": 0, "segments": [Array]}}, "_userDataWriter": {"firestore": [Object]},
      "metadata": {"fromCache": false, "hasPendingWrites": false}}

      */
      setSpinner(false)
      if (!firestoreDocument.exists) {
        Alert.alert('Error', 'User does not exist anymore.')
        return
      }
    } catch (error) {
      setSpinner(false)
      Alert.alert('Error', error.message)
    }
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <Logo />

        {auth.currentUser && !auth.currentUser.emailVerified
          ? (
            <View style={styles.footerView}>
              <Text style={[styles.footerText, { color: colorScheme.text }]}>Email Address is not verified.</Text>
              <Text onPress={onSendVerificationLinkPress} style={styles.footerLink}>Send Verification Email</Text>
            </View>
          ) : <></>}
        <TextInputBox
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          value={email}
          keyboardType="email-address"
        />
        <TextInputBox
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <Button
          label="Log in"
          color={colors.primary}
          onPress={() => onLoginPress()}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>Don&apos;t have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
