import React, {
  useState, useContext, useEffect, // useRef,
} from 'react'
import {
  Alert, View, StyleSheet, LogBox, useColorScheme
} from 'react-native'
import { Text } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { doc, getDoc } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { firestore, auth } from '../../firebase'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox'
import Logo from '../../components/Logo'
import { colors, fontSize } from '../../theme'
import isValidEmail from '../../utils/validation'
// import { UserDataContext } from '../../context/UserDataContext'

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
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [spinner, setSpinner] = useState(false)
  // const emailTextInput = useRef()
  const navigation = useNavigation()
  const { scheme } = useColorScheme()
  // const { userData } = useContext(UserDataContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark ? colors.white : colors.primaryText,
  }

  const onFooterLinkPress = () => {
    navigation.navigate('Sign up')
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
      // emailTextInput.current.focus()
      // validation starts
      if (email === '') {
        setEmailError('Please enter your email')
        return
      }

      if (emailError !== '') {
        console.log(email)
        if (isValidEmail(email)) {
          console.log('email is valid')
          setEmailError('')
        } else {
          console.log('email is IN valid')
          return
        }
      }
      if (password === '') {
        setPasswordError('Please enter your password')
        return
      }
      setPasswordError('')
      // valiation ends

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
        setEmailError('Error', 'User does not exist anymore.')
        return
      }
    } catch (error) {
      console.log(error.message)
      setSpinner(false)
      // Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).

      if (error.message.includes('too-many-requests')) {
        setEmailError('Too man authentication failure') // error.message
        setPasswordError('Please try again later or reset your password.')
      } else {
        setEmailError('Please recheck your email') // error.message
        setPasswordError('Please recheck your password')
      }
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
          // ref={emailTextInput}
          icon="envelope"
          autoFocus
          // placeholder="E-mail"
          label="E-mail"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          value={email}
          keyboardType="email-address"
          errorMessage={emailError}
          onEndEditing={() => {
            console.log('blurred email')
            let error = ''
            if (email !== '') {
              error = isValidEmail(email) ? '' : 'Invalid E-mail'
            }
            setEmailError(error)
          }}
        />
        <TextInputBox
          icon="lock"
          secureTextEntry
          // placeholder="Password "
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          errorMessage={passwordError}
          onEndEditing={() => {
            console.log('blurred password')
            if (password !== '') {
              setPasswordError('')
            }
          }}
        />
        <Button
          label="Log in"
          color={colors.primary}
          onPress={() => onLoginPress()}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>Don&apos;t have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
          <Text style={[{ color: colorScheme.text }]}>OR</Text>
        </View>

        <Button
          label="Sign in with LinkedIn"
          color={colors.primary}
          onPress={() => {}}
        />

        <Button
          label="Sign in with Google"
          color={colors.primary}
          onPress={() => {}}
        />

        <Button
          label="Sign in with Facebook"
          color={colors.primary}
          onPress={() => {}}
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
