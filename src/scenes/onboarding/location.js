import React, { useState } from 'react'
import { Alert } from 'react-native'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native'
import TextInputBox from '../../components/TextInputBox'

import styles from './styles'

// TODO -- geolocation autocomplete
const SelectLocation = ({
  businessLocation, onBusinessLocationChanged,
}) => {
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const navigation = useNavigation()

  const handleSelect = (suggestion) => {
    setSelectedCity(suggestion.city)
    setSelectedCountry(suggestion.country)
  }

  return (
    <Surface style={styles.card}>
      <Text style={styles.greetingMessage}>
        Where is your business located?
      </Text>
      <Divider style={styles.divider} />
      <TextInputBox
        placeholder="City, Country"
        onChangeText={(text) => {
        //   setLocation(text)
          onBusinessLocationChanged(text)
        }}
        value=""
        // value={`${selectedCity}, ${selectedCountry}`}
        autoCapitalize="none"
        label="Business Location"
        onFocus={() => {
          Alert.alert(process.env.GOOGLE_PLACES_API_KEY)
          // navigation.navigate('Select Location')
        }}
      />

      {/* <GooglePlacesAutocomplete
        placeholder="Enter city and country"
        onSelect={handleSelect}
      /> */}

    </Surface>
  )
}

export default SelectLocation
