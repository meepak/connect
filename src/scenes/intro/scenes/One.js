import React, { useState } from 'react'
import { Text, useTheme } from 'react-native-paper'
import Animated, { useSharedValue, withTiming, StretchInY as enteringAnimation } from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { convertHexToRGBA, getGreeting } from '../../../utils/functions'
import AnimatedLottieView from 'lottie-react-native'
import TypewriterText from '../../../components/animated/TypewriterText'

const IntroSceneOne = ({width, height, enterTime}) => {

  const {colors} = useTheme()
  const [welcomeFinished, setWelcomeFinished] = useState(false)
    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            // flex: 1,

            backgroundColor: convertHexToRGBA(colors.surfaceContainerHighest, 0.2), // 'rgba(155, 155, 155, 0.2)', // Adjust thce alpha for transparency
            // borderRadius: 16, // Adjust the border radius for rounded corners
            paddingHorizontal: 16,
            marginHorizontal: 16,
            // width: '80%', // Adjust the width as needed
            // alignSelf: 'center',
            // justifyContent: 'center',
            // alignItems: 'center',
            // Glassmorphic effect
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
        },
        lottie: {
          width: width,
        }
    })


   // https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/custom-animations/#custom-entering-animation
  const entering = (values) => {
    "worklet"

    // console.log(initialScale, targetScale)
    const animations = {
      transform: [{ scale: withTiming(1, { duration: enterTime }) }],
    }

    const initialValues = {
      transform: [{ scale:  0.01 }],
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
    <Animated.View style={styles.container}> 
    {/* entering={enteringAnimation} */}
        <Text style={{padding: 20, color: colors.onBackground}} variant='displayMedium'>{ getGreeting() + '!'}</Text>
    {/* <AnimatedLottieView
      style={styles.lottie}
      source={require('../../../../assets/lottie/fa-welcome.json')}
      autoPlay
    /> */}
    <TypewriterText text='Welcome to Find Associate.' variant='titleLarge' style={{padding: 20}} onFinished={(finished) => finished ? setWelcomeFinished(() => true) : null} />
    {
      welcomeFinished
      ? <TypewriterText text='We are here to help you with your enterpreneul journey.' variant='titleLarge' style={{padding: 20}}  />
      : <></>
    }

    </Animated.View>
)}

IntroSceneOne.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default IntroSceneOne