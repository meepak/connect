import {
  Alert, Platform,
} from 'react-native'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { storage } from '../firebase'

const ImageSelectAndUpload = async ({
  userId, setProgress, onFinished, resizeWidth, imageCompression,
}) => {
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
      actions.push({ resize: { width: resizeWidth ?? 300 } })
      const manipulatorResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        actions,
        {
          compress: imageCompression ?? 0.4,
        },
      )
      const localUri = await fetch(manipulatorResult.uri)
      const localBlob = await localUri.blob()
      const filename = userId + new Date().getTime()
      const storageRef = ref(storage, `avatar/${userId}/${filename}`)
      const uploadTask = uploadBytesResumable(storageRef, localBlob)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressVar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(`${parseInt(progressVar, 10)}%`)
        },
        (error) => {
          throw error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setProgress('')
              console.log('upload finished...')
              onFinished(downloadURL)
            })
            .catch((error) => {
              throw error
            })
        },
      )
    }
  } catch (e) {
    // console.log('error', e.message)
    Alert.alert('Error', 'The size may be too much.')
  }
}

export default ImageSelectAndUpload
