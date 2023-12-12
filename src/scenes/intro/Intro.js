/* eslint-disable no-plusplus */
import React, { useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
// import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScreenTemplate } from '../../components/templates'
import Logo from '../../components/core/logo'
import imageAssets from '../../theme/images'
import RenderCounter from '../../components/render-counter'
import Animation from './animate/play'
import { samples } from './animate/text'
import HandwrittenAnimation from './animate/hand'
import HandwrittenAnimationV1 from './animate/hand.v1'

const screenWidth = Dimensions.get('screen').width
// TODO get colors from theme
const Styles = (colors) => StyleSheet.create({
  image: {
    width: screenWidth,
    height: 300,
    // height: 252,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
  },
  text: {
    textAlign: 'center',
    color: colors.onBackground,
  },
  textView: {
    width: screenWidth,
    alignItems: 'center',
    // bottom: 30,
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

// console.log(imageAssets)
const slides = [
  {
    key: 's1',
    text: 'PARTNERSHIPS',
    word1: 'DISCOVER',
    // word2: 'PARTNERSHIPS',
    image: { uri: imageAssets.intro1.localUri || imageAssets.intro1.uri },
  },
  {
    key: 's2',
    word1: 'CONNECT',
    // word2: 'CONNECTION',
    image: { uri: imageAssets.intro2.localUri || imageAssets.intro2.uri },
  },
  {
    key: 's3',
    word1: 'THRIVE',
    // word2: 'TOGETHER',
    image: { uri: imageAssets.intro3.localUri || imageAssets.intro3.uri },
  },
]

const PlayGround = () => (
  <>
    <View
      pointerEvents="none"
      style={{
        position: 'absolute', top: 300, left: 50, zIndex: 9999, width: '100%', height: '100%',
      }}
    >
      <HandwrittenAnimation />
    </View>
    <View
      pointerEvents="none"
      style={{
        position: 'absolute', top: -50, left: 50, zIndex: 9999, width: '100%', height: '100%',
      }}
    >
      <HandwrittenAnimationV1 />
    </View>
    <View
      pointerEvents="none"
      style={{
        position: 'absolute', top: 10, left: 100, zIndex: 9999, width: '100%', height: '100%',
      }}
    >
      {samples.map((Sample, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`sample-${i}`}>
          <Text>{Sample.title}</Text>
          <Sample />
        </View>
      ))}
    </View>
    <View
      pointerEvents="none"
      style={{
        position: 'absolute', top: 100, left: 0, zIndex: 9998, flex: 1, flexGrow: 1, width: '100%', height: '100%',
      }}
    >
      <Animation />
    </View>
  </>
)

const Intro = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = Styles(colors)
  const slider = useRef()

  const { width, height } = Dimensions.get('window')
  const insets = useSafeAreaInsets()

  const delay = 3000

  // console.log(imageAssets)
  let currentSlide = 0
  let timerId = null
  let pause = false

  const goToNextPage = () => {
    if (slider && !pause) {
      slider.current.scrollToIndex({
        index: currentSlide,
        animated: true,
      })
    }
    currentSlide = (currentSlide < slides.length - 1 ? currentSlide + 1 : 0)
  }

  useEffect(() => {
    timerId = setInterval(goToNextPage, delay)
    return () => {
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      }
    }
  }, [])

  const renderItem = (slide) => (
    <View
      style={{
        width,
        height: height + insets.top,
        backgroundColor: colors.transparent,
        marginTop: 100,
      }}
    >
      <View style={styles.imageView}>
        <Image style={styles.image} source={slide.item.image} resizeMode="contain" />
      </View>
      <View style={styles.textView}>
        <Text style={[styles.text]} variant="headlineSmall">{slide.item.word1}</Text>
        {/* <Text style={[styles.text]} variant="headlineSmall">{slide.item.word2}</Text> */}
      </View>
    </View>
  )

  const Header = () => (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
      marginTop: 60,
      width: '100%',
      height: 42,
      // backgroundColor: colors.onTertiaryContainer,
    }}
    >
      <RenderCounter />
      <Logo bgColor={colors.background} textColor={colors.onBackground} />
    </View>
  )

  const Footer = () => (
    <View style={styles.buttonView}>
      <TouchableOpacity style={styles.buttonEnterTouchable} onPress={() => navigation.navigate('Sign in')}>
        <Text variant="titleLarge">Enter</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ScreenTemplate
      onTouchStart={() => {
        pause = true
      }}
      onTouchEnd={() => {
        pause = false
      }}
    >
      <PlayGround />
      <Header />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList
          ref={slider}
          data={slides}
          renderItem={renderItem}
          contentContainerStyle={{
            zIndex: 2,
          }}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          // debug
        />
      </View>
      <Footer />
    </ScreenTemplate>
  )
}

export default Intro
