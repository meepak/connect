import React, { useEffect, useContext } from 'react'
import { Keyboard } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import { useNavigation, useTheme } from '@react-navigation/native'
import { PreferencesContext } from '../../context'
import LoadingScreen from '../loading-screen'
import ErrorScreen from '../error-screen'

const ScreenTemplate = (props) => {
  const {
    isLoading, isError, children,
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar hidden={false} animated={false}  style={preferences.isDark ? 'light' : 'dark'} backgroundColor={colors.background} />
        { children }
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  )
}

ScreenTemplate.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

ScreenTemplate.defaultProps = {
  isLoading: false,
  isError: false,
}

export default ScreenTemplate
