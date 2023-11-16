import React, { useState, useContext } from 'react'
import {
  Alert, View, StyleSheet, Platform,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { firestore, auth } from '../../firebase'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
import TextInputBox from '../../components/core/TextInputBox'
import Checkbox from '../../components/core/Checkbox'
import { UserDataContext } from '../../context/UserDataContext'
import { showToast } from '../../utils/ShowToast'
import AvatarOfAuthUser from '../../components/AvatarOfAuthUser'
// import mergeJsonObjects from '../../utils/functions'

export default function Edit() {
  const { colors, fonts } = useTheme()
  const { userData } = useContext(UserDataContext)
  const navigation = useNavigation()

  const [fullName, setFullName] = useState(userData.fullName)
  const [phone, setFhone] = useState(userData.phone ?? '')
  const [isOnboarded, setisOnboarded] = useState(userData.isOnboarded)
  const [avatar, setAvatar] = useState(userData.avatar)
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [spinner, setSpinner] = useState(false)

  const styles = StyleSheet.create({
    progress: {
      alignSelf: 'center',
    },
    main: {
      flex: 1,
      width: '100%',
    },
    title: {
      fontSize: fonts.titleMedium.fontSize,
      marginBottom: 20,
      textAlign: 'center',
    },
    field: {
      fontSize: fonts.bodyLarge.fontSize,
      textAlign: 'center',
    },
    avatar: {
      flex: 1,
      alignSelf: 'center',
    },
    changePasswordContainer: {
      paddingVertical: 30,
      marginBottom: Platform.OS === 'android' ? 50 : 30,
    },
  })

  const profileUpdate = async () => {
    try {
      setSpinner(true)
      const data = {
        id: userData.id,
        email: userData.email,
        fullName,
        phone,
        isOnboarded,
        avatar: avatar ?? null,
        updatedAt: serverTimestamp(),
      }
      const usersRef = doc(firestore, 'users', userData.id)
      await updateDoc(usersRef, data)
      // const updatedUserData = mergeJsonObjects(userData, data)
      // setUserData(updatedUserData)
      setSpinner(false)
      if (isOnboarded) {
        // we don't want goBack to trigger at onboarding screen
        navigation.goBack()
      }
    } catch (e) {
      setSpinner(false)
      Alert.alert('Error at profile update', e.message)
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
        // enableOnAndroid
        stickyHeaderIndices={[0]} // IMPORTANT THIS WILL PROVIDE WITH STICKY HEADER EASILY
        stickyHeaderHiddenOnScroll // IMPORTANT THIS WILL PROVIDE WITH STICKY HEADER EASILY
      >
        <View style={styles.avatar}>
          <AvatarOfAuthUser
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
          icon="person"
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
          icon="device-mobile"
        />
        <Checkbox
          label="Has user been onboarded?"
          checked={isOnboarded}
          onChecked={(checked) => {
            setisOnboarded(checked)
          }}
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
            color={colors.tertiary}
            onPress={onUpdatePassword}
            disable={!currentPassword || !password || !confirmPassword}
          />
        </View>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
