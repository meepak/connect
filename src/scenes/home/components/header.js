import React, { useContext, useState } from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  useTheme, Text, Button as TestButton,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { UserDataContext } from '../../../context/user-data-context'
import Button from '../../../components/core/button'
import NotificationSummaries from './notification-summary'
import ProfileSheet from '../../../sheets/profile-sheet'

const Styles = () => StyleSheet.create({
  headerContainer: {
    paddingBottom: 25,
  },
  searchButton: {
    width: '100%',
    textAlign: 'left',
  },
  searchBarContainer: {
    marginTop: 10,
  },
  hi: {
    marginTop: 22,
    marginHorizontal: 15,
    fontWeight: 700,
  },
})

// eslint-disable-next-line react/prop-types
const Header = ({ handleNotificationIconPress }) => {
  const { colors, fonts } = useTheme()
  const styles = Styles()
  const navigation = useNavigation()
  const { userData } = useContext(UserDataContext)
  const [showProfileTest, setShowProfileTest] = useState(false)

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
          elevation={2}
        />
      </View>

      <TestButton
        onPress={() => setShowProfileTest(true)}
        mode="outlined"
        style={styles.addSection}
        icon="plus"
        textColor={colors.onBackground}
      >
        <Text variant="bodyLarge">Test Profile in Sheet</Text>
      </TestButton>

      <NotificationSummaries
        handleIconPress={(value) => handleNotificationIconPress(value)}
      />
      <ProfileSheet show={showProfileTest} onClose={() => { setShowProfileTest(false) }} />
    </View>
  )
}

export default Header
