import React, {
  useState, useEffect, useContext, useCallback, useMemo, useRef,
} from 'react'
import {
  View, StyleSheet, StatusBar, SafeAreaView, Alert,
} from 'react-native'
import {
  Text, Button, IconButton, useTheme,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRoute, useNavigation } from '@react-navigation/native'

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

import ScreenTemplate from '../../components/ScreenTemplate'
import TextInputBox from '../../components/core/TextInputBox'
// import storage from '../../utils/Storage'
// TODO FIGURE THIS OUT WITH ASYNC-STORAGE & UPDATE UTILS/STORAGE
import { UserDataContext } from '../../context/UserDataContext'
import { isValidName, isValidLength } from '../../utils/validation'

export default function EditIntro() {
  const route = useRoute()
  const { data, from } = route.params
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()

  const { userData } = useContext(UserDataContext)
  const [fullName, setFulName] = useState(userData.fullName)
  const [fullNameError, setFullNameError] = useState('')
  const [nickName, setNickName] = useState('')
  const [nickNameError, setNickNameError] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [headLine, setHeadLine] = useState('')
  const [occupation, setOccupation] = useState('')
  const [headLineError, setHeadLineError] = useState('')
  const [industries, setIndustries] = useState('')
  const [location, setLocation] = useState('')
  const [mobile, setMobile] = useState('')
  const [website, setWebsite] = useState('')
  const [linkedIn, setLinkedIn] = useState('')

  // refs
  const bottomSheetRef = useRef(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], [])

  // #region callbacks
  const handleChange = useCallback((index) => {
    // eslint-disable-next-line no-console
    console.log('index', index)
  }, [])
  const handleDismiss = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('on dismiss')
  }, [])
  const handleDismissPress = useCallback(() => {
   bottomSheetRef.current?.dismiss()
  }, [])
  const handleClosePress = useCallback(() => {
   bottomSheetRef.current?.close()
  }, [])
  const handlePresentPress = useCallback(() => {
   bottomSheetRef.current?.present()
  }, [])
  // #endregion

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center', // Center items vertically in the row
      justifyContent: 'space-between', // Space out items horizontally
      alignSelf: 'stretch',
    },
    cancelButton: {
      // alignSelf: 'flex-start',
    },
    saveButton: {
      width: 85,
      height: 32,
      marginRight: 10,
      paddingVertical: 0,
    },
    saveButtonLabel: {
      fontSize: fonts.bodyMedium.fontSize,
      color: colors.onBackground,
      lineHeight: 13,
      height: 12,
      fontWeight: 700,
    },
    headerTitle: {
      fontSize: fonts.headlineSmall.fontSize,
      fontWeight: 700,
      marginLeft: 10,
      marginRight: 'auto',
    },
    h1: {
      fontSize: fonts.headlineMedium.fontSize,
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

  useEffect(
    () => navigation.addListener('beforeRemove', (e) => {
      const { action } = e.data
      console.log(e.data)

      e.preventDefault()

      // TODO check for actual unsaved changes
      // https://reactnavigation.org/docs/preventing-going-back/

      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(action),
          },
        ],
      )
    }),
    [navigation],
  )

  return (
    <BottomSheetModalProvider>
      <ScreenTemplate>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <IconButton
              icon="close-sharp"
              size={25}
              iconColor={colors.onBackground}
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Edit Intro</Text>
            <Button
              onPress={() => {
                console.log('saved changes')
                navigation.navigate('ProfileStack', {
                  screen: 'Profile',
                  params: { // userId, userFullName, userAvatar, userBannerImage,
                    userId: userData.id,
                    userFullName: userData.fullName,
                    userAvatar: userData.avatar,
                    userBannerImage: { uri: userData.bannerImage },
                  },
                })
              }}
              mode="outlined"
              style={styles.saveButton}
              icon="checkmark-sharp"
              // labelStyle={{ fontSize: 25 }}
              textColor={colors.onBackground}
            ><Text style={styles.saveButtonLabel}>Save</Text>
            </Button>
          </View>
          <KeyboardAwareScrollView
            style={styles.content}
            keyboardShouldPersistTaps="never"
          >

            <TextInputBox
              autoFocus
              bgColor={colors.surfface}
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
                setFulName(name)
                error = !isValidName(name)
                error = error ? 'Invalid name, only letters and spaces are alllowed.' : ''
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
                error = error ? 'Invalid name, only letters and spaces are alllowed.' : ''
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
              numberOfLines={3}
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

            <Text style={styles.h1}>Contact Info</Text>
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
              // errorMessage={nickNameError}
              // onChangeText={(name) => {
              //   let error = ''
              //   setNickName(name)
              //   error = !isValidName(name)
              //   error = error ? 'Invalid name, only letters and spaces are alllowed.' : ''
              //   setNickNameError(error)
              // }}
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
          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            topInset={StatusBar.currentHeight}
            enablePanDownToClose
            enableDismissOnClose
            onDismiss={handleDismiss}
            onChange={handleChange}
            backdropComponent={({ animatedIndex, style }) => (
              <BottomSheetBackdrop
                animatedIndex={animatedIndex}
                style={[style, { backgroundColor: colors.surfaceDisabled }]}
                disappearsOnIndex={-1}
              />
            )}
            backgroundStyle={{ backgroundColor: colors.surfaceVariant, borderRadius: 40 }}
            handleIndicatorStyle={{ width: '15%', height: 7, backgroundColor: colors.background }}
          >
            <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
              <Text>FIND ASSOCIATE</Text>
            </View>
          </BottomSheetModal>
        </SafeAreaView>
      </ScreenTemplate>
    </BottomSheetModalProvider>
  )
}
