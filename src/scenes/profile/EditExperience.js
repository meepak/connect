import React, {
  useState, useContext, useCallback, useRef,
} from 'react'
import {
  View, StyleSheet, StatusBar, SafeAreaView, Pressable,
} from 'react-native'
import {
  Text, useTheme, IconButton,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRoute, useNavigation } from '@react-navigation/native'

import { TouchableOpacity } from 'react-native-gesture-handler'
import ScreenTemplate from '../../components/ScreenTemplate'
import TextInputBox from '../../components/core/TextInputBox'
// import storage from '../../utils/Storage'
// TODO FIGURE THIS OUT WITH ASYNC-STORAGE & UPDATE UTILS/STORAGE
import { UserDataContext } from '../../context/UserDataContext'
import { isValidName, isValidLength } from '../../utils/validation'
import Header4Profile from '../../components/header/Header4Profile'
import SheetModal from '../../components/core/SheetModal'

export default function EditExperience() {
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

  const handlePresentPress = useCallback(() => {
     bottomSheetRef.current?.present()
  }, [])
  // #endregion

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    iconLink: {
      marginLeft: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    iconLinkLabel: {
      fontSize: 18, // TODO: all font sizes, lineheight must be set in theme param
      color: colors.primary,
      marginLeft: -7,
    },
    h1: {
      fontSize: fonts.headlineMedium.fontSize,
      fontWeight: '600',
      marginLeft: 15,
      marginRight: 'auto',
      marginTop: 30,
      marginBottom: 10,
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
    rowIcon: {
      marginRight: 10,
    },
    footer: {
      marginVertical: 15,
    },
  })

  return (
    <ScreenTemplate>
      <SafeAreaView style={styles.container}>
        <Header4Profile
          title="Edit Experiences"
          changed
          onSave={() => {
            // console.log('saved changes')
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
        />

        <TouchableOpacity onPress={() => handlePresentPress()}>
          <View style={styles.iconLink}>
            <IconButton icon="plus-circle" size={20} iconColor={colors.primary} />
            <Text style={styles.iconLinkLabel}>Add new experience</Text>
          </View>
        </TouchableOpacity>

        <KeyboardAwareScrollView
          style={styles.content}
          keyboardShouldPersistTaps="never"
        >
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
        <SheetModal ref={bottomSheetRef} snapsAt={['90%']}>
          <KeyboardAwareScrollView
            style={styles.content}
            keyboardShouldPersistTaps="never"
          >
            <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
              <Text>FIND ASSOCIATE</Text>
              <TextInputBox
                autoFocus
                bgColor={colors.surfface}
                onBgColor={colors.onSurface}
                placeholder="Your full name"
                label="7Full Name (Required)*"
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
                bgColor={colors.surfface}
                onBgColor={colors.onSurface}
                placeholder="Your full name"
                label="6Full Name (Required)*"
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
                bgColor={colors.surfface}
                onBgColor={colors.onSurface}
                placeholder="Your full name"
                label="5Full Name (Required)*"
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
                bgColor={colors.surfface}
                onBgColor={colors.onSurface}
                placeholder="Your full name"
                label="4Full Name (Required)*"
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
                bgColor={colors.surfface}
                onBgColor={colors.onSurface}
                placeholder="Your full name"
                label="3Full Name (Required)*"
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
                bgColor={colors.surfface}
                onBgColor={colors.onSurface}
                placeholder="Your full name"
                label="2Full Name (Required)*"
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
                bgColor={colors.surfface}
                onBgColor={colors.onSurface}
                placeholder="Your full name"
                label="1Full Name (Required)*"
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
            </View>
          </KeyboardAwareScrollView>
        </SheetModal>
      </SafeAreaView>
    </ScreenTemplate>
  )
}
