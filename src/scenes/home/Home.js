import React, {
  useEffect, useState, useContext, useCallback,
} from 'react'
import {
  ScrollView, StyleSheet, RefreshControl,
} from 'react-native'
import {
  Surface, Text,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { doc, onSnapshot } from 'firebase/firestore'
import { fontSize, colors } from '../../theme'

// import IconButton from '../../components/IconButton'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { firestore } from '../../firebase'
import { UserDataContext } from '../../context/UserDataContext'
import sendNotification from '../../utils/SendNotification'

const styles = StyleSheet.create({
  content: {
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
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
})

export default function Home() {
  const navigation = useNavigation()
  const [token, setToken] = useState('')
  const { userData } = useContext(UserDataContext)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => (
  //       <Header />
  //     ),
  //   })
  // }, [navigation])

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

  const indexArray = new Array(10).fill('')

  return (
    <ScreenTemplate>
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {indexArray.map((_, index) => (
          <Surface
            // eslint-disable-next-line react/no-array-index-key
            key={index + 1}
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
        ))}
        <Button
          label="Go to Detail"
          color={colors.primary}
          onPress={() => navigation.navigate('Detail', { userData, from: 'Home', title: userData.email })}
        />
        <Button
          label="Open Modal"
          color={colors.tertiary}
          onPress={() => {
            navigation.navigate('ModalStack', {
              screen: 'Post',
              params: {
                data: userData,
                from: 'Home screen',
              },
            })
          }}
        />
        <Button
          label="Send Notification"
          color={colors.pink}
          onPress={() => onNotificationPress()}
          disable={!token}
        />
      </ScrollView>
    </ScreenTemplate>
  )
}
