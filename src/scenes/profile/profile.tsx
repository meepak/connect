import React from 'react'
import { useRoute } from '@react-navigation/native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScreenTemplate } from '../../components/templates'

// Temporary measure to get user id of logged in user to test banner upload
import ProfileCore from './profile-core'

const Profile = () => {
  const route = useRoute()
  const props = route.params
  const insets = useSafeAreaInsets()
  return (
    <ScreenTemplate>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <ProfileCore {...props} />
      </View>
    </ScreenTemplate>
  )
}

export default Profile
