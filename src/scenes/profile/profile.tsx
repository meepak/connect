import React from 'react'
import { useRoute } from '@react-navigation/native'
import { View } from 'react-native'

// Temporary measure to get user id of logged in user to test banner upload
import ProfileCore from '@/scenes/profile/profile-core'

const Profile = () => {
  const route = useRoute()
  const props = route.params
  return (
    <View style={{ flex: 1 }}>
      <ProfileCore {...props} />
    </View>
  )
}

export default Profile
