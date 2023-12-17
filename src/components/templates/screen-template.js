import React, { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../loading-screen'
import ErrorScreen from '../error-screen'

const ScreenTemplate = (props) => {
  const {
    isLoading, isError, children,
  } = props
  const navigation = useNavigation()
  // const preferences = useContext(PreferencesContext)
  // const { colors } = useTheme()

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
