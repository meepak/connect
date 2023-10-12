import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Autocomplete from 'react-native-autocomplete-input'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { layout, fontSize, colors } from '../../theme'

const styles = StyleSheet.create({
  saveView: {
    flex: 1,
  },
  container: {
    position: 'relative',
    // backgroundColor: '#F5FCFF',
    flex: 1,

    // Android requires padding to avoid overlapping
    // with content and autocomplete
    paddingTop: layout.marginTop,
    marginLeft: layout.marginLeft,
    marginEnd: layout.marginRight,

    // Make space for the default top bar
    ...Platform.select({
      android: {
        marginTop: 25,
      },
      default: {
        marginTop: 0,
      },
    }),
  },
  itemText: {
    fontSize: fontSize.middle,
    // margin: 2,
    marginBottom: 10,
    borderBlockColor: colors.darkInput,
    borderBottomColor: colors.primary,
    // backgroundColor: colors.blueLight,
  },
  // descriptionContainer: {
  //   // `backgroundColor` needs to be set otherwise the
  //   // autocomplete input will disappear on text input.
  //   backgroundColor: '#F5FCFF',
  //   marginTop: 8,
  // },
  infoText: {
    textAlign: 'center',
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    // padding: 5,
  },
})

const loadOccupations = async () => {
  const occupationsJSON = await AsyncStorage.getItem('occupation')
  const occupations = JSON.parse(occupationsJSON)
  return occupations
}

const Occupation = ({ route }) => {
  const navigation = useNavigation()

  const handleSelect = (selectedAddress) => {
    // console.log(`closing screen, ${selectedAddress} has been selected.`)
    route.params.onReturn(selectedAddress)
    navigation.goBack()
  }
  const [allOccupations, setAllOccupations] = useState([])
  const [searchResult, setSearchResult] = useState([])

  const [query, setQuery] = useState('')
  const isLoading = !allOccupations.length

  const placeholder = isLoading
    ? 'Loading data...'
    : 'Enter occupation'

  useEffect(() => {
    if (!query) {
      setSearchResult([])
      return
    }

    // Normalize the query and the titles to lowercase for case-insensitive comparison
    const normalizedQuery = query.toLowerCase()

    // Find all matches that include the normalized query
    const matches = allOccupations.filter((item) => item.title.toLowerCase().includes(normalizedQuery)) ?? []

    // console.log(`search for ${JSON.stringify(matches)}`)
    setSearchResult(matches)
  }, [allOccupations, query])

  useEffect(() => {
    loadOccupations().then((item) => setAllOccupations(item))
  }, [])

  return (
    <SafeAreaView style={styles.saveView}>
      <View style={styles.container}>
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            editable={!isLoading}
            autoCorrect={false}
            data={searchResult}
            value={query}
            onChangeText={setQuery}
            placeholder={placeholder}
            flatListProps={{
              keyboardShouldPersistTaps: 'never',
              // keyExtractor: (movie: Movie) => movie.episodeId,
              renderItem: ({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item.title)}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
              ),
              onPress: { handleSelect },
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Occupation
