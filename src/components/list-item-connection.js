/* eslint-disable react/prop-types */
// To be decided on the user object will pass through to here
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Text, Divider, useTheme, IconButton,
} from 'react-native-paper'
import Avatar from './core/avatar'

const ListItemConnection = ({
  name, industry, location, /* occupation, isPromoted */ image, date, onYes, onNo,
}) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.2,
      // shadowRadius: 4,
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
      width: '80%',
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
    buttons: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: 20,
    },
    Date: {
      fontSize: 9,
      color: colors.surfaceVariant,
    },
  })

  return (
    <View style={styles.container}>
      <Avatar fullName={name} url={image} style={styles.Image} width={55} height={55} rounded />
      <View style={styles.Info}>
        <Text style={styles.Title}>{name}</Text>
        <Text style={styles.Company}>{industry}</Text>
        <Text style={styles.Location}>{location}</Text>
        <Text style={styles.Location}>{date}</Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.buttons}>
        {onYes
          ? (
            <IconButton
              icon="thumbsup"
              size={20}
              onPress={onYes}
            />
          )
          : <></>}
        {onNo
          ? (
            <IconButton
              icon="thumbsdown"
              size={20}
              onPress={onNo}
            />
          )
          : <></>}
      </View>
    </View>
  )
}

export default ListItemConnection
