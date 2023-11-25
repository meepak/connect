import React, {
  useState, // useRef,
} from 'react'
import {
  View, StyleSheet,
} from 'react-native'
import {
  Text, useTheme, Button, IconButton,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { doc, getDoc } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { signOut, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useAtom } from 'jotai'
import { firestore, auth } from '../../firebase'
import { ScreenTemplate } from '../../components/templates'
import TextInputBox from '../../components/core/text-input-box'
// import Logo from '../../components/core/Logo'
import { isValidEmail } from '../../utils/validation'
import SocialButtons from './social'
import TextAndLink from '../../components/text-and-link'
import userAuthenticatedAtom from '../../utils/atom'
import RenderCounter from '../../components/render-counter'

const Styles = (colors, fonts) => StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 65,
    marginBottom: 20,
  },
  title: {
    fontSize: fonts.displaySmall.fontSize,
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
  verificationView: {
    marginHorizontal: 20,
  },
})

export default function Login() {

  const [, setUserAuthenticated] = useAtom(userAuthenticatedAtom)
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const [email, setEmail] = useState(process.env.EXPO_PUBLIC_DEVELOPMENT_MODE === 'true' ? 'k@k.com' : '')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState(process.env.EXPO_PUBLIC_DEVELOPMENT_MODE === 'true' ? 'kkkkkk' : '')
  const [passwordError, setPasswordError] = useState('')
  const [spinner, setSpinner] = useState(false)
  const styles = Styles(colors, fonts)

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
      // validation ends

      setSpinner(true)
      // sign out and sign in again
      signOut(auth)
      const response = await signInWithEmailAndPassword(auth, email, password)
      const { user } = response
      const usersRef = doc(firestore, 'users', user.uid)
      const firestoreDocument = await getDoc(usersRef)
      if (!firestoreDocument.exists) {
        setEmailError('Error', 'User does not exist anymore.')
        return
      }
      setUserAuthenticated(() => true) // this should trigger useEffect in route to initiate login
      // console.log('we got our user, is authenticated atom  true - ', userAuthenticated)
      setSpinner(false)
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
        keyboardShouldPersistTaps="never"
        // enableOnAndroid
      >
        <View style={styles.titleContainer}>
          <IconButton
            icon="chevron-left"
            color={colors.onBackground}
            size={32}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Sign in</Text>
          <RenderCounter />
        </View>

        {auth.currentUser && !auth.currentUser.emailVerified
          ? (
            <>
              <View style={styles.verificationView}>
                <TextAndLink
                  texts={[
                    'Thanks for signing up!',
                    `Verification email sent to ${auth.currentUser.email}.`,
                    'Follow instructions to verify and log in.',
                    'Can\'t find the email?',
                    'Please check spam folders.',
                  ]}
                  link="Resend Verification Email"
                  onPress={() => onSendVerificationLinkPress()}
                  marginTop={10}
                  marginBottom={10}
                  marginHorizontal={10}
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
          texts={['Forgot password?']}
          link="Reset"
          onPress={() => {}}
          marginTop={0}
          marginBottom={20}
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
          texts={['Don\'t have an account?']}
          link="Sign up"
          onPress={() => navigation.navigate('Sign up')}
          marginTop={20}
          marginBottom={30}
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
