import React from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated'
import { Svg } from 'react-native-svg'
import PropTypes from 'prop-types'

const WaveBgAnimated = ({
  frequency,
  amplitude,
  window: initialWindow,
  width,
  height,
  offset,
  color,
  flip,
  top,
  bottom,
  zIndex,
}) => {
  const animatedPath = useSharedValue('')

  const getPath = (window) => {
    const numPoints = 100
    const angularFrequency = 2 * Math.PI * frequency

    let wavePath = '100 0, 0 0 '

    for (let i = 0; i <= numPoints; i += 1) {
      const x = (i / numPoints) * width + window
      const y = amplitude * Math.sin(angularFrequency * x) + offset

      wavePath += `, ${x} ${y}`
    }

    animatedPath.value = wavePath
  }

  React.useEffect(() => {
    getPath(initialWindow)
  }, [frequency, amplitude, width, height, offset, flip, color])

  const animatedProps = useAnimatedProps(() => ({
    points: animatedPath.value,
  }))

  const style = {
    width: '100%',
    transform: [{ rotate: flip ? '180deg' : '0deg' }],
    position: 'absolute',
    zIndex,
    top,
    bottom,
  }

  return (
    <View style={style}>
      <Svg width="100%" height={200} viewBox="0 0 100 100" preserveAspectRatio="none">
        <Animated.Polygon animatedProps={animatedProps} fill={color} />
      </Svg>
    </View>
  )
}

WaveBgAnimated.propTypes = {
  frequency: PropTypes.number.isRequired,
  amplitude: PropTypes.number.isRequired,
  window: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  flip: PropTypes.bool,
  color: PropTypes.string,
  top: PropTypes.number,
  bottom: PropTypes.number,
  zIndex: PropTypes.number,
}

WaveBgAnimated.defaultProps = {
  window: 0,
  flip: false,
  color: '#0000FF',
  top: null,
  bottom: null,
  zIndex: -1,
}

export default WaveBgAnimated
