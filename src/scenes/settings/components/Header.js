import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'

const Styles = (colors) => StyleSheet.create({
  headerContent: {
    backgroundColor: colors.elevation.level3, // colors.elevation.level3,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: 'red',
  },
})
const Header = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = Styles(colors)

  const openSearch = () => {
    // console.log(`Lets go to notification window -- ${tempNotificationSimulation}`)
    navigation.navigate('SearchStack', {
      screen: 'Search',
    })
  }

  return (
    <View style={styles.headerContent}>
      <IconButton
        icon="arrow-left"
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
