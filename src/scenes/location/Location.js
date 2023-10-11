import React from 'react'
import {
  StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { layout } from '../../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
})
// TODO -- geolocation autocomplete
const SelectLocation = ({ route }) => {
  const navigation = useNavigation()

  const handleSelect = (selectedAddress) => {
    // console.log(`closing screen, ${selectedAddress} has been selected.`)
    route.params.onReturn(selectedAddress)
    navigation.goBack()
  }

  return (
    <GooglePlacesAutocomplete
      styles={styles}
      placeholder="Enter city and country"
      // fetchDetails for details param on onPress
      onPress={(data) => {
        handleSelect(data.description)
      }}
      query={{
        key: 'AIzaSyDSfNDyxe_X5EpgkcdJw4zYovB-P5FtBTw',
        language: 'en',
      }}
    />
  )
}

export default SelectLocation
