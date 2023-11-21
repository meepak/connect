import React from 'react'
import { useRoute } from '@react-navigation/native'
import { ScreenTemplate } from '../../components/templates'

// Temporary measure to get user id of logged in user to test banner upload
import ProfileCore from './profile-core'

const Profile = () => {
  const route = useRoute()
  const props = route.params
  return (
    <ScreenTemplate>
      <ProfileCore {...props} />
    </ScreenTemplate>
  )
}

export default Profile
