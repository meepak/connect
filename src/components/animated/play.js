import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedProps,
  Easing,
} from 'react-native-reanimated'
import { Svg, Circle } from 'react-native-svg'

const styles = StyleSheet.create({
  box: {
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 64,
  },
})

export default function Animation() {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)

  const width = useSharedValue(10)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const r = useSharedValue(10)
  const delay = 1000
  let timerId = null

  const handlePress = () => {
    const value = width.value > 0 ? width.value - 200 : width.value + 500
    width.value = withSpring(value)
    // const txValue = translateX.value > 10 ? translateX.value - 200 : translateX.value + 200
    // translateX.value = withSpring(txValue)
    const tyValue = translateY.value > 0 ? translateY.value - 400 : translateY.value + 300
    translateY.value = withSpring(tyValue)
    r.value = withSpring(r.value > 10 ? r.value -= 100 : r.value += 200)
  }

  useEffect(() => {
    timerId = setInterval(handlePress, delay)
    return () => {
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      }
    }
  }, [])

  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value, {
      duration: 500,
      //   easing: Easing.inOut(Easing.quad),
      easing: Easing.bezier(1, -1, 0, 2),
    //   reduceMotion: ReduceMotion.System,
    }),
  }))

  return (
    <>
      <Animated.View style={{ ...styles.box, width, transform: [{ translateX }, { translateY }] }} />
      <Svg>
        <AnimatedCircle
          cx="50%"
          cy="30%"
          fill="#b50cd0"
          animatedProps={animatedProps}
        />
      </Svg>
    </>
  )
}
