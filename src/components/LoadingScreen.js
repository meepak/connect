import React, { useRef, useContext } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { ColorSchemeContext } from '../context/ColorSchemeContext'

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  animation: {
    width: width * 0.25,
    height: height * 0.25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBg: {
    backgroundColor: '#000000',
  },
  lightBg: {
    backgroundColor: '#ffffff',
  },
})

export default function LoadingScreen() {
  const animation = useRef(null)
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'

  return (
    <View style={[styles.container, isDark ? styles.darkBg : styles.lightBg]}>
      <LottieView
        ref={animation}
        // source={require('../../assets/lottie/loading-animation-hands.json')}
        source={require('../../assets/lottie/98288-loading.json')} // TODO load via prop for different use cases
        style={[styles.animation, isDark ? styles.darkBg : styles.lightBg]}
        autoPlay
      />
    </View>
  )
}
