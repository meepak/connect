import React, {
  useEffect, useState, useContext, useLayoutEffect, useCallback,
} from 'react'
import {
  Alert, ScrollView, StyleSheet, View, RefreshControl,
} from 'react-native'
import {
  Surface, Text, IconButton, Button as RpBtn,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { doc, onSnapshot } from 'firebase/firestore'
import Avatar from '../../components/Avatar'
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

  // regarding header, rename aptly
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    // marginBottom: layout.marginBottom,
    borderRadius: 6,
    width: '75%',
    height: 36,
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 15,
  },
  buttonLabel: {
    fontSize: fontSize.middle,
  },
  iconButton: {
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
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

  const headerButtonPress = () => {
    Alert.alert('Tapped header button')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => ( // App Logo
        <View style={styles.headerContainer}>
          <Avatar
            size="small"
            onPress={() => navigation.openDrawer()}
          />
          <RpBtn
            buttonColor={colors.grayLight}
            textColor={colors.white}
            onPress={() => console.log('go to new window')}
            mode="contained"
            title="Search"
                      // marginBottom={layout.marginBottom}
                      // labelStyle={styles.buttonLabel}
            style={styles.button}
            icon="text-search"
          >Search
          </RpBtn>

          <IconButton
            icon="bell-outline"
            color={colors.lightPurple}
            size={24}
            onPress={() => headerButtonPress()}
            // containerStyle={{ paddingRight: 15 }}
          />

        </View>
      ),
    })
  }, [navigation])

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
