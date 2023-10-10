import React, { useState, useEffect, useContext } from 'react'
import {
  Alert, View, StyleSheet, useColorScheme
} from 'react-native'
import {
  Text,
} from 'react-native-paper'
import { doc, updateDoc } from 'firebase/firestore'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth'
import Spinner from 'react-native-loading-spinner-overlay'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox'
import Checkbox from '../../components/Checkbox'
import { firestore, auth } from '../../firebase'
import { colors, fontSize } from '../../theme'
import { UserDataContext } from '../../context/UserDataContext'
import { showToast } from '../../utils/ShowToast'
import Avatar from '../../components/Avatar'

const styles = StyleSheet.create({
  progress: {
    alignSelf: 'center',
  },
  // darkprogress: {
  //   alignSelf: 'center',
  //   color: colors.white,
  // },
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
  avatar: {
    margin: 30,
    alignSelf: 'center',
  },
  changePasswordContainer: {
    paddingVertical: 30,
  },
})

export default function Edit() {
  const { userData } = useContext(UserDataContext)
  // const scheme = useColorScheme()
  const navigation = useNavigation()
  const [fullName, setFullName] = useState(userData.fullName)
  const [phone, setFhone] = useState(userData.phone ?? '')
  const [isIntroduced, setIsIntroduced] = useState(userData.isIntroduced)
  const [avatar, setAvatar] = useState(userData.avatar)
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  // const isDark = scheme === 'dark'
  // const colorScheme = {
  //   text: isDark ? colors.white : colors.primaryText,
  //   progress: isDark ? styles.darkprogress : styles.progress,
  // }

  useEffect(() => {
    console.log('Edit screen')
  }, [])

  const profileUpdate = async () => {
    try {
      setSpinner(true)
      const data = {
        id: userData.id,
        email: userData.email,
        fullName,
        avatar: avatar ?? null,
        phone,
        isIntroduced,
      }
      const usersRef = doc(firestore, 'users', userData.id)
      await updateDoc(usersRef, data)
      navigation.goBack()
      setSpinner(false)
    } catch (e) {
      setSpinner(false)
      Alert.alert('Error', e.message)
    }
  }

  const onUpdatePassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', "Passwords don't match.")
      return
    }
    try {
      setSpinner(true)
      const user = auth.currentUser
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      )
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, password)
      showToast({
        title: 'Password changed',
        body: 'Your password has changed.',
        // isDark,
      })
      setCurrentPassword('')
      setPassword('')
      setConfirmPassword('')
    } catch (e) {
      console.log(e)
      Alert.alert('Error', e.message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="never"
      >
        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            onEdited={(item) => setAvatar(item)}
          />
        </View>
        <Text style={styles.field}>Name:</Text>
        <TextInputBox
          placeholder={fullName}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
          label="Full Name"
          icon="user"
        />
        <Text style={styles.field}>Mail:</Text>
        <Text style={styles.title}>
          {userData.email}
        </Text>
        <Text style={styles.field}>Mobile Number:</Text>
        <TextInputBox
          placeholder={phone}
          onChangeText={(text) => setFhone(text)}
          value={phone}
          autoCapitalize="none"
          keyboardType="phone-pad"
          label="Phone"
          icon="phone"
        />
        <Checkbox
          label="Has user been introduced?"
          checked={isIntroduced}
          onChecked={(checked) => {
            setIsIntroduced(checked)
          }}
          // textColor={colorScheme.text}
        />
        <Button
          label="Update"
          color={colors.primary}
          onPress={profileUpdate}
          disable={!fullName}
        />
        <View style={styles.changePasswordContainer}>
          <Text style={styles.field}>
            Change Password:
          </Text>
          <TextInputBox
            secureTextEntry
            placeholder="Current Password"
            onChangeText={(text) => setCurrentPassword(text)}
            value={currentPassword}
            autoCapitalize="none"
            label="Current Password"
            icon="lock"
          />
          <TextInputBox
            secureTextEntry
            placeholder="New Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
            label="New Password"
            icon="lock"
          />
          <TextInputBox
            secureTextEntry
            placeholder="Confirm New Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            autoCapitalize="none"
            label="Confirm Password"
            icon="lock"
          />
          <Button
            label="Change Password"
            color={colors.pink}
            onPress={onUpdatePassword}
            disable={!currentPassword || !password || !confirmPassword}
          />
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
