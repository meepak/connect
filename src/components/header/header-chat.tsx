import React from 'react'
import {
  StyleSheet, View, // Platform,
} from 'react-native'
import {
  IconButton, Text, useTheme,
} from 'react-native-paper'
import { useRoute, useNavigation } from '@react-navigation/native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import AvatarOfAuthUser from './avatar-of-auth-user'

export default function HeaderChat() {
  // const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const route = useRoute()
  const {
    userFullName,
  } = route.params

  const styles = StyleSheet.create({
    headerContent: {
      top: 15, // Platform.OS === 'android' ? insets.top : 30,
      width: '100%',
      paddingBottom: 25,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 45,
    },
  })

  const openSearch = () => {
    // console.log(`Lets go to notification window -- ${tempNotificationSimulation}`)
    navigation.navigate('SearchStack', {
      screen: 'Search',
    })
  }

  return (
    <View style={styles.headerContent}>
      <IconButton
        icon="chevron-left"
        color={colors.onBackground}
        size={24}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.userNameLabel}>
        {userFullName}
      </Text>
      <IconButton
        icon="zap"
        color={colors.onBackground}
        size={20}
        onPress={openSearch}
      />
    </View>
  )
}
