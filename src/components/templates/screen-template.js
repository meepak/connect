import React, { useEffect, useContext } from 'react'
import { Keyboard } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { PreferencesContext } from '../../context'
import LoadingScreen from '../loading-screen'
import ErrorScreen from '../error-screen'

// TODO onTouchStart, onTouchEnd, sometime throwing error when touched too fast,
// onTouchEnd firing before onTouchStart or something like that
const ScreenTemplate = (props) => {
  const {
    isLoading, isError, children, onTouchStart, onTouchEnd,
  } = props
  const navigation = useNavigation()
  const preferences = useContext(PreferencesContext)

  if (isError) {
    // console.log('Screen Template received IsError')
    return <ErrorScreen />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  // If keyboard was active in screen remove it
  useEffect(() => navigation.addListener('beforeRemove', () => {
    // TODO -- Probably don't need in iOS, test and put condition
    if (Keyboard.isVisible()) {
      Keyboard.dismiss()
    }
  }), [navigation])

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView
        style={{ flex: 1 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <StatusBar style={preferences.isDark ? 'light' : 'dark'} />
        { children }
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  )
}

ScreenTemplate.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
}

ScreenTemplate.defaultProps = {
  isLoading: false,
  isError: false,
  onTouchStart: null,
  onTouchEnd: null,
}

export default ScreenTemplate
