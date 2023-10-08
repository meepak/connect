import React, { useRef } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { useColorScheme } from 'react-native'
import {colors} from '../theme'

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
})

export default function LoadingScreen() {
  const animation = useRef(null)
  const scheme = useColorScheme()

  const bgColor = scheme === 'dark' ? colors.black : colors.white

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <LottieView
        ref={animation}
        // source={require('../../assets/lottie/loading-animation-hands.json')}
        source={require('../../assets/lottie/98288-loading.json')} // TODO load via prop for different use cases
        autoPlay
      />
    </View>
  )
}
