import React from 'react'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'


// TODO -- This is called form all over the places, handle the background color for this in better way
const AnimatedHandshakeLogo = () => {
  // console.log('LoadingScreen.js -- LoadingScreen called')
  return (
    <View style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        source={require('../../../../assets/lottie/fa.icon.json')} // TODO load via prop for different use cases
        autoPlay
      />
    </View>
  )
}

export default AnimatedHandshakeLogo
