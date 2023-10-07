import React, { useContext } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import PropTypes from 'prop-types'
import { colors } from '../theme'
import { ColorSchemeContext } from '../context/ColorSchemeContext'
import LoadingScreen from './LoadingScreen'
import ErrorScreen from './ErrorScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
})

const ScreenTemplate = (props) => {
  const { isLoading, isError, children, onTouchStart, onTouchEnd } = props
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const container = isDark ? styles.darkContainer : styles.container

  if (isLoading) {
    return <LoadingScreen />
  }

  if (isError) {
    return <ErrorScreen />
  }

  return (
    <SafeAreaView style={container} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
