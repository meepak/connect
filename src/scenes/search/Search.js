import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet, View, Platform, Keyboard,
} from 'react-native'
import {
  Text, useTheme, Searchbar,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ScreenTemplate from '../../components/ScreenTemplate'

const Styles = (colors, fonts) => StyleSheet.create({
  headerContent: {
    backgroundColor: colors.elevation.level3, // colors.elevation.level3,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    // maxHeight: 90,
    zIndex: 1,
  },
  headerPadding: {
    backgroundColor: colors.elevation.level3,
    height: 35,
    width: '100%',
    zIndex: 1,
  },
  content: {
    top: -20,
    marginBottom: -20,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.background,
    // borderWidth: 1,
    // borderColor: 'red',
    // shadowColor: colors.onBackground,
    // shadowOffset: { width: -10, height: -10 },
    // shadowOpacity: 0.7,
    // shadowRadius: 5,
    elevation: 5,
    zIndex: 3,
  },
  scrollView: {
    // flex: 1,
    paddingHorizontal: 30,
    // paddingVertical: 20,
  },

  spinnerView: {
    paddingVertical: 20,
  },

  searchbar: {
    margin: 4,
    width: '100%'
  },

})

export default function Search() {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  // const searchBoxWidth = Dimensions.get('window').width - 150
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
        <Searchbar
          ref={inputRef}
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          onIconPress={() => {
            Keyboard.dismiss()
            navigation.goBack()
          }}
          onClearIconPress={() => {
            Keyboard.dismiss()
          }}
          icon={{ source: 'chevron-left', direction: 'auto' }}
          style={styles.searchbar}
          // voice search is a least priority as OS keyboard provides that feature
          // traileringIcon={() => (
          //   <MatIcon
          //     name="microphone-outline"
          //     size={24}
          //     style={{ color: colors.onBackground }}
          //   />
          // )}
          // traileringIconAccessibilityLabel="microphone button"
          // onTraileringIconPress={() => console.log('voice input :(')}
        />
      </View>
      <View style={styles.headerPadding} />

      <View style={styles.content}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontWeight: 'bold' }} variant="titleLarge">Recent Searches</Text>

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
