import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import LottieView from 'lottie-react-native'

const { width, height } = Dimensions.get('window')
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

// TODO -- This is called form all over the places, handle the background color for this in better way
const LoadingScreen = () => {
  const { colors } = useTheme()
  // console.log('LoadingScreen.js -- LoadingScreen called')
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LottieView
        // source={require('../../assets/lottie/loading-animation-hands.json')}
        source={require('../../../../assets/lottie/98288-loading.json')} // TODO load via prop for different use cases
        autoPlay
      />
    </View>
  )
}

export default LoadingScreen
