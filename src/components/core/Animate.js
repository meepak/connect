import React, { useState, useEffect } from 'react'
import {
  Animated,
} from 'react-native'
import PropTypes from 'prop-types'

const Animate = ({
  children,
}) => {
  const [animationTiming] = useState(new Animated.Value(0))

  useEffect(() => {
    const animation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationTiming, {
            toValue: -1,
            duration: 100,
            delay: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animationTiming, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(animationTiming, {
            toValue: -1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(animationTiming, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(animationTiming, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }

    animation()
  }, [animationTiming])

  const rotation = animationTiming.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  })

  return (
    <Animated.View style={{ alignSelf: 'center', transform: [{ rotate: rotation }] }}>
      {children}
    </Animated.View>
  )
}

Animate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Animate
