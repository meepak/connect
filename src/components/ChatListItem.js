/* eslint-disable react/prop-types */
// To be decided on the user object will pass through to here
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Text, Divider, TouchableRipple, useTheme,
} from 'react-native-paper'
import Avatar from './core/Avatar'

const ChatListItem = ({
  name, industry, /* location, occupation, isPromoted */ image, onPress,
}) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      marginTop: 10,
      marginBottom: 5,
      justifyContent: 'space-between',
    },
    Image: {
      alignSelf: 'flex-start',
    //   width: 64,
    //   height: 64,
    //   borderRadius: 32,
    },
    Info: {
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    Title: {
      fontSize: 18,
    },
    Company: {
      fontSize: 16,
    },
    Location: {
      fontSize: 14,
    },
    Rate: {
      fontSize: 16,
    },
    divider: {
      marginTop: 5,
    },
    DateAgo: {
      flex: 1,
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: 20,
    },
    Date: {
      fontSize: 12,
      color: colors.surfaceVariant,
    },
  })

  return (
    <TouchableRipple
      onPress={() => {
        // console.log('Pressed but onPress not yet handled.')
        onPress()
      }}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <View style={styles.container}>
        <Avatar fullName={name} url={image} style={styles.Image} width={55} height={55} rounded />
        <View style={styles.Info}>
          <Text style={styles.Title}>{name}</Text>
          <Text style={styles.Company}>{industry}</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.DateAgo}>
          <Text style={styles.Date}>Thurs</Text>
        </View>
      </View>
    </TouchableRipple>
  )
}

export default ChatListItem
