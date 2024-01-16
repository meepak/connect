import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import * as shape from 'd3-shape'

const { width, height } = Dimensions.get('window')
const AnimatedPath = Animated.createAnimatedComponent(Path)

const numOfPeriods = 2
const amplitude = 30
const verticalShift = 50

// Create multiple waves with different amplitudes, frequencies, and phases
const waves = Array.from({ length: 10 }, (_, i) => {
  const phase = Math.random() * Math.PI * 2 // Random phase
  const freq = (i + 1) / 10 // Increasing frequency
  const amp = amplitude / (i + 1) // Decreasing amplitude
  return shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)(
    Array.from({ length: width }, (x, i) => ({
      x: i,
      y:
        amp *
          Math.sin((i / width) * (2 * Math.PI * numOfPeriods) * freq + phase) +
        verticalShift,
    })),
  )
})

export default function App() {
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    ).start()
  }, [])

  const d = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [waves[0], waves[9]],
  })

  return (
    <Svg width={width} height={height}>
      <AnimatedPath d={d} fill="lightblue" />
    </Svg>
  )
}
