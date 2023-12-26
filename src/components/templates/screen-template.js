import React, { useContext, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'react-native-paper'
import LoadingScreen from '../animated/loading/loading-screen'
import ErrorScreen from '../error-screen'
import { PreferencesContext } from '../../context'

const ScreenTemplate = (props) => {
  const {
    isLoading, isError, children, onTouchStart, onTouchEnd,
  } = props
  const navigation = useNavigation()
  const preferences = useContext(PreferencesContext)
  const { colors } = useTheme()

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
      <GestureHandlerRootView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}>
        <StatusBar hidden={false} style={preferences.isDark ? 'light' : 'dark'} />
        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: colors.background }}>
          { children }
        </SafeAreaView>
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
