import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native'
import Autocomplete from 'react-native-autocomplete-input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { layout } from '../../theme'

const loadOccupations = async () => {
  const occupationsJSON = await AsyncStorage.getItem('occupation')
  const occupations = JSON.parse(occupationsJSON)
  return occupations
}

const Styles = (colors, fonts) => StyleSheet.create({
  saveView: {
    flex: 1,
  },
  label: {
    margin: layout.marginLeft,
  },
  container: {
    position: 'relative',
    flex: 1,

    // Android requires padding to avoid overlapping
    // with content and autocomplete
    paddingTop: layout.marginTop,
    marginLeft: layout.marginLeft,
    marginEnd: layout.marginRight,
    backgroundColor: colors.surface,

    // Make space for the default top bar
    ...Platform.select({
    // android: {
    //   marginTop: 25,
    // },
      default: {
        marginTop: 0,
      },
    }),
  },
  listContainer: {
    backgroundColor: colors.surface,
  },
  itemText: {
    fontSize: fonts.bodyLarge.fontSize,
    // margin: 2,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingTop: 5,
    backgroundColor: colors.surface,
    color: colors.onSurface,
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
  textInput: {
    backgroundColor: colors.primary,
    // color: colors.onPrimary,
  },
})

const Occupation = () => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const styles = Styles(colors, fonts)
  const [title] = useState(route.params?.title || '')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: colors.onBackground,
      title,
    })
  }, [navigation, title])

  const handleSelect = (selectedOccupation) => {
    // pity navigation.goBack() can't include params
    navigation.dispatch((state) => {
      const prevRoute = state.routes[state.routes.length - 2]
      return CommonActions.navigate({
        name: prevRoute.name,
        params: {
          selectedOccupation,
        },
        merge: true,
      })
    })
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
    loadOccupations()
      .then((item) => setAllOccupations(item))
      .catch((error) => console.log(error))
  }, [])

  return (
    <SafeAreaView style={styles.saveView}>
      <Text style={styles.label}>
        Please select occupation
      </Text>
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
              keyboardShouldPersistTaps: 'handled',
              // keyExtractor: (movie: Movie) => movie.episodeId,
              renderItem: ({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item.title)}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
              ),
              onPress: { handleSelect },
              backgroundColor: colors.surface,
              color: colors.onSurface,
            }}
            inputContainerStyle={styles.textInput}
            listContainerStyle={styles.listContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Occupation
