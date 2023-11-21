import React, {
  useState, useLayoutEffect, useRef, useEffect,
} from 'react'
import {
  StyleSheet, View, Platform,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { layout } from '../../theme'
import { ScreenTemplate } from '../../components/templates'

// TODO -- geolocation autocomplete
const SelectLocation = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const [title] = useState(route.params?.title || '')
  // since I can't trigger search, not pre-populating search box for now
  // const [search] = useState(route.params?.search || '')
  const inputRef = useRef(null)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: colors.onBackground,
      title,
    })
  }, [navigation, title])

  useEffect(() => {
    const delay = Platform.OS === 'android' ? 100 : 500
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setAddressText('')
        inputRef.current.focus()
      }
    }, delay)
  })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
    },
    listView: {
      marginLeft: layout.marginLeft,
      marginRight: layout.marginRight,
      color: colors.onBackground,
    },
    row: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.transparent,
      borderBottomWidth: 1,
      borderBottomColor: colors.surfaceDisabled,
    },
    rowText1: {
      paddingTop: 10,
      paddingLeft: 10,
      color: colors.onBackground,
    },
    rowText2: {
      paddingLeft: 10,
      paddingBottom: 10,
      color: colors.onBackground,
    },
  })

  const handleSelect = (selectedAddress) => {
    // pity navigation.goBack() can't include params
    navigation.dispatch((state) => {
      const prevRoute = state.routes[state.routes.length - 2]
      return CommonActions.navigate({
        name: prevRoute.name,
        params: {
          selectedAddress,
        },
        merge: true,
      })
    })
  }

  const renderRow = (rowData) => {
    const main = rowData.structured_formatting.main_text
    const secondary = rowData.structured_formatting.secondary_text
    return (
      <View style={styles.row}>
        <Text style={styles.rowText1}>
          {main}
        </Text>
        <Text style={styles.rowText2}>
          {secondary}
        </Text>
      </View>
    )
  }

  return (
    <ScreenTemplate>
      {
        title === ''
          ? <Text style={styles.label}>Please select location.</Text>
          : <View style={{ marginVertical: 10 }} />
      }
      <GooglePlacesAutocomplete
        ref={inputRef}
        enablePoweredByContainer={false}
        suppressDefaultStyles
        styles={styles}
        textInputProps={{
          color: colors.onBackground,
          placeholderTextColor: colors.onBackground,
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.onBackground,
          textColor: colors.onBackground,
        }}
        placeholder="Enter business name, address or landmarks"
        renderRow={renderRow}
      // fetchDetails for details param on onPress
        onPress={(data) => {
          handleSelect(data.description)
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY, // TODO - https://reactnative.dev/docs/security#storing-sensitive-info
          language: 'en',
        }}
      />
    </ScreenTemplate>
  )
}

export default SelectLocation
