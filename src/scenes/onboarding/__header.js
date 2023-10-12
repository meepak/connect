import React from 'react'
import {
  View,
} from 'react-native'
import {
  Text,
} from 'react-native-paper'
import Avatar from '../../components/Avatar'
import styles from './styles'

const ScreenHeader = ({
  fullName, onAvatarChanged,
}) => (
  <>
    <View style={styles.headerContainer}>
      <Avatar
        size="large"
        onEdited={(item) => onAvatarChanged(item)}
      />
      <View style={styles.headerContent}>
        <Text style={styles.headerTextGreeting}>Welcome,</Text>
        <Text style={styles.headerTextName}>{fullName}</Text>
      </View>
    </View>
    <Text style={[styles.greetingNote]}>Please introduce yourself.</Text>
  </>
)

export default ScreenHeader
