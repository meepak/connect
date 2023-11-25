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
    zIndex: 4,
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

const slides = [
  {
    key: 's1',
    text: 'PARTNERSHIPS',
    word1: 'DISCOVER',
    // word2: 'PARTNERSHIPS',
    image: { uri: imageAssets.intro1.localUri },
  },
  {
    key: 's2',
    word1: 'CONNECT',
    // word2: 'CONNECTION',
    image: { uri: imageAssets.intro2.localUri },
  },
  {
    key: 's3',
    word1: 'THRIVE',
    // word2: 'TOGETHER',
    image: { uri: imageAssets.intro3.localUri },
  },
]

const Intro = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = Styles(colors)
  const slider = useRef()

  const { width, height } = Dimensions.get('window')
  const insets = useSafeAreaInsets()

  const delay = 3000

  console.log(imageAssets)
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
      <Header />

      <View style={{ flex: 1 }}>
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
