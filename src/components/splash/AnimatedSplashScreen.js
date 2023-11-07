import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { Animated, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { imageAssets } from '../../theme/images'
import { fontAssets } from '../../theme/fonts'
import jsonData from '../../../assets/data/occupations.json'

// Things that needs pre-loading
// load json data to async storage
const storeData = async () => {
  try {
    const key = 'occupation'
    // Check if the data already exists in AsyncStorage
    const existingData = await AsyncStorage.getItem(key)

    if (existingData === null) {
      // TODO PRE-CLEAN UP THE JSON FILE TO AVOID DELAYED LOAD TIME
      // we just want unique SOCTitles
      // Extract unique titles from jsonData
      const uniqueTitles = [
        ...new Set(jsonData.SOCGroups.map((item) => item.SOCTitle)),
      ]

      // Create newJsonData with unique titles
      const newJsonData = uniqueTitles.map((title) => ({ title }))

      // Sort the newJsonData array by the length of the title (shortest titles first)
      const sortedJsonData = newJsonData
        .slice()
        .sort((a, b) => a.title.length - b.title.length)
        // Data doesn't exist, so store it
      const jsonStr = JSON.stringify(sortedJsonData)
      // console.log(jsonStr)
      await AsyncStorage.setItem(key, jsonStr)
      // console.log('Occupation Data stored successfully')
    } else {
      // console.log('Occupation Data already exists in AsyncStorage')
    }
  } catch (error) {
    console.error('Error storing data:', error)
  }
}

const AnimatedSplashScreen = ({
  children, image, resizeMode, bgColor,
}) => {
  const animation = useMemo(() => new Animated.Value(1), [])
  const [isAppReady, setAppReady] = useState(false)
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true))
    }
  }, [isAppReady])

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync()
      // Load stuff
      await Promise.all([...imageAssets, ...fontAssets])
      await storeData()
      // Anything else to load??
      await Promise.all([])
    } catch (e) {
      // handle errors
      console.log(`APP PRELOADING ERROR - ${e}`)
    } finally {
      setAppReady(true)
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: bgColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode,
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={{ uri: image }}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  )
}

AnimatedSplashScreen.propTypes = {
  children: PropTypes.node.isRequired,
  // image can be string or number
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  resizeMode: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
}

export default AnimatedSplashScreen
