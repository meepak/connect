import React, { useState } from 'react'
import {
  View, StatusBar, StyleSheet,
} from 'react-native'
import { Text, useTheme, Button } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import ScreenTemplate from '../../components/ScreenTemplate'
import TextInputBox from '../../components/core/TextInputBox'
import TermsAndCondition from '../../components/TermsAndCondition'
// import Logo from '../../components/core/Logo'
import { firestore, auth } from '../../firebase'
import { isValidEmail, isValidName, isPasswordComplex } from '../../utils/validation'
import SocialButtons from './social'
import TextAndLink from '../../components/TextAndLink'

const Styles = (colors, fonts) => StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fonts.displaySmall.fontSize,
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  error: {
    color: colors.error,
    marginHorizontal: 20,
  },
  submitButton: {
    backgroundColor: colors.primaryContainer,
    color: colors.onPrimaryContainer,
    marginHorizontal: 40,
  },
  submitButtonText: {
    color: colors.onPrimaryContainer,
  },
  footer: {
    marginBottom: 15,
  },
})

const SignUp = () => {
  const [showTnc, setShowTnc] = useState(false)
  const [fullName, setFullName] = useState('')
  const [fullNameError, setFullNameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState()
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)

  const gotoSignin = () => {
    navigation.navigate('Sign in')
  }

  const validate = () => {
    if (!fullName) {
      setFullNameError('Required')
      return false
    }
    if (fullNameError) return false

    if (!email) {
      setEmailError('Required')
      return false
    }
    if (emailError) return false

    if (!password) {
      setPasswordError('Required')
      return false
    }
    if (passwordError) return false

    return true
  }

  const onRegisterPress = async () => {
    try {
      if (!validate()) return

      setSpinner(true)
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const { user } = response
      // Send an email verification email
      // console.log(`sending verification email for -- ${JSON.stringify(user)}`)
      await sendEmailVerification(auth.currentUser)
      // console.log('---------------')
      const data = {
        id: user.uid,
        email,
        fullName,
        createdAt: serverTimestamp(),
        // avatar: null, // do not assign default avatar,
      }
      const usersRef = doc(firestore, 'users', user.uid)
      await setDoc(usersRef, data)
    } catch (e) {
      setSpinner(false)
      setError(e.message.replace('Firebase: ', ''))
      return
    }
    // signed up, clear the form
    setFullName()
    setFullNameError(null)
    setEmail()
    setEmailError()
    setPassword()
    setPasswordError()
    setError()
    setSpinner(false)
    // Let's redirect to login page
    // & sign in automatically & it will be stuck
    // at email need verification message
    navigation.navigate('Sign in')
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="never"
      // enableOnAndroid
      >
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.error}>{error}</Text>
        <TextInputBox
          label="Full name"
          value={fullName}
          autoCapitalize="none"
          icon="person"
          errorMessage={fullNameError}
          onChangeText={(name) => {
            setFullName(name)
            const msg = !isValidName(name)
              ? 'Invalid name, only letters and spaces are alllowed.'
              : ''
            setFullNameError(msg)
          }}
          onClear={() => {
            setFullName()
            setFullNameError()
          }}
        />
        <TextInputBox
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          icon="mail"
          errorMessage={emailError}
          onEndEditing={() => {
            const msg = email && !isValidEmail(email)
              ? 'Invalid email'
              : ''
            setEmailError(msg)
          }}
          onClear={() => {
            setEmail()
            setEmailError()
          }}
        />
        <TextInputBox
          secureTextEntry
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          icon="lock"
          errorMessage={passwordError}
          onEndEditing={() => {
            const msg = password && !isPasswordComplex(password)
              ? 'Password not complex'
              : ''
            setPasswordError(msg)
          }}
        />

        <TextAndLink
          text="By signing up, you agree to our"
          link="Terms and Conditions."
          onPress={() => setShowTnc(true)}
          marginTop={0}
        />

        <Button
          onPress={() => onRegisterPress()}
          mode="contained"
          style={styles.submitButton}
          icon="rocket"
          textColor={colors.onPrimaryContainer}
        >
          <Text style={styles.submitButtonText}>Create account</Text>
        </Button>

        <TextAndLink
          text="Already got an account?"
          link="Log in"
          onPress={() => gotoSignin()}
          marginTop={30}
          marginBottom={30}
        />

        <SocialButtons label="Sign up" />

        <View style={styles.footer} />

      </KeyboardAwareScrollView>

      <TermsAndCondition show={showTnc} onClose={() => { setShowTnc(false) }} />
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}

export default SignUp
