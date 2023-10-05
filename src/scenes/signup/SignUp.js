import React, { useState, useContext, useEffect } from 'react'
import {
  Alert, Text, StyleSheet, View, Linking,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setDoc, doc } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import ScreenTemplate from '../../components/ScreenTemplate'
import TextInputBox from '../../components/TextInputBox'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { firestore, auth } from '../../firebase'
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { defaultAvatar, eulaLink } from '../../config'

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
  link: {
    textAlign: 'center',
  },
  eulaLink: {
    color: colors.blueLight,
    fontSize: fontSize.middle,
  },
})

export default function SignUp() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark ? colors.white : colors.primaryText,
  }

  useEffect(() => {
    console.log('Sign Up screen')
  }, [])

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
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
      console.log(`sending verification email for -- ${JSON.stringify(user)}`)
      await sendEmailVerification(auth.currentUser)
      console.log('---------------')
      const data = {
        id: user.uid,
        email,
        fullName,
        avatar: defaultAvatar,
      }
      const usersRef = doc(firestore, 'users', user.uid)
      await setDoc(usersRef, data)
    } catch (e) {
      setSpinner(false)
      Alert.alert('Error', e.message)
    }
    setSpinner(false)
    navigation.navigate('Login')
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="never"
      >
        <Logo />
        <TextInputBox
          placeholder="Your Name"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
        />
        <TextInputBox
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInputBox
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <TextInputBox
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
        />
        <Button
          label="Agree and Create account"
          color={colors.primary}
          onPress={() => onRegisterPress()}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
        <Text style={[styles.link, { color: colorScheme.text }]} onPress={() => { Linking.openURL(eulaLink) }}>Require agree <Text style={styles.eulaLink}>EULA</Text></Text>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
