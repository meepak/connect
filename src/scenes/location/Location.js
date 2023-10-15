import React from 'react'
import {
  StyleSheet,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import PropTypes from 'prop-types'
import { layout } from '../../theme'

// TODO -- geolocation autocomplete
const SelectLocation = ({ route }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    label: {
      margin: layout.marginLeft,
    },
    textInputContainer: {
      flexDirection: 'row',
      marginLeft: layout.marginLeft,
      marginRight: layout.marginRight,
    },
    textInput: {
      backgroundColor: colors.secondary,
      height: 44,
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 15,
      flex: 1,
      borderColor: colors.primary,
    },
    poweredContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopWidth: 0.5,
      backgroundColor: colors.background,
    },
    powered: {
      tintColor: colors.onBackground,
    },
    listView: {
      marginLeft: layout.marginLeft,
      marginRight: layout.marginRight,
      color: colors.onBackground,
    },
    row: {
      color: colors.onSurface,
      backgroundColor: colors.surface,
      padding: 13,
      height: 44,
      flexDirection: 'row',
    },
    separator: {
      height: 0.5,
      backgroundColor: colors.outline,
    },
    description: {},
    loader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 20,
    },
  })

  const handleSelect = (selectedAddress) => {
    // console.log(`closing screen, ${selectedAddress} has been selected.`)
    route.params.onReturn(selectedAddress)
    navigation.goBack()
  }

  const renderRow = (row) => (
    <Text style={styles.row}>
      {row.description}
    </Text>
  )

  return (
    <>
      <Text style={styles.label}>Please select location.</Text>
      <GooglePlacesAutocomplete
        styles={styles}
        textInputProps={{
          color: colors.onSecondary,
          placeholderTextColor: colors.onSecondary,
        }}
        placeholder="Enter your location"
        renderRow={renderRow}
      // fetchDetails for details param on onPress
        onPress={(data) => {
          handleSelect(data.description)
        }}
        query={{
          key: 'AIzaSyDSfNDyxe_X5EpgkcdJw4zYovB-P5FtBTw', // TODO - https://reactnative.dev/docs/security#storing-sensitive-info
          language: 'en',
        }}
      />
    </>
  )
}

SelectLocation.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      onReturn: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
}

export default SelectLocation
