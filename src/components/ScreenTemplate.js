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
  const { isLoading, isError, children } = props
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
    <SafeAreaView style={container}>
      <StatusBar style="light" />
      { children }
    </SafeAreaView>
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
