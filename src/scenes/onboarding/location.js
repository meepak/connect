import React, { useState } from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import TextInputBox from '../../components/TextInputBox'

import styles from './styles'

// TODO -- geolocation autocomplete
const SelectLocation = ({
  onBusinessLocationChanged,
}) => {
  const [selectedAddress, setSelectedAddress] = useState('')
  const navigation = useNavigation()

  return (
    <Surface style={styles.card}>
      <Text style={styles.greetingMessage}>
        Where is your business located?&nbsp;
      </Text>
      <Divider style={styles.divider} />
      <TextInputBox // Todo replace with button
        placeholder="City, Country"
        onChangeText={(text) => {
        //   setLocation(text)
          // onBusinessLocationChanged(text)
          console.log(`was text changed to ?? ${text}`)
        }}
        value={selectedAddress}
        autoCapitalize="none"
        label="Business Location"
        onFocus={() => {
          navigation.navigate('Select Location', {
            onReturn: (item) => {
              setSelectedAddress(item)
              onBusinessLocationChanged(item)
            },
          })
        }}
      />

    </Surface>
  )
}

export default SelectLocation
