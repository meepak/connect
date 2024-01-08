import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

// Define the parameters for the Lorenz equations
const sigma = 10;
const rho = 28;
const beta = 8 / 3;

// Define the initial values for x, y, and z
const x0 = 0.1;
const y0 = 0;
const z0 = 0;

// Define the time step and the number of iterations
const dt = 0.01;
const n = 1000;

// Define a function to calculate the next values of x, y, and z
const lorenz = (x, y, z) => {
  const dx = sigma * (y - x) * dt;
  const dy = (x * (rho - z) - y) * dt;
  const dz = (x * y - beta * z) * dt;
  return [x + dx, y + dy, z + dz];
};

// Define a function to scale the values to fit the SVG viewbox
const scale = (value, min, max, size) => {
  return ((value - min) / (max - min)) * size;
};

// Define the size and the viewbox of the SVG component
const size = 300;
const viewBox = `0 0 ${size} ${size}`;

// Define the min and max values of x, y, and z
const minX = -30;
const maxX = 30;
const minY = -30;
const maxY = 30;
const minZ = 0;
const maxZ = 50;

// Define the colors for the path
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
];

// Define a custom component that renders a path with animated props
const AnimatedPath = Animated.createAnimatedComponent(Path);

const LorenzAttractor = () => {
  // Create a ref to store the path data
  const pathRef = useRef('');

  // Create a shared value to store the progress of the animation
  const progress = useSharedValue(0);

  // Create an animated props object that updates the path data based on the progress
  const animatedProps = useAnimatedProps(() => {
    // Calculate the current index of the iteration
    const i = Math.floor(progress.value * n);

    // Initialize the values of x, y, and z
    let x = x0;
    let y = y0;
    let z = z0;

    // Iterate the Lorenz equations and append the points to the path data
    let pathData = '';
    for (let j = 0; j <= i; j++) {
      // Scale the values to fit the viewbox
      const sx = scale(x, minX, maxX, size);
      const sy = scale(y, minY, maxY, size);
      const sz = scale(z, minZ, maxZ, size);

      // Choose the color based on the z value
      const color = colors[Math.floor(sz / size * colors.length)];

      // Append a line segment to the path data with the color
      pathData += `L ${sx} ${sy} `;
      pathData += `S ${sx} ${sy} ${color} `;

      // Calculate the next values of x, y, and z
      [x, y, z] = lorenz(x, y, z);
    }

    // Replace the first letter with M to move to the start point
    pathData = pathData.replace('L', 'M');

    // Return the animated props object with the path data
    return {
      d: pathData,
    };
  });

  // Start the animation when the component mounts
  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 10000,
      easing: Easing.linear,
    });
  }, []);

  // Render the SVG component with the animated path
  return (
    <View style={styles.container}>
      <Svg height={size} width={size} viewBox={viewBox}>
        <AnimatedPath
          animatedProps={animatedProps}
          fill="none"
          strokeWidth={2}
          stroke="black"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LorenzAttractor;