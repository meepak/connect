import React, { useRef, useEffect, lazy } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated'

// Define the parameters for the Lorenz equations
const sigma = 10
const rho = 28
const beta = 8 / 3

// Define the initial values for x, y, and z
const x0 = 0.1
const y0 = 0
const z0 = 0

// Define the time step and the number of iterations
const dt = 0.01
const n = 1000


// Create shared values for x, y, and z
const x = useSharedValue(0);
const y = useSharedValue(0);
const z = useSharedValue(0);

// Update the lorenz function to update the shared values
const lorenz = (x, y, z) => {
  const dx = sigma * (y.value - x.value) * dt;
  const dy = (x.value * (rho - z.value) - y.value) * dt;
  const dz = (x.value * y.value - beta * z.value) * dt;

  x.value += dx;
  y.value += dy;
  z.value += dz;
}


// Define a function to scale the values to fit the SVG viewbox
const scale = (value, min, max, size) => {
  return ((value - min) / (max - min)) * size
}

// Define the size and the viewbox of the SVG component
const size = 300
const viewBox = `0 0 ${size} ${size}`

// Define the min and max values of x, y, and z
const minX = -30
const maxX = 30
const minY = -30
const maxY = 30
const minZ = 0
const maxZ = 50

// Define the colors for the path
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})


// Define a custom component that renders a path with animated props
const AnimatedPath = Animated.createAnimatedComponent(Path)

const LorenzAttractor = () => {
  // Create a shared value to store the progress of the animation
  const progress = useSharedValue(0)

  // Create an animated props object that updates the path data based on the progress
  const animatedProps = useAnimatedProps(() => {
    // Calculate the current index of the iteration
    const i = Math.floor(progress.value * n)

    // Initialize the values of x, y, and z
    let x = x0
    let y = y0
    let z = z0

    // Initialize the path data
    let pathData = ''

    // Iterate the Lorenz equations and append the points to the path data
    for (let j = 0; j <= i; j++) {
      // Scale the values to fit the viewbox
      const sx = runOnJS(scale)(x, minX, maxX, size)
      const sy = runOnJS(scale)(y, minY, maxY, size)

      // Append a line segment to the path data
      pathData += `M ${sx} ${sy} L ${sx} ${sy} `

      // Calculate the next values of x, y, and z
      // Use runOnJS to call the lorenz function from the UI thread
      runOnJS(lorenz)(x, y, z)
    }

    // Return the animated props
    return { d: pathData }
  })

  // Start the animation when the component mounts
  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 10000,
      easing: Easing.linear,
    })
  }, [])

  // Render the SVG component with the animated path
  return (
    <View style={styles.container}>
      <Svg height={size} width={size} viewBox={viewBox}>
        <AnimatedPath
          d="M 0 0 L 0 0"
          // animatedProps={animatedProps}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    </View>
  )
}

export default LorenzAttractor
