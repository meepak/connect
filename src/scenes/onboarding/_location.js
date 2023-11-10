import React, { useState, useEffect } from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import { useNavigation, useRoute } from '@react-navigation/native'
import Button from '../../components/core/Button'
import { colors } from '../../theme'

import styles from './styles'

// TODO -- geolocation autocomplete
const SelectLocation = ({
  onBusinessLocationChanged, question, initialValue,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(initialValue)
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    if (route.params?.selectedAddress) {
      // doesn't this suppose to do automatic merging,
      // anyway can be looked at when such use case arises
      const item = route.params.selectedAddress
      setSelectedAddress(item)
      onBusinessLocationChanged(item)
    }
  }, [route.params?.selectedAddress])

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
          navigation.navigate('SelectLocation', {
            title: 'Preferred location',
          })
        }}
      />

    </Surface>
  )
}

SelectLocation.propTypes = {
  question: PropTypes.string,
  onBusinessLocationChanged: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
}

SelectLocation.defaultProps = {
  question: null,
  initialValue: '',
}

export default SelectLocation
