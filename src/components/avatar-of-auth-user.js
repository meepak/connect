import React, { useContext, useEffect, useState } from 'react'
import {
  View,
} from 'react-native'
import {
  IconButton,
  useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import Avatar from './core/avatar'
import { UserDataContext } from '../context'
import ImageSelectAndUpload from '../utils/image-select-and-upload'

// const styles = StyleSheet.create({
//   progressView: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     zIndex: 1,
//   },
//   progressText: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     fontWeight: 'bold',
//   },
// })

const getIconSize = (size) => {
  const sizeMap = {
    xlarge: 32, large: 22, medium: 12, small: 8,
  }
  if (typeof size === 'string') {
    return sizeMap[size] ?? 8
  }
  return Math.round(size / 7)
}

// TODO implement onError, return error within onEdited
const AvatarOfAuthUser = ({
  rounded, size, onEdited, onPress,
}) => {
  const { colors } = useTheme()
  const iconSize = getIconSize(size)
  const { userData } = useContext(UserDataContext)
  // const [setProgress] = useState('')
  const [avatar, setAvatar] = useState(userData.avatar ?? null)

  useEffect(() => {
    setAvatar(userData.avatar)
  }, [userData.avatar])

  const handleAvatarUpdated = (updatedAvatar) => {
    if (updatedAvatar) {
      if (onEdited) {
        onEdited(updatedAvatar)
      }
    }
  }

  return (
    <View>
      {/* {progress
        ? (
          <View style={[styles.progressView, { backgroundColor: colors.background }]}>
            <Text style={[styles.progressText, { fontSize: iconSize, color: colors.primary }]}>{progress}</Text>
          </View>
        )
        : <></>} */}

      <Avatar
        size={size}
        rounded={rounded}
        fullName={userData.fullName ?? null}
        url={avatar ?? null}
        onPress={() => {
          if (onEdited) {
            ImageSelectAndUpload({ userId: userData.id, onFinished: handleAvatarUpdated })
          } else if (onPress) {
            onPress()
          }
          // onEdited ? ImageChoiceAndUpload() : (onPress ? onPress() : () => {})
        }}
        style={{
          backgroundColor: colors.background,
        }}
      >
        {onEdited
          ? (
            // TODO: move this as an option within Avatar component
            <IconButton
              style={{
                backgroundColor: colors.onPrimary,
                borderRadius: 20,
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
              size={iconSize}
              icon='plus'
              iconColor={colors.primary}
              onPress={() => (
                ImageSelectAndUpload({ userId: userData.id, onFinished: handleAvatarUpdated })
              )}
            />
          )
          : <></>}
      </Avatar>
    </View>
  )
}

AvatarOfAuthUser.propTypes = {
  rounded: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onEdited: PropTypes.func,
  onPress: PropTypes.func,
}

AvatarOfAuthUser.defaultProps = {
  rounded: true,
  onEdited: null,
  onPress: null,
}

export default AvatarOfAuthUser
