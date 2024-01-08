import React, { useContext } from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  useTheme, Text,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { UserDataContext } from '../../../context'
import Button from '@/components/core/button'
import NotificationSummaries from './notification-summary'
import RenderCounter from '@/components/render-counter'

const Styles = () => StyleSheet.create({
  headerContainer: {
    paddingTop: 10,
    marginBottom: 11,
  },
  searchButton: {
    width: '100%',
    textAlign: 'left',
  },
  searchBarContainer: {
    marginTop: 10,
  },
  hi: {
    marginHorizontal: 15,
    fontWeight: 700,
  },
})

// eslint-disable-next-line react/prop-types
const Header = React.memo(({ handleNotificationIconPress, handleProfilePress }) => {
  const { colors, fonts } = useTheme()
  const styles = Styles()
  const navigation = useNavigation()
  const { userData } = useContext(UserDataContext)

  const openSearch = () => {
    navigation.navigate('SearchStack', {
      screen: 'Search',
    })
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.hi} variant="headlineLarge">Hi {userData.fullName.split(' ')[0]}</Text>
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
          elevation={10}
        />
      </View>

      <NotificationSummaries
        handleIconPress={(value) => handleNotificationIconPress(value)}
        handleProfilePress={(item) => handleProfilePress(item)}
      />
      <RenderCounter title="header" />
    </View>
  )
})

export default Header
