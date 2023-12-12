/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import Svg, {
  Defs, LinearGradient, Path, Stop,
} from 'react-native-svg'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const ApV1 = (props) => {
  const {
    index, path, transform, shapeInside, onFinished, repeat,
  } = props

  const animatedLength = useSharedValue(0)

  const totalLength = 11

  const animatedStyle = useAnimatedStyle(() => ({
    // strokeDashoffset: startLength,
    // strokeDasharray: [startLength, animatedLength.value],
    strokeWidth: animatedLength.value,
  }))

  useEffect(() => {
    animatedLength.value = withRepeat(
      withTiming(
        totalLength,
        {
          duration: totalLength * 15,
          easing: Easing.elastic,
        },
        (finished) => {
          if (finished) {
            runOnJS(onFinished)(true, index)
          }
        },
      ),
      repeat ?? -1, true,
    )
  }, [])

  return (
    <AnimatedPath
      d={path}
      transform={transform || ''}
      fill="#7b1fa2"
      stroke="yellow"
      shapeInside={shapeInside || ''}
      style={animatedStyle}
    />
  )
}

const AnimatedLogo = ({ onLoaded }) => {
  const letterPaths = [
    'M351.611 61.64c-31.392-.496-61.69 13.463-82.802 36.488-24.354 22.896-36.468 54.552-51.833 83.426-10.467 13.841-29.837 4.85-44.322 9.455-21.403 1.579-43.333 20.477-41.329 43.096 1.329 24.328 31.995 17.582 42.136 3.355 20.265-10.615 28.513 19.24 20.814 33.707-7.093 24.365-14.624 49.191-27.6 71.16-16.863 22.342-47.168 29.044-63.557 51.591-7.859 11.79-6.245 27.58-1.396 40.127 12.608 18.082 35.937 14.28 54.387 10.34 31.24-4.521 49.77-33.948 63.28-59.675 18.014-35.529 22.704-75.723 35.575-113.025 12.245-19.762 39.183-1.606 39.417 17.126.04 17.758-2.15 36.064 5.166 52.932 5.85 16.283 26.37 18.267 41.298 17.865 27.657-2.283 49.744-33.412 38.047-59.814-16.428-35.396-10.86-75.857-2.306-112.521.462-20.06-28.187-19.861-36.763-5.785-15.318 17.927-21.687 43.314-41.352 57.38-22.645 7.274-34.883-22.118-23.473-39.091 6.737-19.833 9.901-43.567 27.23-57.348 17.515-13.913 37.94.246 56.987-.174 24.075.08 52.853-14.3 54.76-40.969 3.262-17.294-10.549-34.166-27.752-35.978-11.383-2.346-22.967-3.888-34.612-3.668z',
  ]

  const [letterPath, setLetterPath] = useState(letterPaths[0])

  const currentPath = useSharedValue(0)

  const Finished = (finished) => {
    if (finished) {
      // console.log('finished: ', finished)
      currentPath.value = currentPath.value === letterPaths.length - 1 ? 0 : currentPath.value + 1
      setLetterPath(letterPaths[currentPath.value])
      // console.log('Finished ', currentPath.value)
    }
  }

  // component is ready
  useEffect(() => {
    if (onLoaded) onLoaded(true)
  }, [])

  return (
    <Svg
      width="50%"
      height="50%"
      viewBox="0 0 316.68256 386.38016"
    >
      <Defs>
        <LinearGradient>
          <Stop offset={0} stopColor="#7b1fa2" stopOpacity={1} />
        </LinearGradient>
        <Path id="a" d="M138.57495 109.9162H455.57275V376.98065H138.57495z" />
      </Defs>

      <ApV1
        index={currentPath.value}
        path={letterPath}
        transform="translate(-97.694 -61.635)"
        shapeInside="url(#a)"
        onFinished={Finished}
      />
    </Svg>
  )
}

export default AnimatedLogo
