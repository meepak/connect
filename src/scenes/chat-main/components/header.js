import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
})
const Header = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()

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
      <IconButton
        icon="search"
        color={colors.onBackground}
        size={20}
        onPress={openSearch}
      />
    </View>
  )
}

export default Header
