/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, {
  useState, useContext, useLayoutEffect, useCallback,
} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Platform } from 'react-native'
import {
  collection, addDoc, query, orderBy, onSnapshot, // limit,
} from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
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
  // const [isLoading, setIsLoading] = useState(false)

  useLayoutEffect(() => {
    // return
    // setIsLoading(true)
    const q = query(collection(firestore, 'chats'), orderBy('createdAt', 'desc')) // , limit(20))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      )
      // setIsLoading(false)
    })
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
        onPressAvatar={console.log('Avatar pressed')}
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
