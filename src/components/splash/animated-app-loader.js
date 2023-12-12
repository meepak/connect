import React, { useState, useEffect } from 'react'
import { Asset } from 'expo-asset'
import PropTypes from 'prop-types'

import AnimatedSplashScreen from './animated-splash-screen'

const AnimatedAppLoader = ({
  children, bgColor, // isDark, resizeMode,
}) => {
  // TODO THERE IS NO IMAGE TO LOAD ANYMORE, PROBABLY WE CAN LOAD THE THEME HERE AND PASS IT ALONG ???
  // console.log('In AnimatedAppLoader')
  // const [isSplashReady, setSplashReady] = useState(false)
  // const splashImage = isDark
  //   ? require('../../../assets/images/splash-black.png')
  //   : require('../../../assets/images/splash-white.png')
  // useEffect(() => {
  //   async function prepare() {
  //     // console.log('In AnimatedAppLoader loading images')
  //     // I reckon I should pass this from local later on..
  //     // await Asset.fromURI(image).downloadAsync()
  //     // eslint-disable-next-line import/no-dynamic-require
  //     await Asset.fromModule(splashImage)
  //     setSplashReady(true)
  //   }

  //   prepare()
  // }, [isDark])

  // if (!isSplashReady) {
  //   return null
  // }

  return (
    <AnimatedSplashScreen
      // image={splashImage}
      // resizeMode={resizeMode}
      bgColor={bgColor}
    >
      {children}
    </AnimatedSplashScreen>
  )
}

AnimatedAppLoader.propTypes = {
  children: PropTypes.node.isRequired,
  // image can be string or number
  // isDark: PropTypes.bool.isRequired,
  // resizeMode: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
}

export default AnimatedAppLoader
