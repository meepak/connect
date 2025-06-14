import React, { useEffect } from 'react'
import {
  View, TouchableOpacity, StyleSheet,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import Animated, {
  useSharedValue,
  withRepeat,
  withSpring,
//   runOnJS,
} from 'react-native-reanimated'
// import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import ScreenTemplate from '../../components/templates/screen-template'
import SvgLogo from '../../components/svg/svg-logo'
// import imageAssets from '../../theme/images'

const Intro = () => {
  const navigation = useNavigation()
  const colors = useTheme()

  // stylesheet
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    welcomeLottie: {
      width: '100%',
    },
    buttonView: {
      bottom: 69,
      alignItems: 'center',
      zIndex: 999,
    },
    buttonEnterTouchable: {
      height: 48,
      backgroundColor: colors.primaryContainer,
      color: colors.onPrimaryContainer,
      width: 220,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  const logoY = useSharedValue(0)
  // const logoConfig = { duration: 1500, easing: withTiming }

  // const logoUpAnimated = useAnimatedStyle(() => ({
  //   transform: [{ translateY: logoY.value }],
  // }))

  useEffect(() => {
    logoY.value = withRepeat(withSpring(-300), -1)
  }, [])

  // const insets = useSafeAreaInsets()
  // Shared values for animations
  // const fadeInTitle = useSharedValue(0)
  // const fadeInSubtext = useSharedValue(0)
  // const slideInProblem = useSharedValue(300)
  // const slideInSolution = useSharedValue(300)
  // const iconOpacity = useSharedValue(0)

  // // Animation configurationsStatusBar
  // const fadeInConfig = { duration: 1000, easing: withTiming }
  // const slideInConfig = { duration: 800, easing: withSpring }

  // // References for animated components
  // const titleRef = useRef(null)
  // const subtextRef = useRef(null)
  // const problemRef = useRef(null)
  // const solutionRef = useRef(null)

  //   // Title & Tagline animations
  //   fadeInTitle.value = withTiming(1, fadeInConfig)
  //   fadeInSubtext.value = withTiming(1, { ...fadeInConfig, delay: 500 })

  //   // Problem & Solution animations
  //   slideInProblem.value = withSpring(0, slideInConfig)
  //   slideInSolution.value = withSpring(0, { ...slideInConfig, delay: 300 })

  //   // Key Features animations
  //   iconOpacity.value = withTiming(1, { ...iconConfig, delay: 500 })
  // }, [])

  // const animatedTitleStyle = useAnimatedStyle(() => ({
  //   opacity: fadeInTitle.value,
  // }))

  // const animatedSubtextStyle = useAnimatedStyle(() => ({
  //   opacity: fadeInSubtext.value,
  // }))

  // const animatedProblemStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateY: slideInProblem.value }],
  // }))

  // const animatedSolutionStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateY: slideInSolution.value }],
  // }))

  // const animatedIconStyle = useAnimatedStyle(() => ({
  //   opacity: iconOpacity.value,
  // }))

  // const startAnimations = () => {
  //   fadeInTitle.value = withTiming(1, fadeInConfig)
  //   fadeInSubtext.value = withTiming(1, { ...fadeInConfig, delay: 500 })
  //   slideInProblem.value = withSpring(0, slideInConfig)
  //   slideInSolution.value = withSpring(0, { ...slideInConfig, delay: 300 })
  //   iconOpacity.value = withTiming(1, { ...iconConfig, delay: 500 })
  // }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 250, height: 250, // ...logoUpAnimated,
          }}
        >
          <SvgLogo />
        </Animated.View>
        {/* <LottieView
        style={styles.welcomeLottie}
        source={require('../../../assets/lottie/fa.welcome.json')}
        autoPlay
      /> */}
        {/* Scene 1: Title & Tagline */}
        {/* <Animated.Text ref={titleRef} style={[{ fontSize: 24, fontWeight: 'bold' }, animatedTitleStyle]}>
        Welcome to Find Associate!
      </Animated.Text>
      <Animated.Text ref={subtextRef} style={[{ fontSize: 16 }, animatedSubtextStyle]}>
        Your bridge to entrepreneurial success.
      </Animated.Text> */}

        {/* Scene 2: Problem & Solution */}
        {/* <Animated.View ref={problemRef} style={animatedProblemStyle}> */}
        {/* <Image source={imageAssets.connection} style={{ width: 200, height: 200 }} /> */}
        {/* <Text>Got a brilliant idea but need the perfect partner?</Text>
        <Text>Or maybe your skills deserve a bigger stage?</Text> */}
        {/* </Animated.View> */}

        {/* <Animated.View ref={solutionRef} style={animatedSolutionStyle}> */}
        {/* Use your solution image here */}
        {/* <Text>Another line of text here...</Text> */}
        {/* </Animated.View> */}

        {/* Scene 3: Key Features */}
        {/* <Animated.View ref={iconRef} style={animatedIconStyle}>
        <Image source={imageAssets.connection} style={{ width: 50, height: 50 }} />
        <Text>Find your perfect match - beyond resumes!</Text>
        <Image source={imageAssets.connection} style={{ width: 50, height: 50 }} />
        <Text>Collaborate with confidence, build trust easily.</Text>
        <Image source={imageAssets.connection} style={{ width: 50, height: 50 }} />
        <Text>Brainstorm, share, and manage - all in one place.</Text>
      </Animated.View> */}

        {/* Scene 4: Success Stories */}
        {/* Use a modal or a pop-up for the testimonial and entrepreneur image */}

        {/* Scene 5: Call to Action */}
        {/* <TouchableOpacity onPress={runOnJS(startAnimations)}>
        <Animated.Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Unlock your potential!
        </Animated.Text>
      </TouchableOpacity> */}

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buttonEnterTouchable} onPress={() => navigation.navigate('Sign in')}>
            <Text variant="titleLarge">Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenTemplate>
  )
}

export default Intro
