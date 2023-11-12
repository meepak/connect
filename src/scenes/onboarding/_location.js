import React, { useState, useEffect } from 'react'
import {
  Surface, Text, Divider, useTheme, Button,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import { useNavigation, useRoute } from '@react-navigation/native'
// import Button from '../../components/core/Button'

import Styles from './Styles'

// TODO -- geolocation autocomplete
const SelectLocation = ({
  onBusinessLocationChanged, question, initialValue, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
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
    <Surface style={styles.card} onLayout={onLayout}>
      <Text style={styles.question}>
        {question || 'Where is your business located?'}
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
      </Text>
      <Divider style={styles.divider} />

      <Text style={styles.answer}>
        {selectedAddress}
      </Text>

      <Button
        onPress={() => {
          navigation.navigate('SelectLocation', {
            title: 'Preferred location',
          })
        }}
        mode="contained"
        style={styles.selectButton}
        icon="location"
        textColor={colors.onPrimaryContainer}
      >
        <Text style={styles.selectButtonText}>Select Location</Text>
      </Button>

    </Surface>
  )
}

SelectLocation.propTypes = {
  question: PropTypes.string,
  onBusinessLocationChanged: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectLocation.defaultProps = {
  question: null,
  initialValue: '',
  error: false,
}

export default SelectLocation
