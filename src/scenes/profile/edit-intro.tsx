import React, {
  useState, useContext, useCallback, useRef,
} from 'react'
import {
  View, StyleSheet, Keyboard,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'

import { ScreenTemplate } from '../../components/templates'
import TextInputBox from '../../components/core/text-input-box'
// import storage from '../../utils/Storage'
// TODO FIGURE THIS OUT WITH ASYNC-STORAGE & UPDATE UTILS/STORAGE
import { UserDataContext } from '../../context'
import { isValidName, isValidLength } from '../../utils/validation'
import { HeaderProfile } from '../../components/header'
import SheetModal from '../../components/core/sheet-modal'

export default function EditIntro() {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const { userData } = useContext(UserDataContext)
  const [fullName, setFullName] = useState(userData.fullName)
  const [fullNameError, setFullNameError] = useState('')
  const [nickName, setNickName] = useState('')
  const [nickNameError, setNickNameError] = useState('')
  const [pronouns] = useState('')
  const [headLine, setHeadLine] = useState('')
  const [occupation] = useState('')
  const [headLineError, setHeadLineError] = useState('')
  const [industries] = useState('')
  const [location] = useState('')
  const [mobile] = useState('')
  const [website] = useState('')
  const [linkedIn] = useState('')

  // refs
  const bottomSheetRef = useRef(null)

  const handlePresentPress = useCallback(() => {
    if (Keyboard.isVisible) {
      Keyboard.dismiss()
    }
    if (bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.present()
    }
  }, [])
  // #endregion

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    h1: {
      fontWeight: '600',
      marginLeft: 15,
      marginRight: 'auto',
      marginTop: 30,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    label: {
      fontSize: 18, // TODO: all font sizes, lineheight must be set in theme param
      color: colors.onBackground,
      marginLeft: 16,
    },
    value: {
      fontSize: 18, // TODO: all font sizes, lineheight must be set in theme param
      marginLeft: 10,
      alignSelf: 'flex-start',
      color: colors.primary,
    },
    content: {
      flex: 1,
      paddingVertical: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    saveBottomButton: {
      borderRadius: 10,
      width: '95%',
      alignSelf: 'center',
    },
    rowIcon: {
      marginRight: 10,
    },
    footer: {
      marginVertical: 15,
    },
  })

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <HeaderProfile
          title="Edit Intro"
          changed
          onSave={() => {
            // console.log('saved changes')
            navigation.navigate('ProfileStack', {
              screen: 'Profile',
              params: { // userId, userFullName, userAvatar, userBannerImage,
                userId: userData.id,
                userFullName: userData.fullName,
                userAvatar: userData.avatar,
                userBannerImage: userData.bannerImage,
              },
            })
          }}
        />
        <KeyboardAwareScrollView
          style={styles.content}
          keyboardShouldPersistTaps="never"
        >

          <TextInputBox
            autoFocus
            bgColor={colors.surface}
            onBgColor={colors.onSurface}
            placeholder="Your full name"
            label="Full Name (Required)*"
          // onChangeText={(text) => setEmail(text)}
            autoCapitalize="words"
            value={fullName}
              // keyboardType="email-address"
            errorMessage={fullNameError}
            onChangeText={(name) => {
              let error = ''
              setFullName(name)
              error = !isValidName(name)
              error = error ? 'Invalid name, only letters and spaces are allowed.' : ''
              setFullNameError(error)
            }}
          />

          <TextInputBox
            autoFocus
            placeholder="Your additional name"
            label="Nickname"
          // onChangeText={(text) => setEmail(text)}
            autoCapitalize="words"
            value={nickName}
              // keyboardType="email-address"
            errorMessage={nickNameError}
            onChangeText={(name) => {
              let error = ''
              setNickName(name)
              error = !isValidName(name)
              error = error ? 'Invalid name, only letters and spaces are allowed.' : ''
              setNickNameError(error)
            }}
          />

          <TextInputBox
              // editable={false}
            autoFocus
            placeholder="Please select"
            label="Pronouns"
          // onChangeText={(text) => setEmail(text)}
                // autoCapitalize="words"
            value={pronouns}
            rightIcon="plus-circle"
              // keyboardType="email-address"
                // errorMessage={nickNameError}
                // onChangeText={(pronouns) => {
                //   setPronouns(pronouns)
                // }}
            onFocus={() => handlePresentPress(1)}
            showKeyboard={false}
          />

          <TextInputBox
            autoFocus
            multiline
            placeholder="Describe yourself very briefly"
            label="About You (Required)*"
          // onChangeText={(text) => setEmail(text)}
            autoCapitalize="sentences"
            value={headLine}
              // keyboardType="email-address"
            errorMessage={headLineError}
            onChangeText={(text) => {
              let error = ''
              setHeadLine(text)
              error = !isValidLength(text, 100)
              error = error ? 'Maximum 100 characters allowed' : ''
              setHeadLineError(error)
            }}
          />

          <TextInputBox
              // editable={false}
            autoFocus
            placeholder="Please select"
            label="Location (Required)*"
          // onChangeText={(text) => setEmail(text)}
                // autoCapitalize="words"
            value={location}
            rightIcon="plus-circle"
              // keyboardType="email-address"
                // errorMessage={nickNameError}
                // onChangeText={(pronouns) => {
                //   setPronouns(pronouns)
                // }}
            onFocus={() => handlePresentPress(1)}
            showKeyboard={false}
          />

          <TextInputBox
              // editable={false}
            autoFocus
            placeholder="Please select"
            label="Occupation (Required)*"
          // onChangeText={(text) => setEmail(text)}
                // autoCapitalize="words"
            value={occupation}
            rightIcon="plus-circle"
              // keyboardType="email-address"
                // errorMessage={nickNameError}
                // onChangeText={(pronouns) => {
                //   setPronouns(pronouns)
                // }}
            onFocus={() => handlePresentPress(1)}
            showKeyboard={false}
          />

          <TextInputBox
              // editable={false}
            autoFocus
            placeholder="Please select"
            label="Related Industries (Required)*"
          // onChangeText={(text) => setEmail(text)}
                // autoCapitalize="words"
            value={industries}
            rightIcon="plus-circle"
              // keyboardType="email-address"
                // errorMessage={nickNameError}
                // onChangeText={(pronouns) => {
                //   setPronouns(pronouns)
                // }}
            onFocus={() => handlePresentPress(1)}
            showKeyboard={false}
          />

          <Text style={styles.h1} variant="headlineMedium">Contact Info</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userData.email} </Text>
          </View>

          <TextInputBox
            autoFocus
              // placeholder="Your mobile phone number"
            label="Mobile number"
          // onChangeText={(text) => setEmail(text)}
              // autoCapitalize="words"
            value={mobile}
            keyboardType="phone-pad"
          />

          <TextInputBox
            autoFocus
            placeholder="Your personal or business website"
            label="Website"
          // onChangeText={(text) => setEmail(text)}
              // autoCapitalize="words"
            value={website}
          />

          <TextInputBox
            autoFocus
              // placeholder="Your linkedin profile"
            label="LinkedIn"
          // onChangeText={(text) => setEmail(text)}
              // autoCapitalize="words"
            value={linkedIn}
          />

          {/* Empty space at bottom of page */}
          <View style={styles.footer} />

          {/* <IconButton
                style={styles.rowIcon}
                icon="plus-circle"
                size={20}
                iconColor={colors.primary}
                onPress={() => console.log('add')}
              /> */}
        </KeyboardAwareScrollView>
        <SheetModal ref={bottomSheetRef}>
          <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
            <Text>FIND ASSOCIATE</Text>
          </View>
        </SheetModal>
      </View>
    </ScreenTemplate>
  )
}
