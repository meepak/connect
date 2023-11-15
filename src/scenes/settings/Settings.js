import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet, View, FlatList, ScrollView, Dimensions, Platform, StatusBar,
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
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: 'red',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerPadding: {
    backgroundColor: colors.elevation.level3,
    height: 30,
    width: '100%',

  },
  pageTitle: {
    // flex:1,
    backgroundColor: colors.elevation.level3,
    height: 50,
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  titleText: {
    fontSize: fonts.displaySmall.fontSize,
    top: -15,
    left: 20,
  },
  content: {
    left: 0,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.background,
    // elevation: 4,
    // borderWidth: 1,
    // borderColor: colors.surface,
    shadowColor: colors.onBackground,
    shadowOffset: { width: -10, height: -10 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 3,
    // elevation: 3,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  foundation: {
    backgroundColor: colors.elevation.level3,
  },

  spinnerView: {
    paddingVertical: 20,
  },

})

export default function Settings() {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  const searchBoxWidth = Dimensions.get('window').width - 150
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null)

  const openSearch = () => {
    // console.log(`Lets go to notification window -- ${tempNotificationSimulation}`)
    navigation.navigate('SearchStack', {
      screen: 'Search',
    })
  }

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
        <IconButton
          icon="arrow-left"
          color={colors.onBackground}
          size={24}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon="search"
          color={colors.onBackground}
          size={20}
          onPress={openSearch}
        />
      </View>
      {/* <View style={styles.headerPadding} /> */}
      <View style={{ flex: 1 }}>
        <View style={styles.pageTitle}>
          <Text style={styles.titleText}>Settings</Text>
        </View>
        <View style={styles.foundation}>
          <View style={styles.content}>
            <KeyboardAwareScrollView
              style={styles.scrollView}
            />

          </View>
        </View>
      </View>
      {/* <Spinner
  visible={spinner}
  textStyle={{ color: colors.onSurface }}
  overlayColor="rgba(0,0,0,0.5)"
/> */}
    </ScreenTemplate>
  )
}
