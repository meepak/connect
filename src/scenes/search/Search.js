import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet, View, FlatList, ScrollView, Dimensions, Platform, StatusBar, Keyboard,
} from 'react-native'
import {
  IconButton, Text, useTheme, TextInput, Searchbar,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import { KeyboardAwareScrollView, KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
// import Voice, {
//   SpeechRecognizedEvent,
//   SpeechResultsEvent,
//   SpeechErrorEvent,
// } from '@react-native-voice/voice'

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    shadowColor: colors.onBackground,
    shadowOffset: { width: -10, height: -10 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
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
    // margin: 4,
  },

})

export default function Search() {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  // const searchBoxWidth = Dimensions.get('window').width - 150
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null)

  // #region Voice input

  // https://github.com/react-native-voice/voice/blob/master/example/src/VoiceTest.tsx

  const [recognized, setRecognized] = useState('')
  const [volume, setVolume] = useState('')
  const [error, setError] = useState('')
  const [end, setEnd] = useState('')
  const [started, setStarted] = useState('')
  const [results, setResults] = useState([])
  const [partialResults, setPartialResults] = useState([])


  const clearState = () => {
    setRecognized('')
    setVolume('')
    setError('')
    setEnd('')
    setStarted('')
    setResults([])
    setPartialResults([])
  }

  const onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e)
    setStarted('√')
  }

  const onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized: ', e)
    setRecognized('√')
  }

  const onSpeechEnd = (e) => {
    console.log('onSpeechEnd: ', e)
    setEnd('√')
  }

  const onSpeechError = (e) => {
    console.log('onSpeechError: ', e)
    setError(JSON.stringify(e.error))
  }

  const onSpeechResults = (e) => {
    console.log('onSpeechResults: ', e)
    setResults(e.value)
  }

  const onSpeechPartialResults = (e) => {
    console.log('onSpeechPartialResults: ', e)
    setPartialResults(e.value)
  }

  const onSpeechVolumeChanged = (e) => {
    console.log('onSpeechVolumeChanged: ', e)
    setVolume(e.value)
  }


  // useEffect(() => {
  //   Voice.onSpeechStart = onSpeechStart
  //   Voice.onSpeechRecognized = onSpeechRecognized
  //   Voice.onSpeechEnd = onSpeechEnd
  //   Voice.onSpeechError = onSpeechError
  //   Voice.onSpeechResults = onSpeechResults
  //   Voice.onSpeechPartialResults = onSpeechPartialResults
  //   Voice.onSpeechVolumeChanged = onSpeechVolumeChanged

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners)
  //   }
  // }, [])

  const startRecognizing = async () => {
    clearState()
    try {
      await Voice.start('en-US')
      console.log('called start')
    } catch (e) {
      console.error(e)
    }
  }

  const stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel()
    } catch (e) {
      console.error(e)
    }
  }

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy()
    } catch (e) {
      console.error(e)
    }
    clearState()
  }

  // #region Voice input end

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
          icon={{ source: 'arrow-left', direction: 'auto' }}
          style={styles.searchbar}
          traileringIcon={() => (
            <MatIcon
              name="microphone-outline"
              size={24}
              style={{ color: colors.onBackground }}
            />
          )}
          traileringIconAccessibilityLabel="microphone button"
          onTraileringIconPress={startRecognizing}
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
