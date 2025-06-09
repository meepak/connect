/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Day, utils } from 'react-native-gifted-chat'
import Bubble from './slack-bubble' // Updated import

const { isSameUser, isSameDay } = utils

const Message = (props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: 15,
      marginRight: 15,
    },
    slackAvatar: {
      height: 45,
      width: 45,
      borderRadius: 8,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent', // Background color for the date box
      borderRadius: 20, // Adjust the border radius as needed
      borderWidth: 1,
      borderColor: props.colors.surfaceVariant,
      width: 120,
      alignSelf: 'center',
      padding: 2,
      marginTop: 20,
      marginBottom: 30,
    },
    dateWrapper: {
      // position: 'absolute',
      // top: '50%',
      // left: 0,
      // right: 0,
      // height: 1,
      // backgroundColor: '#ccc',
      // transform: 'translateY(-50%)',
    },
    dateText: {
      fontWeight: 'bold',
    },
  })

  const getInnerComponentProps = () => {
    const {
      containerStyle, ...otherProps // Removed colors and fonts from here
    } = props
    return {
      ...otherProps,
      position: 'left',
      isSameUser,
      isSameDay,
    }
  }

  const renderDay = () => {
    if (props.currentMessage.createdAt) {
      const dayProps = getInnerComponentProps()
      if (props.renderDay) {
        return props.renderDay(dayProps)
      }
      return (
        <Day {...dayProps} containerStyle={styles.dateContainer} wrapperStyle={styles.dateWrapper} />
      )
    }
    return null
  }

  const renderBubble = () => {
    const bubbleProps = getInnerComponentProps()
    if (props.renderBubble) {
      return props.renderBubble(bubbleProps)
    }
    return <Bubble {...bubbleProps} colors={props.colors} fonts={props.fonts} /> // Pass colors and fonts as props
  }

  const renderAvatar = () => {
    let extraStyle
    if (
      isSameUser(props.currentMessage, props.previousMessage)
      && isSameDay(props.currentMessage, props.previousMessage)
    ) {
      extraStyle = { height: 0 }
    }

    const avatarProps = getInnerComponentProps()
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: [styles.slackAvatar, avatarProps.imageStyle, extraStyle],
        }}
      />
    )
  }

  const marginBottom = isSameUser(
    props.currentMessage,
    props.nextMessage,
  ) ? 2 : 20

  return (
    <View>
      {renderDay()}
      <View
        style={[
          styles.container,
          { marginBottom },
          props.containerStyle,
        ]}
      >
        {renderAvatar()}
        {renderBubble()}
      </View>
    </View>
  )
}

export default Message
