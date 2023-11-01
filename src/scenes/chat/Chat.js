/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, {
  useState, useContext, useLayoutEffect, useCallback, useEffect,
} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Platform } from 'react-native'
import {
  collection, addDoc, query, setDoc, getDocs, getDoc, orderBy, where, limit, onSnapshot, serverTimestamp, // limit,
} from 'firebase/firestore'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Divider, useTheme } from 'react-native-paper'
// import emojiUtils from 'emoji-utils'
// import { Platform } from 'react-native'
// import Spinner from 'react-native-loading-spinner-overlay'
import {
  renderInputToolbar, renderActions, renderComposer, renderSend,
} from './InputToolbar'
import { UserDataContext } from '../../context/UserDataContext'
import { firestore } from '../../firebase'
import ScreenTemplate from '../../components/ScreenTemplate'

// import SlackMessage from './SlackMessage'

const Chat = () => {
  const [cText, setcText] = useState('')
  const [messages, setMessages] = useState([])
  const navigation = useNavigation()
  const { colors, fonts } = useTheme() // Get colors and fonts from useTheme
  const { userData } = useContext(UserDataContext)
  const route = useRoute()
  const { userId, userFullName, userAvatar } = route.params
  const [currentChatGroupId, setCurrentChatGroupId] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  // console.log(userData.id, userId)

  async function fetchChatGroup() {
    const chatGroupsRef = collection(firestore, 'chats')

    // direct message between two usersnew
    const chatGroupQuery = query(
      chatGroupsRef,
      where(`members.${userData.id}.userId`, '==', userData.id),
      where(`members.${userId}.userId`, '==', userId),
      where('totalMembers', '==', 2),
      limit(1),
    )

    const chatGroupQuerySnapShot = await getDocs(chatGroupQuery)
    // console.log(chatGroupQuerySnapShot.docs.length)

    if (chatGroupQuerySnapShot.empty) {
      console.log('Chat group does not exist, lets create it')
      const serverTime = serverTimestamp()
      const newChatGroupData = {
        title: 'Direct Message',
        type: 'direct', // 'direct' or 'group'
        lastMessage: { message: '', userId: '', createdAt: '' },
        createdAt: serverTime,
        totalMembers: 2,
        members: {
          [userData.id]: {
            userId: userData.id,
            Name: userData.fullName,
            Avatar: userData.avatar,
            addedOn: serverTime,
          },
          [userId]: {
            userId,
            Name: userFullName,
            Avatar: userAvatar,
            addedOn: serverTime,
          },
        },
      }
      const docRef = await addDoc(chatGroupsRef, newChatGroupData)
      // console.log('Document written with ID: ', docRef.id)
      return docRef.id
    }
    // console.log('Chat group already exists, lets fetch its id')
    const chatGroup = chatGroupQuerySnapShot.docs[0]
    // console.log(chatGroup.id)
    // console.log(chatGroup.data())
    return chatGroup.id
  }

  // useEffect(() => { console.log('current chat group id from use effect', currentChatGroupId) }, [currentChatGroupId])

  useLayoutEffect(() => {
    // setIsLoading(true)

    console.log(JSON.stringify(messages))
    let unsubscribe
    fetchChatGroup().then((chatGroupId) => {
      console.log(`got the chat group id ${chatGroupId}`)
      setCurrentChatGroupId(chatGroupId)
      const chatMessagesRef = collection(firestore, `/chats/${chatGroupId}/messages`)
      // This is returning all the records of chat every time, why??
      const q = query(chatMessagesRef, orderBy('createdAt', 'desc'))
      // const q = query(collection(firestore, 'chat-messages'), orderBy('createdAt', 'desc')) // , limit(20))
      unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log('In snapshot ')
        setMessages(snapshot.docs.map((doc) => {
          const msg = {
            id: doc.data().id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            userId: doc.data().userId,
          }

          // console.log(msg.userId)
          let msgUser = null
          if (msg.userId === userData.id) {
          // console.log(`message from user ${userData.id}`)
            msgUser = { _id: userData.id, fullName: userData.fullName, avatar: userData.avatar }
          }
          if (msg.userId === userId) {
          // console.log(`message from user ${userId}`)
            msgUser = { _id: userId, fullName: userFullName, avatar: userAvatar }
          }

          // if (msgUser !== null) {
          const message = {
            _id: msg.id, createdAt: msg.createdAt, text: msg.text, user: msgUser,
          }
          // console.log(`message: ${JSON.stringify(message)}`)
          return message
        // }
        }))
      })
    })
    // setIsLoading(false)
    return () => {
      unsubscribe()
    }
  }, [navigation])

  const onSend = useCallback((msgs = []) => {
    const {
      _id, createdAt, text, user,
    } = msgs[0]

    const uid = user._id

    const sentMsg = {
      id: _id,
      createdAt,
      text,
      userId: uid,
    }

    // console.log(sentMsg)
    addDoc(collection(firestore, `/chats/${currentChatGroupId}/messages`), sentMsg)

    // TODO update lastMessage in chat-group
  }, [currentChatGroupId])

  // const renderMessage = (props) => {
  //   const {
  //     currentMessage: { text: currText },
  //   } = props

  //   let messageTextStyle

  //   // Make "pure emoji" messages much bigger than plain text.
  //   // if (currText && emojiUtils.isPureEmojiString(currText)) {
  //   //   messageTextStyle = {
  //   //     fontSize: 28,
  //   //     // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
  //   //     lineHeight: Platform.OS === 'android' ? 34 : 30,
  //   //   }
  //   // }

  //   return <SlackMessage {...props} messageTextStyle={messageTextStyle} colors={colors} fonts={fonts} /> // Pass colors and fonts as props
  // }

  // const spinner = () => (
  //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //     <Text color="white">Hellloooo</Text> />
  //   </View>
  // )
  // const renderMessage = (props) => (
  //   isLoading
  //     ? spinner()
  //     : (
  //       <Message
  //         {...props}
  //       />
  //     )
  // )
  // const renderMessage = (props) => {
  //   console.log(`printing ${props}`)
  //   return (
  //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //       <Spinner />
  //     </View>
  //   )
  // }

  // const renderCustomView = ({ user }) => (
  //   <View style={{ minHeight: 20, alignItems: 'center' }}>
  //     <Text>
  //       Current user:
  //       {user.name}
  //     </Text>
  //     <Text>From CustomView</Text>
  //   </View>
  // )

  const bottomViewHeight = Platform.OS === 'android' ? 10 : 25

  return (
    <ScreenTemplate>
      <GiftedChat
        keyboardShouldPersistTaps="never"
        messages={messages}
        text={cText}
        onInputTextChanged={setcText}
        onSend={onSend}
        user={{
          _id: userData.id,
          name: userData.fullName,
          avatar: userData.avatar,
        }}
      // alignTop
        alwaysShowSend
        scrollToBottom
        // isTyping
      // bottomOffset={30}
        // onPressAvatar={console.log('Avatar pressed')}
        renderInputToolbar={(props) => renderInputToolbar(props, colors)}
        renderActions={(props) => renderActions(props, colors)}
        renderComposer={(props) => renderComposer(props, colors)}
        renderSend={(props) => renderSend(props, colors)}
        // renderCustomView={renderCustomView}
        // renderMessage={renderMessage}
        // renderLoading={spinner}
      // renderMessage={(props) => SlackMessage(props, colors, fonts)}
      // isCustomViewBottom
      // infiniteScroll
      // forceGetKeyboardHeight
      // isKeyboardInternallyHandled
        messagesContainerStyle={{ paddingBottom: 10 }} // TODO:: Adjust for android and IOS
        parsePatterns={(/* linkStyle */) => [
          {
            pattern: /#(\w+)/,
            style: { color: colors.primary, fontWeight: 'bold', fontSize: fonts.bodyMedium.fontSize },
            onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
          },
        ]}
      />
      <View><Divider style={{ height: bottomViewHeight, backgroundColor: colors.elevation.level3 }} /></View>
    </ScreenTemplate>
  )
}

export default Chat
