import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  IconButton, Text, useTheme,
} from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
// import AvatarOfAuthUser from './AvatarOfAuthUser'

export default function Header4Chat() {
  const { colors, fonts } = useTheme()
  const route = useRoute()
  const {
    userId, userFullName,
  } = route.params

  const styles = StyleSheet.create({
    header: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end', // Change this to 'flex-end' to align the IconButton component to the right
      width: '100%',
      color: colors.onBackground,
      marginEnd: 20,
    },
    button: {
      borderRadius: 6,
      width: '75%',
      height: 36,
      alignItems: 'flex-start',
      marginLeft: 10,
      marginRight: 15,
    },
    iconButton: {
      alignSelf: 'flex-end',
    },
    userNameLabel: {
      color: colors.onBackground,
      fontSize: fonts.titleLarge.fontSize,
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
  })

  const openManageChat = () => {
    // console.log('Lets go to chat')
  }

  // console.log(`current user id is -- use this to fetch more user info or save to db?? ${userId}`)

  return (
    <View style={styles.header}>

      <Text style={styles.userNameLabel}>
        {userFullName}
      </Text>

      <IconButton
        icon="menu"
        color={colors.onBackground}
        size={26}
        onPress={() => openManageChat()}
      />
    </View>
  )
}
