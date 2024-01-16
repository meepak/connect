
import { View, Text, Image, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native'
import { useState } from 'react'
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  Extrapolation,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'


//#region - input data type

type SlideStyleType = {
    container: ViewStyle
    titleContainer: ViewStyle
    title: TextStyle
    contentContainer: ViewStyle
    content: TextStyle
    imageContainer: ViewStyle
    image: ImageStyle
}

type SlideType = {
  key: string
  title: string
  image: ImageSourcePropType
  content: string
  style: SlideStyleType
}

//#endregion - input data type 


//#region - function to render slide

const RenderSlide = ({ slide }: { slide: SlideType }) => (
  <View style={slide.style.container}>
    <View style={slide.style.titleContainer}>
      <Text style={slide.style.title}>{slide.title}</Text>
    </View>

    <View style={slide.style.contentContainer}>
      <Text style={slide.style.content}>{slide.content}</Text>
    </View>

    <View style={slide.style.imageContainer}>
      <Image
        style={slide.style.image}
        source={slide.image as ImageSourcePropType}
      />
    </View>
  </View>
)

//#endregion - function to renderslide


//#region - reanimate slide

interface AnimatedSlideInterface {
    slides: SlideType[],
    currentSlideIndex: number,
    SlideLeftAnimation: React.FC | null,
    SlideRightAnimation: React.FC | null,
    slideWidth: number,
    onChange?: (newSlideIndex : number) => void | null,
}
//fix this component. This should display the current slide. 
// When swipe gesture is detected It will animate as follows
// If right swiped, 
//     i. the current slide will slide to right using slide right animation while fading away
//      ii. At the same time, previous slide will enter while fading in using slide left animation
//      iii. Animation must be keyframe based so that it can be controlled by the gesture
// If left swiped,
//     i. the current slide will slide to left using slide left animation while fading away
//     ii. At the same time, next slide will enter while fading in using slide right animation
//    iii. Animation must be keyframe based so that it can be controlled by the gesture
const AnimatedSlide = ({
  slides,
  slideIndex,
  SlideLeftAnimatedComponent,
  SlideRightAnimatedComponent,
  slideWidth,
  onChange,
}) => {
  const slideLeft = useSharedValue(false)
  const progress = useSharedValue(slideIndex)

  const pan = Gesture.Pan()
    .onBegin(() => {
      slideLeft.value = false
    })
    .onChange((event) => {
      progress.value = event.translationX / slideWidth
      slideLeft.value = progress.value < 0
    })
    .onFinalize(() => {
      slideIndex = slideLeft.value ? slideIndex + 1 : slideIndex - 1
      progress.value = withTiming(slideIndex, { duration: 300 })
      if (onChange) {
        onChange(slideIndex)
      }
    })

  const currentSlideAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [slideIndex - 1, slideIndex],
      [0, 1],
      Extrapolation.CLAMP,
    )
    const translateX = interpolate(
      progress.value,
      [slideIndex - 1, slideIndex],
      [slideWidth, 0],
      Extrapolation.CLAMP,
    )
    return {
      opacity,
      transform: [{ translateX }],
    }
  })

  const comingSlideAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [slideIndex, slideIndex + 1],
      [0, 1],
      Extrapolation.CLAMP,
    )
    const translateX = interpolate(
      progress.value,
      [slideIndex, slideIndex + 1],
      [-slideWidth, 0],
      Extrapolation.CLAMP,
    )
    return {
      opacity,
      transform: [{ translateX }],
    }
  })

  return (
    <GestureHandlerRootView style={slides[slideIndex].style.container}>
      <View style={slides[slideIndex].style.container}>
        <GestureDetector gesture={pan}>
          <Animated.View style={currentSlideAnimatedStyle}>
            <RenderSlide slide={slides[slideIndex]} />
          </Animated.View>
          <Animated.View style={comingSlideAnimatedStyle}>
            <RenderSlide slide={slides[slideIndex + 1]} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}
//#endregion - reanimate slide


//#endregion - dot navigation controller

//#region - Main App Component

//#region - Sample slides data
// if we want same style for each slide, define once else define separately
// const slideStyle = {
//     container: {
//       flex: 1,
//       backgroundColor: 'transparent',
//     },
//     titleContainer: {},
//     title: {
//       color: 'white',
//       fontSize: 30,
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     contentContainer: {},
//     content: {
//       color: 'white',
//       fontSize: 20,
//       textAlign: 'center',
//     },
//     imageContainer: {},
//     image: {
//       width: 200,
//       height: 200,
//     },
// }

// data for each slide
// const slides = [
//      {
//       key: 'key1',
//       title: 'DISCOVER',
//       content:
//         'Do not waste time sorting through list. Discover the right business partner for you with tailored matching algorithm.',
//       image: imageAssets.intro1.localUri,

//       style: slideStyle,
//     },
// ....
// ...
// ]

//#endregion - Sameple slides data

export const App = ({
  slides,
  SlideLeftAnimatedComponent,
  SlideRightAnimatedComponent,
  slideWidth,
  onChange,
}) => {
    const [slideIndex, setSlideIndex] = useState(0)
    
    const onSlideChange = (newSlideIndex) => {
        setSlideIndex(newSlideIndex)
        if (onChange) {
        onChange(newSlideIndex)
        }
    }
    
    return (
      <View>
        <AnimatedSlide
         slides={slides}
          slideIndex={slideIndex}
          SlideLeftAnimatedComponent={SlideLeftAnimatedComponent}
          SlideRightAnimatedComponent={SlideRightAnimatedComponent}
          slideWidth={slideWidth}
          onChange={onSlideChange}
        />
      </View>
    )
}


