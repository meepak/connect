import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import Animated, { useDerivedValue, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'


const SvgAnimatedMuncheBg = ({width, height}) => {

  const AnimatedSvg = Animated.createAnimatedComponent(Svg)

  const svgViewBoxWidth = 32.794
  const svgViewBoxHeight = 49.506  

  const scale = useSharedValue(1.1)

  // took bloody 2 days to fix up and this can't be animated
  const svgViewBox = useDerivedValue(() => {
    const svgViewBoxScaledWidth = svgViewBoxWidth / scale.value
    const svgViewBoxScaledHeight = svgViewBoxHeight / scale.value
    return `${(svgViewBoxWidth - svgViewBoxScaledWidth) / 2} ${(svgViewBoxHeight - svgViewBoxScaledHeight) / 2} ${svgViewBoxScaledWidth} ${svgViewBoxScaledHeight}`
  })

  React.useEffect(() => {
    scale.value = withSequence(
      withSpring(2.0),
      withRepeat( withSequence(
          withTiming(3.0, {duration: 3000}),
          withTiming(2.0, {duration: 3000})
        ), -1, false)
        )}, [])
  
  return (
    <AnimatedSvg
      width={width}
      height={height}
      style={{
        zIndex: 0,
        position: 'absolute',
        transform: [{ scale: scale }],
        opacity: 0.3,
      }}
      // viewBox={svgViewBox} 
      viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
    >
      <Path fill="#1d909b" d="M0 0h32.766v49.345H0z" opacity={0.981} />
      <Path
        fill="#fce604"
        fillOpacity={0.984}
        d="M25.316 27.306c-1.398.441-3.314 1.067-3.808 2.345-1.547 4.003 3.583 9.301 3.146 9.624-.437.322-7.939-5.576-8.48-5.576 0 0-7.995 5.902-8.431 5.58-.437-.323 4.693-5.62 3.145-9.623-.48-1.244-2.312-1.872-3.7-2.311-2.65 1.192-5.07 2.89-7.16 4.996v17.165h32.766V32.58a24.494 24.494 0 0 0-4.282-3.556 23.23 23.23 0 0 0-3.196-1.718Z"
        opacity={0.981}
      />
      <Path
        fill="#fc8204"
        d="M16.308 1.286c-7.705 0-13.97 6.203-13.97 13.832 0 5.78 3.58 10.711 8.639 12.792 1.407.588 2.934.183 3.492-.122 1.16-.692 1.417-3.015 1.682-3.684.044-.11.236-.108.28.003.265.67.522 2.99 1.682 3.681.647.57 2.23.585 3.527.122 5.059-2.08 8.639-7.012 8.639-12.792 0-7.667-6.266-13.832-13.971-13.832z"
        opacity={0.981}
      />
    </AnimatedSvg>
  )}

export default SvgAnimatedMuncheBg
