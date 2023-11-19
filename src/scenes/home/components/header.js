import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Button from '../../../components/core/button'
import HeaderBar from './header-bar'
import NotificationSummaries from './notification-summary/notification-summaries'

const Styles = () => StyleSheet.create({
  headerContainer: {
    marginTop: 7,
  },
  searchButton: {
    width: '100%',
    textAlign: 'left',
  },
  searchBarContainer: {
    marginTop: 10,
  },
})

// eslint-disable-next-line react/prop-types
const Header = ({ handleNotificationIconPress }) => {
  const { colors, fonts } = useTheme()
  const styles = Styles()
  const navigation = useNavigation()

  const openSearch = () => {
    navigation.navigate('SearchStack', {
      screen: 'Search',
    })
  }

  return (
    <View style={styles.headerContainer}>
      <HeaderBar onBgColor={colors.onBackground} />
      <View style={styles.searchBarContainer}>
        <Button
          onPress={() => openSearch()}
          mode="contained"
          style={styles.searchButton}
          icon="search"
          iconSize={18}
          label="&nbsp;&nbsp;Search"
          backgroundColor={colors.surfaceDisabled}
          color={colors.onBackground}
          alignLabel="flex-start"
          fontSize={fonts.bodyLarge.fontSize}
        // marginHorizontal={10}
          marginVertical={5}
          paddingHorizontal={30}
          elevation={2}
        />
      </View>
      <NotificationSummaries
        handleIconPress={(value) => handleNotificationIconPress(value)}
      />
    </View>
  )
}

export default Header
