import React, { useContext, useState } from 'react'
import {
  Alert, View, StyleSheet, Platform,
} from 'react-native'
import {
  Text,
} from 'react-native-paper'
import { Avatar as SystemAvatar } from '@rneui/themed'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import PropTypes from 'prop-types'
import { storage } from '../firebase'
import { UserDataContext } from '../context/UserDataContext'
import { colors } from '../theme'

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
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  progressText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 32,
  },
})

const mapNameToColor = (fullName) => {
  // Calculate a hash value for the full name
  let hash = 0
  for (let i = 0; i < fullName.length; i += 1) {
    hash += fullName.charCodeAt(i)
  }

  // Map the hash value to a number between 1 and 7
  const mappedNumber = (Math.abs(hash) % 7)
  const rainbow = ['#401B86', '#2546C9', '#2AD424', '#F0EC25', '#F07537', '#DB3A4C', '#9400D3']
  return rainbow[mappedNumber]
}

function extractInitials(fullName) {
  const words = fullName.split(' ')
  let initials = ''

  if (words.length === 1) {
    // For 1 word, return first and last character
    const name = words[0].toUpperCase()
    if (name.length >= 2) {
      initials = name.charAt(0) + name.charAt(name.length - 1)
    } else {
      initials = name.charAt(0)
    }
  } else if (words.length > 1) {
    // For more than 1 word, return the initial of the first and last word
    initials = words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase()
  }

  return initials
}

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
const Avatar = ({ size, onEdited }) => {
  const validSize = valiatedSize(size)
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
          <View style={styles.progressView}>
            <Text style={styles.progressText}>{progress}</Text>
          </View>
        )
        : <></>}

      <SystemAvatar
        size={validSize}
        rounded
        title={extractInitials(userData.fullName)}
        containerStyle={{ backgroundColor: mapNameToColor(userData.fullName) }}
        source={avatar ? { uri: avatar } : null}
        icon={onEdited ? { name: 'pencil' } : null}
        onPress={() => (
          ImageChoiceAndUpload()
        )}
      >
        {onEdited
          ? (
            <SystemAvatar.Accessory
              size={getIconSize(validSize)}
              onPress={() => (
                ImageChoiceAndUpload()
              )}
            />
          )
          : <></>}
      </SystemAvatar>
    </View>
  )
}

Avatar.propTypes = {
  size: PropTypes.string.isRequired,
  onEdited: PropTypes.func,
}

Avatar.defaultProps = {
  onEdited: null,
}

export default Avatar
