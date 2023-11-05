import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context' // This suppose to work better when there is no header bar
import { StatusBar } from 'expo-status-bar'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import LoadingScreen from './LoadingScreen'
import ErrorScreen from './ErrorScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
})

// TODO onTouchStart, onTouchEnd, sometime throwing error when touched too fast,
// onTouchEnd firing before onTouchStart or something like that
const ScreenTemplate = (props) => {
  const {
    isLoading, isError, children, onTouchStart, onTouchEnd,
  } = props

  if (isError) {
    // console.log('Screen Template received IsError')
    return <ErrorScreen />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <StatusBar />
          { children }
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
