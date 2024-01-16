import React, { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function App() {
  const [animations] = useState(() => [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ])

  useEffect(() => {
    Animated.stagger(
      500,
      animations.map((animation) =>
        Animated.loop(
          Animated.timing(animation, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ),
      ),
    ).start()
  }, [])

  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
          <Stop offset="0" stopColor="blue" stopOpacity="1" />
          <Stop offset="1" stopColor="blue" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      {animations.map((animation, index) => (
        <AnimatedCircle
          key={index}
          cx="50"
          cy="50"
          r={animation.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 50],
          })}
          stroke="url(#grad)"
          strokeWidth={index % 2 === 0 ? 2 : 10}
          fill="transparent"
          opacity={animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          })}
        />
      ))}
    </Svg>
  )
}
