import React, { useEffect, useRef, useCallback, useState } from 'react'
import {
  Dimensions,
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  View,
  // Image
} from 'react-native'
import { Image } from 'expo-image'
import { Text, useTheme } from 'react-native-paper'
import SheetModal from '@/components/core/sheet-modal'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import imageAssets from '@/theme/images'
import DotPaginator from './dot-paginator'
import Animated, {
  FlipInYLeft as slideLeft,
  FlipInYRight as slideRight,
} from 'react-native-reanimated'
import { Asset } from 'expo-asset'

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: '100%',
    // height: 152,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginVertical: 5,
  },
  title: {},
  textTitle: {
    paddingLeft: 20,
    textTransform: 'capitalize',
    // fontWeight: 'bold',
  },
  textView: {
    width: screenWidth,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    // textAlign: 'center',
    // color: colors.onBackground,
  },
})

// define type of Slide based on slides array below
type SlideType = {
  key: string
  title: string
  image: Asset
  text: string
}


// TODO: Define this properly to introduce app
// Make it downloadible from the server, need to make this generic enough for both type of users
const slides = [
  {
    key: 's1',
    title: 'DISCOVER',
    image: imageAssets.intro1,
    text: 'Do not waste time sorting through list. Discover the right business partner for you with tailored matching algorithm.',
  },
  {
    key: 's2',
    title: 'CONNECT',
    image: imageAssets.intro2,
    text: 'Tools specifically made to make you the right connection. Allows you to keep notes, perform background checks, communicate, set up meeting, etc to the potential partners.',
  },
  {
    key: 's3',
    title: 'THRIVE',
    image: imageAssets.intro3,
    text: 'Right business partner can make or break your business. We are here to help you find the right one and thrive together.',
  },
]

interface AppFeaturesIntroProps {
  show: boolean
  onClose?: () => void
}

const AppFeaturesIntro = ({ show = false, onClose = () => {} }) => {
  const appFeaturesSheetRef = useRef<BottomSheetModal>(null)
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0)
  const [lastSliderIndex, setLastSliderIndex] = useState(0)

  const { colors } = useTheme()
  
  const openMe = useCallback(() => {
    if (appFeaturesSheetRef.current) {
      appFeaturesSheetRef.current?.present()
    }
  }, [])

  const closeMe = useCallback(() => {
    setCurrentSliderIndex(0)
    setLastSliderIndex(0)
    if (appFeaturesSheetRef.current) {
      appFeaturesSheetRef.current?.close()
    }
  }, [])

  useEffect(() => {
    if (show) {
      openMe()
    } else {
      closeMe()
    }
  }, [show])

  const handleDismiss = useCallback(() => {
    onClose()
  }, [])


  const RenderSlide = ({ slide }: { slide: SlideType }) => (
    <Animated.View
      style={{
        backgroundColor: 'transparent', //transparent
        marginTop: 10,
        flex: 1,
      }}
      entering={
        lastSliderIndex - currentSliderIndex <= 0 ? slideLeft : slideRight
      }
    >
      <Text
        style={{ ...styles.textTitle, color: colors.onBackground }}
        variant="titleMedium"
      >
        {slide.title}
      </Text>
      <View style={{ ...styles.textView }}>
        <Text variant="bodyMedium" style={{ color: colors.onBackground }}>{slide.text}</Text>
      </View>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={slide.image as ImageSourcePropType}
          contentFit={'contain'}
          contentPosition={'center'}
        />
      </View>
    </Animated.View>
  )

  return (
    <SheetModal
      ref={appFeaturesSheetRef}
      snapsAt={['60%']}
      onDismiss={handleDismiss}
      title="Welcome to Find Associate!"
      backgroundColor={colors.primaryContainer}
    >
      <View style={{ flex: 1, alignItems: 'center' }}>
        <RenderSlide slide={slides[currentSliderIndex ?? 0]} />
      </View>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: colors.primaryContainer,
        }}
      >
        <DotPaginator
          totalPages={slides.length}
          onPageChanged={(index) => {
            if (index !== currentSliderIndex) {
              setLastSliderIndex(currentSliderIndex)
              setCurrentSliderIndex(index)
            }
          }}
        />
      </View>
    </SheetModal>
  )
}

export default AppFeaturesIntro
