import React, {
  useCallback, useState, useContext, useLayoutEffect,
} from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native'
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native'
import { Avatar } from 'react-native-elements'
// import { signOut } from 'firebase/auth'
import {
  collection, addDoc, getDocs, query, orderBy, onSnapshot,
} from 'firebase/firestore'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, firestore } from '../../firebase'
import { UserDataContext } from '../../context/UserDataContext'
import ScreenTemplate from '../../components/ScreenTemplate'

const Chat = () => {
  const navigation = useNavigation()
  const { userData } = useContext(UserDataContext)
  const [messages, setMessages] = useState([])
  //   const signOutNow = () => {
  //     signOut(auth).then(() => {
  //       // Sign-out successful.
  //       navigation.replace('Login')
  //     }).catch((error) => {
  //       // An error happened.
  //     })
  //   }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.avatar,
            }}
          />
        </View>
      ),
    //   headerRight: () => (
    //     <TouchableOpacity
    //       style={{
    //         marginRight: 10,
    //       }}
    //       onPress={signOutNow}
    //     >
    //       <Text>logout</Text>
    //     </TouchableOpacity>
    //   ),
    })

    const q = query(collection(firestore, 'chats'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
      snapshot.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      })),
    ))

    return () => {
      unsubscribe()
    }
  }, [navigation])

  const onSend = useCallback((_messages = []) => {
    const {
      _id, createdAt, text, user,
    } = _messages[0]

    addDoc(collection(firestore, 'chats'), {
      _id, createdAt, text, user,
    })
  }, [])

  return (
    <ScreenTemplate>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage
        onSend={(_messages) => onSend(_messages)}
        user={{
          _id: userData?.email,
          name: userData?.fullName,
          avatar: userData?.avatar,
        }}
      />
    </ScreenTemplate>
  )
}

export default Chat
