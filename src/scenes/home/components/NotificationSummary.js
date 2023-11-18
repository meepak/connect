/**
 * ***************************************************
 * This component will provide brief summary of notifications within homepage
 * details of notifications will be in it's own screen
 * ***************************************************
 * NOTIFICATION SECTION (View & perform relevant action)
 * View new notifications.
 * View past notificatons..
 * Open, mark as read, delete or remind later action kn each notification
 * Type of notifications --
 * - New potential matches **see in home page
 * - Connect Requests accepted/received **go to connection mgt page
 * - KYC Requests / done **go to kyc page
 * - NDA Requests / signed **go to NDA page
 * - New message received in chat **go to chat
 * - Connected User profile update **view profile
 * - NDA/Background Check due date reminders **go to nda/kyc page
 * - Scheduled Meeting reminder --no action
 * - Note reminder set by yourself to you to take some action --no action
 *
 */
import React, { useState } from 'react'
import { Text } from 'react-native-paper'

const NotificationSummary = () => {
  const [state, setState] = useState()
  setState('Hello World')
  return (
    <Text>{state}</Text>
  )
}

export default NotificationSummary
