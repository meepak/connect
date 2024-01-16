import React, { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg'

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
        <RadialGradient id="grad" cx="50" cy="50" r="50">
          <Stop offset="0" stopColor="blue" stopOpacity="1" />
          <Stop offset="0.5" stopColor="blue" stopOpacity="0" />
          <Stop offset="1" stopColor="blue" stopOpacity="1" />
        </RadialGradient>
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
          strokeWidth={20}
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
