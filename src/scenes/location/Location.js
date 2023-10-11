import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

// TODO -- geolocation autocomplete
const SelectLocation = ({
  onLocationSelected,
}) => {
  const handleSelect = (suggestion) => {
    onLocationSelected(`${suggestion.city}, ${suggestion.country}`)
  }

  return (
    <GooglePlacesAutocomplete
      placeholder="Enter city and country"
      onSelect={handleSelect}
    />
  )
}

export default SelectLocation
