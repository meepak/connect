/**
 * NOTIFICATION TYPES -- INFO (i), ACTION (alert), REMINDER (clock)
 * ***************************************************
 * This component will provide brief summary of notifications within homepage
 * details of notifications will be in it's own screen
 * ***************************************************
 * NOTIFICATION SECTION (View & perform relevant action)
 * View new notifications.
 * View past notificatons..
 * Open, mark as read, delete or remind later action kn each notification
 * Type of notifications --
 * - Connect Requests received/accepted **go to connection mgt page --- ACTION
 * - KYC Requests / done **go to kyc page -- ACTION
 * - NDA Requests / signed **go to NDA page -- ACTION
 * - NDA/Background Check due date reminders **go to nda/kyc page -- REMINDER
 * - Scheduled Meeting reminder --no action -- REMINDER
 * - Note reminder set by yourself to you to take some action --no action -- REMINDER
 * - New message received in chat **go to chat --- BADGE IN CHAT ICON
 * - Connected User profile update **view profile -- INFO
 * - New potential matches **see in home page -- rest of the page is dedicated to -- INFO-- UPDATE LIST HEADER BELOW THIS
 * ****************************************************
 *
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'
import generateMockData from '../../util/mockData'
import NotificationSummary from './NotificationSummary'

const Styles = () => StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 15,
    // marginHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  content: {
    marginTop: 20,
  },
})

const getConnectionRequestUpdates = () => {
  const mockItems = generateMockData(1, 7)
  const content = mockItems.map((item) => ({
    key: item.key,
    name: item.name,
    image: item.image,
    userId: item.id,
    navigateTo: 'profile',
  }))
  return {
    icon: 'bell',
    title: 'Connection requests (7)',
    dataItems: { content },
  }
}

const getNdaUpdates = () => {
  const mockItems = generateMockData(1, 1)
  const content = mockItems.map((item) => ({
    key: item.key,
    name: item.name,
    image: item.image,
    userId: item.id,
    navigateTo: 'nda',
  }))
  return {
    icon: 'bell',
    title: 'Nda requests (1)',
    dataItems: { content },
  }
}
const getBgCheckUpdates = () => {
  const mockItems = generateMockData(1, 3)
  const content = mockItems.map((item) => ({
    key: item.key,
    name: item.name,
    image: item.image,
    userId: item.id,
    navigateTo: 'bgCheck',
  }))
  return {
    icon: 'bell',
    title: 'Background Check requests (3)',
    dataItems: { content },
  }
}

const NotificationSummaries = () => {
  const { colors } = useTheme()
  const styles = Styles()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge">Notifications</Text>
        <Text style={{ textDecorationLine: 'underline' }} color={colors.onBackground}>
          View all
        </Text>
      </View>
      <View style={styles.content}>
        <Divider />
        <NotificationSummary {...getConnectionRequestUpdates()} />
        <Divider />
        <NotificationSummary {...getNdaUpdates()} />
        <Divider />
        <NotificationSummary {...getBgCheckUpdates()} />
        <Divider />
      </View>
    </View>
  )
}
export default NotificationSummaries
