import React, { useEffect } from 'react'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
  withSequence,
} from 'react-native-reanimated'
import PropTypes from 'prop-types'

const AnimatedLogo = ({ play }) => {
  const logoPath = 'M61.169 30.954l38.49 13.564C92.586 28 60.075-1.874 60.075-1.874 11.46-11.736-30.75-63.9-21.084-113.5c9.667-49.602 56.916-81.817 105.533-71.955 48.618 9.863 80.194 58.068 70.527 107.67-7.766 39.848-43.937 71.29-81.437 75.894 51.395.689 112.261 15.497 144.28 54.573 32.02 39.077 54.985 94.724 48.373 161.798 87.357-75.643 128.263-194.085 94.621-307.058C323.12-219.161 206.227-305.881 73.688-305.592c-132.538.288-249.049 87.516-286.187 214.26-33.482 114.266 4.763 236.03 94.372 311.124 1.126-53.87 16.883-120.855 47.854-157.867C-39.302 24.913-1.067 10.832 44.844 7.229L34.42 33.103c1.96-1.265 15.423 1.212 26.749-2.15 3.901 32.932 36.188 100.452 16.546 166.019C47.189 125.237 57.71 22.63 61.169 30.954'

  const AnimatedPath = Animated.createAnimatedComponent(Path)
  const opacity = useSharedValue(1) // Shared value for opacity

  const totalLength = 3859.421875
  const animatedLength = useSharedValue(0)

  useEffect(() => {
    if (!play) return
    animatedLength.value = withRepeat(
      withSequence(
        withDelay(2000,
          withTiming(totalLength, {
            duration: 5000, // Duration for tracing
            easing: Easing.linear,
          })),
        // withDelay(2000), // Delay before fading out
        withDelay(2000,
          withTiming(0, {
            duration: 5000, // Duration for fading out
            easing: Easing.linear,
          })),
      ),
      -1,
      true,
    )
    // Separate animation for opacity
    opacity.value = withSequence(
      withTiming(0.2, { duration: 5000 }), // Initial faint opacity
      // withDelay(5000), // Delay before fading out
      withTiming(1, { duration: 5000 }), // Return to full opacity
    )
  }, [])

  const animatedStyle = play ? useAnimatedStyle(() => ({
    strokeDashoffset: animatedLength.value,
    strokeDasharray: [totalLength, animatedLength.value],
    strokeOpacity: opacity.value, // Adjust opacity for the faint line
  })) : null

  return (
    <Svg
      width="50%"
      height="50%"
      viewBox="0 0 730.06695 678.02655"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d={logoPath}
        transform="translate(280.811 373.098) scale(1.13778)"
        display="inline"
        fill="none"
        stroke="#512dab"
        strokeWidth={40}
        strokeLinecap="round"
        strokeMiterlimit={4}
        paintOrder="markers stroke fill"
      />
      <AnimatedPath
        d={logoPath}
        transform="translate(280.811 373.098) scale(1.13778)"
        display="inline"
        fill="none"
        stroke="#ffff00"
        strokeWidth={40}
        strokeLinecap="round"
        style={animatedStyle}
        strokeMiterlimit={4}
        paintOrder="markers stroke fill"
      />
    </Svg>
  )
}

AnimatedLogo.propTypes = {
  play: PropTypes.bool,
}
AnimatedLogo.defaultProps = {
  play: true,
}

export default AnimatedLogo
