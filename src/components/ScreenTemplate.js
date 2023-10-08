import React, { useContext } from 'react'
import { StyleSheet, SafeAreaView, useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import PropTypes from 'prop-types'
import { colors } from '../theme'
import LoadingScreen from './LoadingScreen'
import ErrorScreen from './ErrorScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // darkContainer: {
  //   flex: 1,
  //   backgroundColor: colors.black,
  // },
})

const ScreenTemplate = (props) => {
  const {
    isLoading, isError, children, onTouchStart, onTouchEnd,
  } = props
  // const scheme = useColorScheme()
  // const isDark = scheme === 'dark'
  // const container = isDark ? styles.container : styles.container

  if (isError) {
    console.log('Screen Template received IsError')
    return <ErrorScreen />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView style={styles.container} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <StatusBar />
      { children }
    </SafeAreaView>
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
