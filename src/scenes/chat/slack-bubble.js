/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
// import { useActionSheet } from '@expo/react-native-action-sheet'
// import Clipboard from '@react-native-clipboard/clipboard'
import {
  MessageText, MessageImage, Time, utils,
} from 'react-native-gifted-chat'

const { isSameUser, isSameDay } = utils

const Bubble = (props) => {
  // const { showActionSheetWithOptions } = useActionSheet()

  const styles = StyleSheet.create({
    standardFont: {
      fontSize: props.fonts.titleMedium.fontSize, // Use props to access fonts
      color: props.colors.onBackground,
    },
    slackMessageText: {
      marginLeft: 10,
      marginRight: 0,
      fontWeight: 300,
    },
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-start',
    },
    username: {
      marginLeft: 10,
      fontWeight: 700,
      fontSize: props.fonts.titleMedium.fontSize,
    },
    time: {
      textAlign: 'left',
      fontSize: props.fonts.bodyMedium.fontSize,
    },
    timeContainer: {
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
    },
    headerItem: {
      marginRight: 10,
    },
    headerView: {
      marginTop: Platform.OS === 'android' ? -2 : 0,
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    tick: {
      backgroundColor: 'transparent',
      color: props.colors.onBackground,
    },
    tickView: {
      flexDirection: 'row',
    },
    slackImage: {
      borderRadius: 3,
      marginLeft: 0,
      marginRight: 0,
    },
  })

  const onLongPress = () => {
    if (props.onLongPress) {
      props.onLongPress(props.currentMessage)
    } else if (props.currentMessage.text) {
      // const options = ['Copy Text', 'Cancel']
      // const cancelButtonIndex = options.length - 1
      // showActionSheetWithOptions(
      //   {
      //     options,
      //     cancelButtonIndex,
      //   },
      //   (buttonIndex) => {
      //     switch (buttonIndex) {
      //       case 0:
      //         Clipboard.setString(props.currentMessage.text)
      //         break
      //       default:
      //         break
      //     }
      //   },
      // )
    }
  }

  const renderMessageText = () => {
    if (props.currentMessage.text) {
      const {
        containerStyle,
        wrapperStyle,
        messageTextStyle,
        ...messageTextProps
      } = props
      if (props.renderMessageText) {
        return props.renderMessageText(messageTextProps)
      }
      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: [
              styles.standardFont,
              styles.slackMessageText,
              messageTextProps.textStyle,
              messageTextStyle,
            ],
          }}
        />
      )
    }
    return null
  }

  const renderMessageImage = () => {
    if (props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = props
      if (props.renderMessageImage) {
        return props.renderMessageImage(messageImageProps)
      }
      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      )
    }
    return null
  }

  const renderTicks = () => {
    const { currentMessage } = props
    if (props.renderTicks) {
      return props.renderTicks(currentMessage)
    }
    if (currentMessage.user._id !== props.user._id) {
      return null
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.headerItem, styles.tickView]}>
          {currentMessage.sent && (
            <Text
              style={[styles.standardFont, styles.tick, props.tickStyle]}
            >
              ✓
            </Text>
          )}
          {currentMessage.received && (
            <Text
              style={[styles.standardFont, styles.tick, props.tickStyle]}
            >
              ✓
            </Text>
          )}
        </View>
      )
    }
    return null
  }

  const renderUsername = () => {
    const username = props.currentMessage.user.name
    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = props
      if (props.renderUsername) {
        return props.renderUsername(usernameProps)
      }
      return (
        <Text
          style={[
            styles.standardFont,
            styles.headerItem,
            styles.username,
            props.usernameStyle,
          ]}
        >
          {username}
        </Text>
      )
    }
    return null
  }

  const renderTime = () => {
    if (props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = props
      if (props.renderTime) {
        return props.renderTime(timeProps)
      }
      return (
        <Time
          {...timeProps}
          containerStyle={{ left: [styles.timeContainer] }}
          textStyle={{
            left: [
              styles.standardFont,
              styles.headerItem,
              styles.time,
              timeProps.textStyle,
            ],
          }}
        />
      )
    }
    return null
  }

  const renderCustomView = () => {
    if (props.renderCustomView) {
      return props.renderCustomView(props)
    }
    return null
  }

  const isSameThread = isSameUser(props.currentMessage, props.previousMessage)
    && isSameDay(props.currentMessage, props.previousMessage)

  const messageHeader = isSameThread ? null : (
    <View style={styles.headerView}>
      {renderUsername()}
      {renderTime()}
      {renderTicks()}
    </View>
  )

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity
        onLongPress={onLongPress}
        accessibilityTraits="text"
        {...props.touchableProps}
      >
        <View style={[styles.wrapper, props.wrapperStyle]}>
          <View>
            {renderCustomView()}
            {messageHeader}
            {renderMessageImage()}
            {renderMessageText()}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Bubble
