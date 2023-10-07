import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
// import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import AppIntroSlider from 'react-native-app-intro-slider'
import ScreenTemplate from '../../components/ScreenTemplate'
import { fontSize, colors } from '../../theme'
import Logo from '../../components/Logo'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 300,
    height: 300,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
    padding: 30,
  },
  introTitleStyle: {
    fontSize: 32,
    color: 'white',
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
    fontSize: fontSize.large,
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
    fontSize: fontSize.large,
  },
  buttonLogin: {
    color: colors.primary,
    fontSize: fontSize.large,
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
    image: require('../../../assets/images/discover.png'),
    backgroundColor: colors.black,
    textColor: colors.white,
  },
  {
    key: 's2',
    title: 'CONNECT',
    text: 'In the world of business, finding the right associate can be the key to unlocking your full potential.',
    image: require('../../../assets/images/connection.png'),
    backgroundColor: colors.black,
    textColor: colors.white,
  },
  {
    key: 's3',
    title: 'THRIVE',
    text: 'Discover, Connect, and watch your business thrive with the perfect partner by your side.',
    image: require('../../../assets/images/thrive.png'),
    // image: {
    //   uri:
    //         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    // },
    backgroundColor: colors.black,
    textColor: colors.white,
  },
]

const RenderItem = (item) => (
  <View
    style={{
      flex: 1,
      backgroundColor: item.backgroundColor,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 100,
    }}
  >
    <Text style={[styles.introTitleStyle, { color: item.textColor }]}>{item.title}</Text>
    <Image style={styles.introImageStyle} source={item.image} />
    <Text style={[styles.introTextStyle, { color: item.textColor }]}>{item.text}</Text>
  </View>
)

const Intro = () => {
  const navigation = useNavigation()
  const { scheme } = useContext(ColorSchemeContext)
  const [isBeingTouhed, setIsBeingTouched] = useState(false)
  const isDark = scheme === 'dark'
  const colorScheme = {
    background: isDark ? colors.black : colors.white,
    text: isDark ? colors.white : colors.black,
  }

  let slider = null

  let i = 0
  let timeout
  const tick = () => {
    if (slider) {
      // console.log(`Go to Page ${i}`)
      slider.goToSlide(i) // this.slider is ref of <AppIntroSlider....
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
    navigation.navigate('LoginStack', {
      screen: 'Sign up',
    })
  }

  const onSkip = () => {
    navigation.navigate('LoginStack', {
      screen: 'Sign in',
    })
  }

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
          const modifiedItem = {
            ...item, // Copy all properties from the original item
            backgroundColor: colorScheme.background, // Override backgroundColor
            textColor: colorScheme.text, // Override textColor
          }
          return RenderItem(modifiedItem)
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
          {/* <Button style={styles.buttonSignUp} title="Sign Up" onPress={onDone} /> */}
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
