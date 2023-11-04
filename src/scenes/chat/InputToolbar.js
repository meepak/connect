/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { IconButton } from 'react-native-paper'
import {
  InputToolbar, Actions, Composer, Send,
} from 'react-native-gifted-chat'

export const renderInputToolbar = (props, colors) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: colors.elevation.level3,
      paddingTop: 6,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
)

export const renderActions = (props, colors) => (
  <Actions
    {...props}
    containerStyle={{
      width: 36,
      height: 54,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 7,
      marginRight: 4,
      marginBottom: 0,
    }}
    icon={() => (
      <IconButton
        icon="attach-outline"
        size={25}
        iconColor={colors.onBackground}
      />
    )}
    options={{
      'Choose From Library': () => {
        console.log('Choose From Library')
      },
      Cancel: () => {
        console.log('Cancel')
      },
    }}
    optionTintColor={colors.backgroundColor}
  />
)

export const renderComposer = (props, colors) => (
  <Composer
    {...props}
    textInputStyle={{
      backgroundColor: colors.elevation.level2,
      color: colors.onBackground,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: colors.onBackground,
      paddingHorizontal: 18,
      marginLeft: 5,
      lineHeight: 18,
      minHeight: 51,
      textAlignVertical: 'center',
    }}
  />
)

export const renderSend = (props, colors) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}
  >
    <IconButton
      icon="send-sharp"
      size={25}
      iconColor={colors.onBackground}
    />
  </Send>
)
