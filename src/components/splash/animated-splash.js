import React from 'react'
import { View } from 'react-native'
import propTypes from 'prop-types'
import AnimatedLogo from '../svg-animation/animated-logo'
// import HandwrittenAnimation from '../svg-animation/hand'

const AnimatedSplash = ({ onLoaded }) => (
  <View
    pointerEvents="none"
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      zIndex: 9999,
      width: '100%',
      height: '100%',
    }}
  >
    <AnimatedLogo onLoaded={onLoaded} />
    {/* <HandwrittenAnimation /> */}
  </View>
)

AnimatedSplash.propTypes = {
  onLoaded: propTypes.func,
}

AnimatedSplash.defaultProps = {
  onLoaded: null,
}

export default AnimatedSplash
