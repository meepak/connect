import React from 'react'
import {
  View,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import AvatarOfAuthUser from '@/components/avatar-of-auth-user'
import Styles from './styles'

const ScreenHeader = ({
  fullName, onAvatarChanged,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  return (
    <>
      <View style={styles.headerContainer}>
        <AvatarOfAuthUser
          size={80}
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
}
ScreenHeader.propTypes = {
  fullName: PropTypes.string.isRequired,
  onAvatarChanged: PropTypes.func.isRequired,
}
export default ScreenHeader
