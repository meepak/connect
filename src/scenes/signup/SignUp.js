import React, { useState } from 'react'
import {
  Alert, StyleSheet, View, Linking, useColorScheme,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import ScreenTemplate from '../../components/ScreenTemplate'
import TextInputBox from '../../components/core/TextInputBox'
import Button from '../../components/core/Button'
import Logo from '../../components/core/Logo'
import { firestore, auth } from '../../firebase'
import { eulaLink } from '../../config'
import { isValidEmail } from '../../utils/validation'

export default function SignUp() {
  const [fullName, setFullName] = useState('')
  const [nameError] = useState('') // setNameError
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError] = useState('') // setPasswordError
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()

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
      fontSize: fonts.bodyLarge.fontSize,
    },
    footerLink: {
      color: colors.primary,
      fontWeight: 'bold',
      fontSize: fonts.bodyLarge.fontSize,
    },
    link: {
      textAlign: 'center',
    },
    eulaLink: {
      color: colors.primary,
      fontSize: fonts.bodyLarge.fontSize,
    },
  })

  const onFooterLinkPress = () => {
    navigation.navigate('Sign in')
  }

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match.")
      return
    }
    try {
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
      Alert.alert('Error', e.message)
    }
    setSpinner(false)
    navigation.navigate('Sign in')
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="handled"
        // enableOnAndroid
      >
        <Logo />
        <TextInputBox
          label="Full Name"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
          icon="person"
          errorMessage={nameError}
        />
        <TextInputBox
          label="E-mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          icon="mail"
          errorMessage={emailError}
          onEndEditing={() => {
            // console.log('blurred email')
            let error = ''
            if (email !== '') {
              error = isValidEmail(email) ? '' : 'Invalid E-mail'
            }
            setEmailError(error)
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
        />
        <TextInputBox
          secureTextEntry
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
          icon="lock"
          errorMessage={confirmPasswordError}
          onEndEditing={() => {
            setConfirmPasswordError(password !== confirmPassword ? 'Password didnot match.' : '')
          }}
        />
        <Button
          label="Agree and Create account"
          color={colors.primary}
          onPress={() => onRegisterPress()}
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
        <Text style={styles.link} onPress={() => { Linking.openURL(eulaLink) }}>By signing up, you agree to our <Text style={styles.eulaLink}>Terms & Conditions.</Text></Text>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
