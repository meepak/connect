import React, { useContext, useState } from 'react'
import { Alert } from 'react-native'
import {
  IconButton, Text, Card, Menu,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { useAtom } from 'jotai'
import { auth } from '../../../firebase'
import { UserDataContext } from '../../../context'
import AvatarOfAuthUser from '../../../components/avatar-of-auth-user'
import userAuthenticatedAtom from '../../../utils/atom'

// Will provide button for Edit Profile, Sign Out, Delete Account (scroll to the bottom)
const Account = () => {
  const navigation = useNavigation()
  const [menuVisible, setMenuVisible] = useState(false)
  const { userData, setUserData } = useContext(UserDataContext)
  const [, setUserAuthenticated] = useAtom(userAuthenticatedAtom)

  // will need more work regarding unsubscribing from snapshot
  const onSignOutPress = () => {
    signOut(auth)
      .then(() => {
        // console.log('onSignOutPress')
        setUserData({})
        setUserAuthenticated(null)
        // Restart() // do not restart, just go back to pre login page
      })
      .catch((error) => {
        console.log(`on sign out press - ${error.message}`)
      })
  }

  const openProfile = () => {
    navigation.navigate('ProfileStack', {
      screen: 'Profile',
      params: {
        userId: userData.id,
        userFullName: userData.fullName,
        userAvatar: userData.avatar,
        userBannerImage: userData.bannerImage,
      },
    })
  }

  return (
    <Card
      mode="contained"
    >
      {/* <Card.Cover source={userData.avatar} /> */}
      <Card.Title
        title="Account"
        titleVariant="headlineSmall"
        left={() => <AvatarOfAuthUser size={42} rounded />}
        right={() => (
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={(
              <IconButton
                icon="three-bars"
                onPress={() => setMenuVisible(true)}
              />
            )}
          >
            <Menu.Item
              onPress={() => {
                setMenuVisible(false)
                openProfile()
              }}
              title="Edit Profile"
            />
            <Menu.Item
              onPress={() => {
                setMenuVisible(false)
                onSignOutPress()
              }}
              title="Sign Out"
            />
            <Menu.Item
              onPress={() => {
                setMenuVisible(false)
                Alert.alert('Info', 'To be implemented')
              }}
              title="Disable Account"
            />
            <Menu.Item
              onPress={() => {
                setMenuVisible(false)
                Alert.alert('Info', 'To be implemented')
              }}
              title="Delete Account"
            />
          </Menu>
        )}
      />
      <Card.Content>
        <Text variant="bodyLarge">
          {userData.fullName}
        </Text>
        <Text variant="bodyMedium">
          {userData.email}
        </Text>
        <Text variant="bodySmall">
          Member since {userData.createdAt?.toDate()?.toLocaleDateString()}
        </Text>
      </Card.Content>
    </Card>
  )
}

export default Account
