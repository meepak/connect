import React, { useState, useContext, useEffect } from 'react'
import {
  View, StyleSheet, ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Surface, Text } from 'react-native-paper'
import Dialog from 'react-native-dialog'
import Spinner from 'react-native-loading-spinner-overlay'
import { doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { signOut, deleteUser } from 'firebase/auth'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
// import Restart from '../../utils/Restart'
import { firestore, auth } from '../../firebase'
import { UserDataContext } from '../../context/UserDataContext'
import { colors, fontSize } from '../../theme'
import AvatarOfAuthUser from '../../components/AvatarOfAuthUser'
import sendNotification from '../../utils/SendNotification'
import TestFontsize from '../../components/TestFontsize'

const styles = StyleSheet.create({
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
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
  content: {
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
})

export default function Manage() {
  const { userData, setUserData } = useContext(UserDataContext)
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [token, setToken] = useState('')

  // useEffect(() => {
  //   console.log('Manage screen')
  // }, [])

  useEffect(() => {
    const tokensRef = doc(firestore, 'tokens', userData.id)
    const tokenListner = onSnapshot(tokensRef, (querySnapshot) => {
      if (querySnapshot.exists) {
        const data = querySnapshot.data()
        setToken(data)
      } else {
        console.log('No such document!')
      }
    })
    return () => tokenListner()
  }, [])

  const onNotificationPress = async () => {
    const res = await sendNotification({
      title: 'Hello',
      body: 'This is some something 👋',
      data: 'something data',
      token: token.token,
    })
    console.log(res)
  }

  const goDetail = () => {
    navigation.navigate('Edit', { userData })
  }

  const onSignOutPress = () => {
    signOut(auth)
      .then(() => {
        setUserData('')
        // Restart() // do not restart, just go back to pre login page
      })
      .catch((error) => {
        console.log(`on sign out press - ${error.message}`)
      })
  }

  const showDialog = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const accountDelete = async () => {
    try {
      setSpinner(true)
      const tokensDocumentRef = doc(firestore, 'tokens', userData.id)
      const usersDocumentRef = doc(firestore, 'users', userData.id)
      await deleteDoc(tokensDocumentRef)
      await deleteDoc(usersDocumentRef)
      const user = auth.currentUser
      deleteUser(user).then(() => {
        setSpinner(false)
        signOut(auth)
          .then(() => {
            console.log('user deleted')
          })
          .catch((error) => {
            console.log(error.message)
          })
      }).catch((error) => {
        setSpinner(false)
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScreenTemplate>
      <ScrollView style={styles.main}>
        <View style={styles.avatar}>
          <AvatarOfAuthUser
            size="xlarge"
          />
        </View>
        <Text style={styles.field}>Name:</Text>
        <Text style={styles.title}>{userData.fullName}</Text>
        <Text style={styles.field}>Mail:</Text>
        <Text style={styles.title}>{userData.email}</Text>
        <Button
          label="Edit"
          color={colors.primary}
          onPress={goDetail}
        />
        <TestFontsize />
        <Surface
          style={styles.content}
        >
          <Text style={styles.field}>Mail:</Text>
          <Text style={styles.title}>{userData.email}</Text>
          {token
            ? (
              <>
                <Text style={styles.field}>Expo push token:</Text>
                <Text style={styles.title}>{token.token}</Text>
              </>
            ) : null}
        </Surface>
        <Button
          label="Open Modal"
          color={colors.tertiary}
          onPress={() => {
            navigation.navigate('ModalStack', {
              screen: 'Post',
              params: {
                data: userData,
                from: 'Manage screen',
              },
            })
          }}
        />
        <Button
          label="Account delete"
          color={colors.secondary}
          onPress={showDialog}
        />
        <Button
          label="Send Notification"
          color={colors.pink}
          onPress={() => onNotificationPress()}
          disable={!token}
        />
        <View style={styles.footerView}>
          <Text onPress={onSignOutPress} style={styles.footerLink}>Sign out</Text>
        </View>
      </ScrollView>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={accountDelete} />
      </Dialog.Container>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
