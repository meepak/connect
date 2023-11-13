import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet, View, FlatList, StatusBar, ScrollView, Dimensions, Platform,
} from 'react-native'
import {
  IconButton, Text, useTheme, Searchbar, TextInput, Divider,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import Spinner from 'react-native-loading-spinner-overlay'
import { KeyboardAwareScrollView, KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate'
import Icon from '../../components/core/Icon'
import Button from '../../components/core/Button'

const Styles = (colors, fonts) => StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.elevation.level3,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9,
    height: 90,
  },
  headerContent: {
    backgroundColor: colors.elevation.level3,
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 90,
  },
  icon: {
    backgroundColor: colors.elevation.level3,
    right: 40,
    top: 2,
  },
  content: {
    position: 'absolute',
    top: 90,
    left: 0,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },

  spinnerView: {
    paddingVertical: 20,
  },

})

export default function Search() {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  const searchBoxWidth = Dimensions.get('window').width - 50
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const delay = Platform.OS === 'android' ? 100 : 200
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, delay)
  }, [inputRef])

  const DummyContent = () => {
    const N = 30
    const textElements = []
    for (let i = 1; i <= N; i += 1) {
      textElements.push(<Text style={{ marginVertical: 10 }} key={i}>Search history record {i}</Text>)
    }
    return (
      <View>
        {textElements}
      </View>
    )
  }

  return (
    <ScreenTemplate>

      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <IconButton
            icon="arrow-left"
            size={24}
            iconColor={colors.onBackground}
            onPress={() => navigation.goBack()}
          />
          <TextInput
            ref={inputRef}
            width={searchBoxWidth}
            placeholder="Search"
            backgroundColor={colors.elevation.level3}
            activeUnderlineColor={colors.elevation.level3}
            underlineColor={colors.elevation.level3}
            underlineColorAndroid={colors.elevation.level3}
            selectionColor={colors.surfaceVariant}
            cursorColor={colors.onBackground}
            placeholderTextColor={colors.onBackground}
            style={{ fontSize: fonts.bodyLarge.fontSize }}
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            returnKeyType="search"
            right={
            searchQuery.length > 0
              ? (
                <TextInput.Icon
                  icon={() => (
                    <Icon
                      name="x"
                      size={20}
                      color={colors.onBackground}
                    />
                  )}
                  onPress={() => setSearchQuery('')}
                  forceTextInputFocus={false}
                  style={styles.icon}
                />
              )
              : null
        }
          />
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
        >
          <Text style={{ fontSize: fonts.titleLarge.fontSize, fontWeight: 'bold' }}>Recent Searches</Text>

          <DummyContent />

        </ScrollView>
      </View>
      {/* <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      /> */}
    </ScreenTemplate>
  )
}
