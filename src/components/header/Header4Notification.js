import React from 'react'
import { View, StyleSheet } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'

export default function Header4Notification() {
  const { colors } = useTheme()

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
  })

  const openManageNotification = () => {
    // console.log("Let's go to Notification Management")
  }

  return (
    <View style={styles.header}>
      <IconButton
        icon="ellipsis-vertical-outline"
        color={colors.onBackground}
        size={20}
        onPress={() => openManageNotification()}
      />
    </View>
  )
}
