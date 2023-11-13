import React, {
  useState, // useRef,
} from 'react'
import {
  View, StyleSheet, LogBox, StatusBar,
} from 'react-native'
import { Text, useTheme, Button } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { doc, getDoc } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { signOut, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { firestore, auth } from '../../firebase'
import ScreenTemplate from '../../components/ScreenTemplate'
// import Button from '../../components/core/Button'
import TextInputBox from '../../components/core/TextInputBox'
// import Logo from '../../components/core/Logo'
import { isValidEmail } from '../../utils/validation'
// import { UserDataContext } from '../../context/UserDataContext'
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
  submitButton: {
    backgroundColor: colors.primaryContainer,
    color: colors.onPrimaryContainer,
    marginHorizontal: 40,
  },
  submitButtonText: {
    color: colors.onPrimaryContainer,
  },
  text: {
    fontSize: fonts.bodyLarge.fontSize,
  },
  socialButton: {
    // backgroundColor: colors.primaryContainer,
    color: colors.onPrimaryContainer,
    marginHorizontal: 40,
    marginBottom: 20,
  },
  socialButtonText: {
    color: colors.onPrimaryContainer,
  },
  footer: {
    marginBottom: 15,
  },
  verificatonView: {
    marginHorizontal: 20,
  },
})

// To ignore a useless warning in terminal.
// https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
LogBox.ignoreLogs(['Setting a timer'])

// TODO -- THERE IS A BUG IN LOGIN WHERE AFTER REGISTRATION, IT DOESN'T LET USER LOGIN TILL APP IS RESTARTED
export default function Login() {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const [email, setEmail] = useState('k@k.com')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('kkkkkk')
  const [passwordError, setPasswordError] = useState('')
  const [spinner, setSpinner] = useState(false)
  const styles = Styles(colors, fonts)

  const gotoSignup = () => {
    navigation.navigate('Sign up')
  }

  const onSendVerificationLinkPress = async () => {
    await sendEmailVerification(auth.currentUser)
  }

  const onLoginPress = async () => {
    try {
      // emailTextInput.current.focus()
      // validation starts
      if (email === '') {
        setEmailError('Please enter your email')
        return
      }

      if (emailError !== '') {
        // console.log(email)
        if (isValidEmail(email)) {
          // console.log('email is valid')
          setEmailError('')
        } else {
          // console.log('email is IN valid')
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
      // sign out and sign in again
      signOut(auth)
      const response = await signInWithEmailAndPassword(auth, email, password)
      const { user } = response
      const usersRef = doc(firestore, 'users', user.uid)
      const firestoreDocument = await getDoc(usersRef)
      // console.log(firestoreDocument)
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
      // console.log(error.message)
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
        keyboardShouldPersistTaps="never"
        // enableOnAndroid
      >
        <Text style={styles.title}>Sign in</Text>

        {auth.currentUser && !auth.currentUser.emailVerified
          ? (
            <>
              <View style={styles.verificatonView}>
                <Text style={styles.text}>Thank you for signing up!</Text>
                <Text style={styles.text}>Verification email is sent to {auth.currentUser.email}</Text>
                <Text style={styles.text}>Please follow the email to proceed.</Text>
                <TextAndLink
                  text="Can't find the email? Please check spam folders or"
                  link="Resend Verification Email"
                  onPress={() => onSendVerificationLinkPress()}
                  marginTop={10}
                  alignSelf="flex-start"
                />
              </View>
            </>
          ) : <></>}
        <TextInputBox
          icon="mail"
          autoFocus
          label="Email"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          value={email}
          keyboardType="email-address"
          errorMessage={emailError}
          onEndEditing={() => {
            let error = ''
            if (email !== '') {
              error = isValidEmail(email) ? '' : 'Invalid E-mail'
            }
            setEmailError(error)
          }}
          onClear={() => setEmail()}
        />
        <TextInputBox
          icon="lock"
          secureTextEntry
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          errorMessage={passwordError}
          onEndEditing={() => {
            if (password !== '') {
              setPasswordError('')
            }
          }}
        />

        <TextAndLink
          text="Forgot password?"
          link="Reset"
          onPress={() => gotoSignup()}
          marginTop={0}
          marginBottom={30}
        />

        <Button
          onPress={() => onLoginPress()}
          mode="contained"
          style={styles.submitButton}
          icon="sign-in"
          textColor={colors.onPrimaryContainer}
        >
          <Text style={styles.submitButtonText}>Sign in</Text>
        </Button>

        <TextAndLink
          text="Don&apos;t have an account?"
          link="Sign up"
          onPress={() => gotoSignup()}
          marginTop={30}
        />

        <SocialButtons label="Sign in" />

      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onBackground }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
