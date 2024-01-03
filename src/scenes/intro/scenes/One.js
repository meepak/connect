import React from 'react'
import { Text } from 'react-native-paper'
import Animated, { withTiming } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { getGreeting } from '../../../utils/functions'
import SvgLogo from '../../../components/svg/svg-logo'

const IntroSceneOne = ({width, height, enterTime}) => {
    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            flex: 1,
        },
    })


   // https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/custom-animations/#custom-entering-animation
  const entering = (values) => {
    "worklet"

    // console.log(initialScale, targetScale)
    const animations = {
      transform: [{ rotate: withTiming('360deg', { duration: enterTime }) }],
    }

    const initialValues = {
      transform: [{ rotate:  '200deg' }],
    }

    const callback = (finished) => {
      if(finished) {
        console.log('Intro scene one entered')
      }
    }

    return {
      initialValues,
      animations,
      callback
    }
  }

    return (
    <Animated.View style={styles.container} entering={entering}>
        <SvgLogo />
        <Text variant='titleMedium'>{ getGreeting() + '!'}</Text>
    </Animated.View>
)}

IntroSceneOne.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default IntroSceneOne