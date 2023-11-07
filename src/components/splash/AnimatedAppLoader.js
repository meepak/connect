import React, { useState, useEffect } from 'react'
import { Asset } from 'expo-asset'
import PropTypes from 'prop-types'

import AnimatedSplashScreen from './AnimatedSplashScreen'

const AnimatedAppLoader = ({
  children, image, resizeMode, bgColor,
}) => {
  const [isSplashReady, setSplashReady] = useState(false)
  useEffect(() => {
    async function prepare() {
      // I reckon I should pass this from local later on..
      await Asset.fromURI(image).downloadAsync()
      setSplashReady(true)
    }

    prepare()
  }, [image])

  if (!isSplashReady) {
    return null
  }

  return (
    <AnimatedSplashScreen
      image={image}
      resizeMode={resizeMode}
      bgColor={bgColor}
    >
      {children}
    </AnimatedSplashScreen>
  )
}

AnimatedAppLoader.propTypes = {
  children: PropTypes.node.isRequired,
  // image can be string or number
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  resizeMode: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
}

export default AnimatedAppLoader
