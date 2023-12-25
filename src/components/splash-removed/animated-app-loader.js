import React from 'react'
import PropTypes from 'prop-types'

import AnimatedSplashScreen from './animated-splash-screen'

// TODO THIS IS NO LONGER IN USE, find proper use case or remove this!!
// TODO THERE IS NO IMAGE TO LOAD ANYMORE, PROBABLY WE CAN LOAD THE THEME HERE AND PASS IT ALONG ???
const AnimatedAppLoader = ({
  children, isDark, // isDark, resizeMode,
}) => (
  <AnimatedSplashScreen isDark={isDark}>
    {children}
  </AnimatedSplashScreen>
)

AnimatedAppLoader.propTypes = {
  children: PropTypes.node.isRequired,
  isDark: PropTypes.bool.isRequired,
}

export default AnimatedAppLoader
