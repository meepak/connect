import React, { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay,
} from 'react-native-reanimated';
import { sleep } from '../../utils/functions';

const AnimatedName = () => {
  const namePaths = [
    /* F without middle line */ 
    "M 34.418,3.664 C 28.478,3.799 22.502,3.366 16.584,3.941 9.05,5.364 3.804,12.616 2.94,19.959 2.193,25.965 2.667,32.031 2.543,38.067 v 32.91",
    /* F middle line */
    "M 34.418,35.539 H 2.942",
    
    /* i */ 
    "M43.964 25.367v45.61m.057-54.773c.428-.068-1.102.177 0 0z",
    
    /* n */ 
    "M60.147 70.972c.018-9.808-.037-19.618.028-29.425.209-6.648 4.485-12.966 10.537-15.684 4.918-1.909 10.632-1.817 15.502.206 6.631 2.9 10.715 10.21 10.402 17.35v27.553",
    
    /* d */ 
    "M146.106 26.635c-6.6-6.473-17.687-7.439-25.305-2.21-7.478 4.86-11.903 13.916-10.978 22.809.89 9.093 7.052 17.968 16.107 20.438 8.084 2.332 17.212-.609 22.624-7.013 4.803-4.97 5.867-12.18 5.614-18.816V.197",
    
    /* A arc */ 
    "m 190.132,70.973 c 0.026,-15.744 -0.05,-31.49 0.04,-47.232 0.426,-7.668 4.278,-15.785 11.616,-18.999 6.306,-2.715 13.62,-2.85 20.18,-0.99 7.883,2.243 13.284,9.83 14.263,17.766 0.499,5.233 0.162,10.505 0.26,15.756 v 33.699",
    /* A dash */
    "M 236.323,38.196 C 223.552,38.117 210.779,38.181 198.007,38.16",
    
    /* s */ 
    "M280.567 23.748h-20.859c-3.25 0-5.937.969-8.062 2.906-2.22 2.032-3.329 4.657-3.329 7.875 0 4.72 2.297 8.078 6.891 10.078 7.594 2.375 13.39 3.97 17.39 4.782 5.032 1.562 7.5 6.95 7.407 11.076-.094 5.25-3.428 7.89-10.078 7.919l-21.422.093",
    
    /* s */ 
    "M322.79 23.748h-20.86c-3.25 0-5.937.969-8.062 2.906-2.218 2.032-3.328 4.657-3.328 7.875 0 4.72 2.297 8.078 6.89 10.078 7.595 2.375 13.391 3.97 17.391 4.782 5.032 1.562 7.5 6.95 7.407 11.076-.094 5.25-3.428 7.89-10.078 7.919l-21.422.093",
    
    /* o */ 
    "M354.84 21.037c7.939-.246 15.657 4.267 19.622 11.104 5.487 9.061 4.08 21.571-3.19 29.258-4.597 5.202-11.777 7.608-18.61 6.978-6.567-.41-12.977-3.868-16.427-9.558-4.654-6.863-6.22-16.155-2.533-23.795 3.34-7.627 10.824-13.702 19.348-13.93a28.143 28.143 0 0 1 1.79-.057z",
    
    /* c */ 
    "M419.355 21.84c-7.389-.64-15.469.022-21.533 4.726-5.724 4.315-8.806 11.562-8.514 18.665.055 6.24 1.751 13.053 6.816 17.136 5.918 4.61 13.65 6.564 21.075 6.02",
    
    /* i */ 
    "M430.237 25.367v45.61m.057-54.773c.428-.068-1.102.177 0 0z",
    
    /* a */ 
    "M480.09 63.005c-4.854 3.95-11.229 6.213-17.503 5.247-6.24-.576-12.005-4.324-15.08-9.78-5.28-8.679-5.374-20.682.91-28.878 4.622-5.682 12.1-9.199 19.47-8.23 6.124.423 12.072 3.545 15.504 8.7 3.471 4.699 4.853 10.616 4.573 16.39v21.238",
    
    /* t -------*/ 
    "m 501.683,10.366 c 0.02,15.302 -0.04,30.605 0.03,45.905 0.08,4.085 1.961,8.278 5.61,10.358 3.257,2.16 7.25,1.8 10.963,1.816 h 3.272",
    /* t dash */
    "m 501.966,25.836 19.592,0.468 z",
    
    /* e */ 
    "m535.355 54.345 32.672-22.078c-6.5-11.02-22.693-14.425-33.224-7.266-8.528 5.64-13.203 17.228-9.596 27.034 2.853 8.948 11.347 15.832 20.788 16.338 8.77.823 18.127-3.373 22.41-11.26 1.997-3.456 3.026-7.418 3.184-11.393"
  ]

  const pathLengths = [91.334, 31.476, 46.593, 114.18, 168.451, 164.794, 38.316, 119.782, 119.782, 147.441, 85.353, 46.593, 147.152, 72.782, 39.195, 174.569]
  const durations =   [1500 ,700, 2500, 3000,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500]
  const color = { primary: 'red', bgColor: 'white', secondary: 'blue', tertiary: "green"}

  

  const strokeWidth = 4
  
  const AnimatedPath = Animated.createAnimatedComponent(Path)

  const animatedLength = useSharedValue(100)
  const totalLength = useSharedValue(1000)

  const currentIndex = useSharedValue(-1)
  const currentPath = useSharedValue(namePaths[currentIndex.value])

  const delay = useSharedValue(0)
  const firstTime = useSharedValue(true)

  const [drawnPaths, setDrawnPaths] = React.useState([])

  const nextLetter = () => {
    // console.log(namePaths.length, 'current character index -- ' + currentIndex.value)
    let index = currentIndex.value < namePaths.length - 1 && currentIndex.value >= 0 ? currentIndex.value + 1 : 0;
    // console.log(pathLengths.length, 'next character index -- ' + index)
    if(index === 0 && firstTime.value !== true) {
      // console.log('neverasdfasdfafsdasasdasdf')
      delay.value = 2000 //1000 // if it's not a first time, add delay before restarting
    } else {
      delay.value = 0
    }

    if(index === namePaths.length) {
      firstTime.value = false // mark that we have drawn all paths once
    }

    currentIndex.value = index;

    let length = pathLengths[index]  // lengths[index]
    animatedLength.value = length
    totalLength.value = length
    let timing = length / 28 * 600 // durations[index]

    animatedLength.value = withDelay(delay.value, withTiming(0, { duration: timing }, (finished) => {
      if (finished) {
        runOnJS(setDrawnPaths)(namePaths.slice(0, currentIndex.value + 1))
        runOnJS(nextLetter)()

      }
    }))
    currentPath.value = namePaths[index]; // set new path
  }

  useEffect(() => {
    nextLetter(); // animation start
  }, []); // empty dependency array to trigger once

  const animatedStyle = useAnimatedStyle(() => ({
    strokeDashoffset: animatedLength.value,
    strokeDasharray: [totalLength.value, animatedLength.value],
  }), [animatedLength])

  return (
  <Svg viewBox="0 0 574.087 70.977">

      {drawnPaths.map((path, index) => (
        <Path
          key={index}
          d={path}
          fill="none"
          stroke={color.primary}
          strokeWidth={strokeWidth} />
      ))}

        <AnimatedPath
          d={currentPath}
          fill="none"
          stroke={color.primary}
          strokeWidth={strokeWidth}
          style={animatedStyle} />



      </Svg>

  )
}

export default AnimatedName
