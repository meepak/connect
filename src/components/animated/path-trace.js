/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const MyPath = (props) => {
  const {
    index, path, onFinished, repeat,
  } = props

  const animatedLength = useSharedValue(0)

  const totalLength = path.length

  const animatedStyle = useAnimatedStyle(() => ({
    strokeDashoffset: animatedLength.value,
    strokeDasharray: [animatedLength.value, animatedLength.value / 10],
  }))

  useEffect(() => {
    animatedLength.value = withRepeat(
      withTiming(
        path.length,
        {
          duration: totalLength * 3,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished) {
            runOnJS(onFinished)(true, index)
          }
        },
      ),
      repeat ?? -1, false,
    )
  }, [])

  return (
    <AnimatedPath
      d={path}
      fill="transparent"
      stroke="yellow"
      strokeWidth={2}
      style={animatedStyle}
    />
  )
}

const PathTrace = ({ onLoaded }) => {
  const letterPaths = [
    'M.564 20.05c-.18.247-.383.496-.564.767.497.067.7.09 1.106.09.745 0 1.332-.113 1.694-.316.654-.361 1.806-1.468 2.415-2.258.7-.948 1.513-2.867 2.032-4.944.858-3.229 1.287-4.9 1.333-5.058.203.023.293.023.383.023l1.174-.045c.068 0 .204 0 .43.022l.948-.722c-.655-.023-.903-.023-1.445-.023-.497 0-.7 0-1.31.023 1.468-5.758 1.784-6.435 3.138-6.435.407 0 .723.045 1.513.18L14.45.136A3.57 3.57 0 0 0 13.366 0c-1.377 0-2.28.474-3.816 1.964C8.286 3.206 7.993 3.838 7.112 7.61c-.226-.023-.339-.023-.452-.023l-1.106.045c-.045 0-.158 0-.339-.022-.135.09-.27.18-.316.203-.248.135-.293.18-.496.27-.068.046-.249.136-.452.25h.565l1.58.022c.135 0 .384 0 .835-.023-.36 1.377-.496 1.964-.925 3.951-1.355 6.232-1.874 7.225-3.793 7.225-.339 0-.61-.022-1.197-.113z',
    'M9.98 15.15c.519.158.767.203 1.196.203 1.535 0 2.596-.813 5.554-4.2 1.784 0 3.116.023 3.996.09-.045.272-.09.543-.113.814-.045.225-.112.7-.18 1.196a10.13 10.13 0 0 1-.136.926 6.4 6.4 0 0 0-.112.97c0 .294.225.497.519.497.09 0 .7-.112 1.829-.316l1.287-.225c.158-.023.406-.068.79-.136l.361-.542c-.926.068-1.49.113-1.67.113-.904 0-1.152-.226-1.152-1.016 0-1.445.88-7.767 1.603-11.357l-.316-.225c-.678.7-.723.722-1.197.722-.293 0-.406-.022-1.287-.158-1.016-.158-1.603-.226-2.054-.226-1.039 0-2.123.52-3.184 1.558-1.197 1.152-1.716 2.145-1.716 3.342 0 .542.068.903.316 1.558l1.671-.904c-.361-1.06-.474-1.58-.474-2.1 0-1.286.97-2.054 2.619-2.054.248 0 .542.023.835.045l.542.068c.316.023.542.045.7.068.361.045.565.045 1.174.09L17.475 9.01c-.948 1.219-2.416 2.935-3.025 3.522-.903.88-1.58 1.196-2.62 1.196-.383 0-.586-.022-.993-.158zm7.45-4.922 4.358-5.712-.926 5.712z',
    // Add more paths for additional letters
  ]

  const [letterPath, setLetterPath] = useState(letterPaths[0])

  const currentPath = useSharedValue(0)

  const Finished = (finished) => {
    if (finished) {
      currentPath.value = currentPath.value === letterPaths.length - 1 ? 0 : currentPath.value + 1
      setLetterPath(letterPaths[currentPath.value])
    }
  }

  // component is ready
  useEffect(() => {
    if (onLoaded) onLoaded(true)
  }, [])

  return (
    <Svg width="70%" height="70%" viewBox="0 0 24.971 20.907">
      <MyPath index={currentPath.value} path={letterPath} onFinished={Finished} />
    </Svg>
  )
}

export default PathTrace
