import React, {
  forwardRef, useEffect, useImperativeHandle, useRef,
} from 'react'
import {
  StyleSheet, View, Platform, Keyboard,
} from 'react-native'
import {
  useTheme, Searchbar,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'

const Styles = (colors) => StyleSheet.create({
  headerContent: {
    backgroundColor: colors.elevation.level3, // colors.elevation.level3,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    // maxHeight: 90,
    zIndex: 1,
  },
  searchbar: {
    margin: 4,
    width: '100%',
  },
})

const Header = forwardRef(({ searchQuery, onSearchQueryChange }, ref) => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = Styles(colors)
  // const searchBoxWidth = Dimensions.get('window').width - 150
  // const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null)
  useImperativeHandle(ref, () => inputRef.current)

  useEffect(() => {
    const delay = Platform.OS === 'android' ? 400 : 500
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, delay)
  }, [inputRef])

  return (
    <View style={styles.headerContent}>
      <Searchbar
        ref={inputRef}
        placeholder="Search"
        onChangeText={(query) => onSearchQueryChange(query)}
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
  )
})

Header.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
}

export default Header
