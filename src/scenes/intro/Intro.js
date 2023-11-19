import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
// import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import AppIntroSlider from 'react-native-app-intro-slider'
import ScreenTemplate from '../../components/templates/screen-template'
import Logo from '../../components/core/logo'
import imageAssets from '../../theme/images'

// TODO get colors from theme
const Styles = (colors, fonts) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  introImageStyle: {
    width: 300,
    height: 300,
  },
  introTextStyle: {
    fontSize: fonts.bodyLarge.fontSize,
    textAlign: 'center',
    marginBottom: 25,
    padding: 30,
  },
  introTitleStyle: {
    fontSize: fonts.titleLarge.fontSize,
    textAlign: 'center',
    marginTop: 60,
    fontWeight: 'bold',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: 'rgba(196, 2, 240, 0.5)',
    marginBottom: 220,
  },

  activeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 5,
    marginRight: 10,
    backgroundColor: 'rgba(2, 232, 240, 0.5)',
    borderColor: 'rgba(151, 173, 173, 0.8)',
    marginBottom: 220,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 30, // Adjust the position as needed
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonSignUpTouchable: {
    backgroundColor: '#00aeef',
    color: '#fff',
    width: 220,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSignUp: {
    color: colors.white,
    fontSize: fonts.bodyLarge.fontSize,
  },
  buttonSignInTouchable: {
    flexDirection: 'row',
    opacity: 1,
    color: '#fff',
    width: 220,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSignIn: {
    color: colors.primary,
    fontSize: fonts.bodyLarge.fontSize,
  },
  buttonLogin: {
    color: colors.primary,
    fontSize: fonts.bodyLarge.fontSize,
    fontWeight: 'bold',
  },

  logoContainer: {
    position: 'absolute',
    top: 30, // Adjust the position as needed
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },

  logo: {
    flex: 1,
    alignSelf: 'center',
    padding: 10,
    top: 20,
  },
})

const slides = [
  {
    key: 's1',
    title: 'DISCOVER',
    text: 'Discovery is the first step to innovation and success. Embrace the journey of finding new opportunities.',
    image: imageAssets.intro1,
  },
  {
    key: 's2',
    title: 'CONNECT',
    text: 'In the world of business, finding the right associate can be the key to unlocking your full potential.',
    image: imageAssets.intro2,
  },
  {
    key: 's3',
    title: 'THRIVE',
    text: 'Discover, Connect, and watch your business thrive with the perfect partner by your side.',
    image: imageAssets.intro3,
    // image: {
    //   uri:
    //         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    // },
  },
]

const Intro = () => {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const [isBeingTouhed, setIsBeingTouched] = useState(false)
  const styles = Styles(colors, fonts)

  let slider = null

  let i = 0
  let timeout
  const tick = () => {
    if (slider) {
      slider.goToSlide(i)
      i += 1
      if (i === slides.length) {
        i = 0
      }
    }
  }

  useEffect(() => { // componentDidMount
    if (!isBeingTouhed) {
      timeout = setInterval(() => {
        tick()
      }, 3000)
    }
  }, [isBeingTouhed])

  useEffect(() => () => { // componentWillUnmount
    clearInterval(timeout)
  },
  [])

  const onDone = () => {
    navigation.navigate('EnterStack', {
      screen: 'Sign up',
    })
  }

  const onSkip = () => {
    navigation.navigate('EnterStack', {
      screen: 'Sign in',
    })
  }

  const renderItem = (item) => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 100,
      }}
    >
      <Text style={[styles.introTitleStyle]}>{item.title}</Text>
      <Image style={styles.introImageStyle} source={item.image} />
      <Text style={[styles.introTextStyle]}>{item.text}</Text>
    </View>
  )

  return (
    <ScreenTemplate
      onTouchStart={() => {
        // console.log('Touch Started')
        setIsBeingTouched(true)
      }}
      onTouchEnd={() => {
        // console.log('Touch Ended')
        setIsBeingTouched(false)
      }}
    >

      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>

      <AppIntroSlider
        data={slides}
        renderItem={(param) => {
          const { item } = param
          return renderItem(item)
        }}
        showSkipButton={false}
        showNextButton={false}
        showDoneButton={false}
        onDone={onDone}
        onSkip={onSkip}
        skipLabel="Already signed up? Login"
        doneLabel="Sign Up"
        bottomButton
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        dotClickEnabled
        ref={(ref) => { slider = ref }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSignUpTouchable} onPress={onDone}>
          <Text style={styles.buttonSignUp}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignInTouchable} onPress={onSkip}>
          <Text style={styles.buttonSignIn}>Already signed up?</Text><Text style={styles.buttonLogin}> Login</Text>
        </TouchableOpacity>
      </View>

    </ScreenTemplate>
  )
}

export default Intro
