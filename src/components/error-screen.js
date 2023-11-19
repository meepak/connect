import React, { useRef } from 'react'
import {
  StyleSheet, Dimensions, View, useTheme,
} from 'react-native'
import { Text } from 'react-native-paper'
import LottieView from 'lottie-react-native'

export default function ErrorScreen() {
  const animation = useRef(null)
  const { fonts } = useTheme()
  const { height, width } = Dimensions.get('window')

  const styles = StyleSheet.create({
    animation: {
      width: width * 0.3,
      height: height * 0.3,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: fonts.bodyLarge.fontSize,
    },
  })

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('../../assets/lottie/113121-error-404.json')}
        style={styles.animation}
        autoPlay
      />
      <Text style={styles.text}>Network Error</Text>
    </View>
  )
}
