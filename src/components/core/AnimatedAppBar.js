import React from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from 'react-native-paper'

export default function AnimatedAppBar({ translateY, children }) {
  const { colors } = useTheme()
  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.background,
        width: '100%',

        // for animation
        height: 64,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        elevation: 4,
        zIndex: 1,
      }}
    >
      {children}
    </Animated.View>
  )
}

AnimatedAppBar.propTypes = {
  translateY: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}
