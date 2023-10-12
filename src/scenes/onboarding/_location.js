import React, { useState } from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button'
import { colors } from '../../theme'

import styles from './styles'

// TODO -- geolocation autocomplete
const SelectLocation = ({
  onBusinessLocationChanged, question
}) => {
  const [selectedAddress, setSelectedAddress] = useState('')
  const navigation = useNavigation()

  return (
    <Surface style={styles.card}>
      <Text style={styles.question}>
        {question || 'Where is your business located?'}
      </Text>
      <Divider style={styles.divider} />


      <Text style={styles.answer}>
        {selectedAddress}
      </Text>

      <Button
        label="Select"
        color={colors.tertiary}
        onPress={() => {
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
