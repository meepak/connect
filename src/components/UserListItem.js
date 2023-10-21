/* eslint-disable react/prop-types */
// To be decided on the user object will pass through to here
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Divider, TouchableRipple } from 'react-native-paper'
import Avatar from './core/Avatar'

const UserListItem = ({
  name, industry, location, occupation, isPromoted, image, onPress,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.2,
      // shadowRadius: 4,
      marginTop: 15,
    },
    Image: {
      alignSelf: 'flex-start',
    //   width: 64,
    //   height: 64,
    //   borderRadius: 32,
    },
    Info: {
      flex: 1,
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    Title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    Company: {
      fontSize: 16,
    },
    Location: {
      fontSize: 14,
    },
    Rate: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    Promoted: {
      padding: 4,
      borderRadius: 2,
      fontSize: 12,
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
        <Avatar fullName={name} url={image} style={styles.Image} width={55} height={55} rounded={false} />
        <View style={styles.Info}>
          <Text style={styles.Title}>{name}</Text>
          <Text style={styles.Company}>{industry}</Text>
          <Text style={styles.Location}>{location}</Text>
          <Text style={styles.Rate}>{occupation}</Text>
          {isPromoted && <Text style={styles.Promoted}>Promoted</Text>}
          <Divider />
        </View>
      </View>
    </TouchableRipple>
  )
}

export default UserListItem
