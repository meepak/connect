import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet, View, FlatList, ScrollView, Dimensions, Platform,
} from 'react-native'
import {
  IconButton, Text, useTheme, TextInput,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import { KeyboardAwareScrollView, KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate'
import Icon from '../../components/core/Icon'

const Styles = (colors, fonts) => StyleSheet.create({
  headerContent: {
    backgroundColor: colors.elevation.level3, // colors.elevation.level3,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    maxHeight: 90,
    zIndex: 1,
  },
  headerPadding: {
    backgroundColor: colors.elevation.level3,
    height: 30,
    width: '100%',
    zIndex: 1,

  },
  searchBox: {
    width: '100%',
    height: 55,
    backgroundColor: colors.elevation.level3, // colors.elevation.level3
  },
  icon: {
    backgroundColor: colors.transparent,
  },
  content: {
    position: 'absolute',
    top: 90,
    left: 0,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.background,
    // borderWidth: 1,
    // borderColor: colors.surface,
    zIndex: 3,
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
  const searchBoxWidth = Dimensions.get('window').width - 150
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
      textElements.push(<Text style={{ marginVertical: 3 }} key={i}>Search history record {i}</Text>)
    }
    return (
      <View>
        {textElements}
      </View>
    )
  }

  return (
    <ScreenTemplate>

      <View style={styles.headerContent}>
        <TextInput
          ref={inputRef}
          width={searchBoxWidth}
          placeholder="Search"
          backgroundColor={colors.elevation.level3}
          activeUnderlineColor={colors.elevation.level3}
          underlineColor={colors.elevation.level3}
          underlineColorAndroid={colors.elevation.level3}
          selectionColor={colors.onBackground}
          cursorColor={colors.onBackground}
          placeholderTextColor={colors.onBackground}
          style={styles.searchBox}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          returnKeyType="search"
          left={(
            <TextInput.Icon
              icon={() => (
                <Icon
                  name="arrow-left"
                  size={24}
                  color={colors.onBackground}
                />
              )}
              onPress={() => navigation.goBack()}
              forceTextInputFocus={false}
              style={styles.icon}
            />
          )}
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
      <View style={styles.headerPadding} />

      <View style={styles.content}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
        >
          <Text style={{ fontSize: fonts.titleLarge.fontSize, fontWeight: 'bold' }}>Recent Searches</Text>

          <DummyContent />

        </KeyboardAwareScrollView>
      </View>
      {/* <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      /> */}
    </ScreenTemplate>
  )
}
