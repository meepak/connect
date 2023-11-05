import React, { useContext, useState } from 'react'
import {
  View, StyleSheet,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import { Avatar as SystemAvatar } from '@rneui/themed'
import Avatar from './core/Avatar'
import { UserDataContext } from '../context/UserDataContext'
import ImageSelectAndUpload from '../utils/ImageSelectAndUpload'

const styles = StyleSheet.create({
  progressView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    zIndex: 1,
  },
  progressText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
})

const getIconSize = (size) => {
  const sizeMap = {
    xlarge: 32, large: 22, medium: 12, small: 8,
  }
  if (typeof size === 'string') {
    return sizeMap[size] ?? 8
  }
  return Math.round(size / 5)
}

// TODO implement onError, return error within onEdited
const AvatarOfAuthUser = ({ size, onEdited, onPress }) => {
  const { colors } = useTheme()
  const iconSize = getIconSize(size)
  const { userData } = useContext(UserDataContext)
  const [progress, setProgress] = useState('')
  const [avatar, setAvatar] = useState(userData.avatar ?? null)

  const handleAvatarUpdated = (updatedAvatar) => {
    if (updatedAvatar) {
      setAvatar(updatedAvatar)
      if (onEdited) {
        onEdited(updatedAvatar)
      }
    }
  }
  return (
    <View>
      {progress
        ? (
          <View style={[styles.progressView, { backgroundColor: colors.background }]}>
            <Text style={[styles.progressText, { fontSize: iconSize, color: colors.primary }]}>{progress}</Text>
          </View>
        )
        : <></>}

      <Avatar
        size={size}
        rounded
        fullName={userData.fullName ?? null}
        url={avatar ?? null}
        onPress={() => {
          if (onEdited) {
            ImageSelectAndUpload({ userId: userData.id, setProgress, onFinished: handleAvatarUpdated })
          } else if (onPress) {
            onPress()
          }
          // onEdited ? ImageChoiceAndUpload() : (onPress ? onPress() : () => {})
        }}
      >
        {onEdited
          ? (
            <SystemAvatar.Accessory
              containerStyle={{
                backgroundColor: colors.onPrimary,
                borderRadius: 20,
              }}
              style={{
                position: 'absolute',
                right: 5,
                bottom: 7,
              }}
              size={iconSize}
              iconProps={{
                name: 'add-circle', // Use the plus sign icon name
                size: iconSize,
                color: colors.primary,
                // bottom: 10,
                // right: 7,
              }}
              onPress={() => (
                ImageSelectAndUpload({ userId: userData.id, setProgress, onFinished: handleAvatarUpdated })
              )}
            />
          )
          : <></>}
      </Avatar>
    </View>
  )
}

AvatarOfAuthUser.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onEdited: PropTypes.func,
  onPress: PropTypes.func,
}

AvatarOfAuthUser.defaultProps = {
  onEdited: null,
  onPress: null,
}

export default AvatarOfAuthUser
