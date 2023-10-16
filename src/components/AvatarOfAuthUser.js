import React, { useContext, useState } from 'react'
import {
  Alert, View, StyleSheet, Platform,
} from 'react-native'
import {
  Text, useTheme,
} from 'react-native-paper'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import PropTypes from 'prop-types'
import { Avatar as SystemAvatar } from '@rneui/themed'
import Avatar from './core/Avatar'
import { storage } from '../firebase'
import { UserDataContext } from '../context/UserDataContext'

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

const valiatedSize = (size) => {
  const validSizes = ['xlarge', 'large', 'medium', 'small']
  return validSizes.includes(size) ? size : validSizes[3]
}
const getIconSize = (size) => {
  const sizeMap = {
    xlarge: 32, large: 22, medium: 12, small: 8,
  }
  return sizeMap[size] ?? 8
}

// TODO implement onError, return error within onEdited
const AvatarOfAuthUser = ({ size, onEdited, onPress }) => {
  const { colors } = useTheme()
  const validSize = valiatedSize(size)
  const iconSize = getIconSize(validSize)
  const { userData } = useContext(UserDataContext)
  const [progress, setProgress] = useState('')
  const [avatar, setAvatar] = useState(userData.avatar ?? null)

  const ImageChoiceAndUpload = async () => {
    try {
      if (Platform.OS === 'ios') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert('Error', 'Permission is required for use.')
          return
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      })
      if (!result.canceled) {
        const actions = []
        actions.push({ resize: { width: 300 } })
        const manipulatorResult = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          actions,
          {
            compress: 0.4,
          },
        )
        const localUri = await fetch(manipulatorResult.uri)
        const localBlob = await localUri.blob()
        const filename = userData.id + new Date().getTime()
        const storageRef = ref(storage, `avatar/${userData.id}/${filename}`)
        const uploadTask = uploadBytesResumable(storageRef, localBlob)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progressVar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(`${parseInt(progressVar, 10)}%`)
          },
          (error) => {
            console.log(error)
            Alert.alert('Error', 'Upload failed.')
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setProgress('')
              setAvatar(downloadURL)
              onEdited(downloadURL)
            })
          },
        )
      }
    } catch (e) {
      console.log('error', e.message)
      Alert.alert('Error', 'The size may be too much.')
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
        size={validSize}
        rounded
        title={userData.fullName ?? null}
        url={avatar ?? null}
        onPress={() => {
          if (onEdited) {
            ImageChoiceAndUpload()
          } else if (onPress) {
            onPress()
          }
          // onEdited ? ImageChoiceAndUpload() : (onPress ? onPress() : () => {})
        }}
      >
        {onEdited
          ? (
            <SystemAvatar.Accessory
              size={iconSize}
              onPress={() => (
                ImageChoiceAndUpload()
              )}

      // containerStyle={{ bottom: 10, right: 7 }}
            />
          )
          : <></>}
      </Avatar>
    </View>
  )
}

AvatarOfAuthUser.propTypes = {
  size: PropTypes.string.isRequired,
  onEdited: PropTypes.func,
  onPress: PropTypes.func,
}

AvatarOfAuthUser.defaultProps = {
  onEdited: null,
  onPress: null,
}

export default AvatarOfAuthUser
