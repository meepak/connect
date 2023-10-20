/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, {
  useState, useContext, useLayoutEffect, useCallback,
} from 'react'
import { GiftedChat, Day } from 'react-native-gifted-chat'
import {
  collection, addDoc, query, orderBy, onSnapshot,
} from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { Divider, useTheme } from 'react-native-paper'
import emojiUtils from 'emoji-utils'
import { Platform } from 'react-native'
import {
  renderInputToolbar, renderActions, renderComposer, renderSend,
} from './InputToolbar'
import { UserDataContext } from '../../context/UserDataContext'
import { firestore } from '../../firebase'

import SlackMessage from './SlackMessage'

const Chat = () => {
  const [cText, setcText] = useState('')
  const [messages, setMessages] = useState([])
  const navigation = useNavigation()
  const { colors, fonts } = useTheme() // Get colors and fonts from useTheme
  const { userData } = useContext(UserDataContext)

  useLayoutEffect(() => {
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

  const renderMessage = (props) => {
    const {
      currentMessage: { text: currText },
    } = props

    let messageTextStyle

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      }
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} colors={colors} fonts={fonts} /> // Pass colors and fonts as props
  }

  return (
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
      alignTop
      alwaysShowSend
      scrollToBottom
      bottomOffset={42}
      onPressAvatar={console.log}
      renderInputToolbar={(props) => renderInputToolbar(props, colors)}
      renderActions={(props) => renderActions(props, colors)}
      renderComposer={(props) => renderComposer(props, colors)}
      renderSend={(props) => renderSend(props, colors)}
      renderMessage={renderMessage}
      isCustomViewBottom
      parsePatterns={(/* linkStyle */) => [
        {
          pattern: /#(\w+)/,
          style: { color: colors.primary, fontWeight: 'bold', fontSize: fonts.bodyMedium.fontSize },
          onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
        },
      ]}
    />
  )
}

export default Chat
