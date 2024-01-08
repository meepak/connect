import React, {
    useEffect, useRef, useCallback, useState
  } from 'react'
  import {
      Dimensions,
      FlatList,
    ImageSourcePropType,
    StyleSheet,
    View,
    // Image
  } from 'react-native'
  import {Image} from 'expo-image'
  import { Text, useTheme } from 'react-native-paper'
  import SheetModal from '@/components/core/sheet-modal'
import {  BottomSheetModal } from '@gorhom/bottom-sheet'
import imageAssets from '@/theme/images'
import DotPaginator from './dot-paginator'
import Animated, { FlipInYLeft as slideLeft, FlipInYRight as slideRight} from 'react-native-reanimated'

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    image: {
      width: screenWidth,
      height: 300,
      // height: 152,

    },
    imageView: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'red',
    },
    text: {
      textAlign: 'center',
      // color: colors.onBackground,
    },
    textView: {
      width: screenWidth,
      alignItems: 'center',
      // bottom: 30,
    },
  })

const slides = [
    {
      key: 's1',
    //   text: 'PARTNERSHIPS',
      word1: 'DISCOVER',
      // word2: 'PARTNERSHIPS',
      image: imageAssets.intro1,
    },
    {
      key: 's2',
      word1: 'CONNECT',
      // word2: 'CONNECTION',
      image: imageAssets.intro2,
    },
    {
      key: 's3',
      word1: 'THRIVE',
      // word2: 'TOGETHER',
      image: imageAssets.intro3,
    },
  ]

  interface AppFeaturesIntroProps {
    show: boolean
    onClose?: () => void
  }

  const AppFeaturesIntro = (
    {
       show = false,
       onClose = () => {} 
    }
    ) => {
    const appFeaturesSheetRef = useRef<BottomSheetModal>(null)
    const [currentSliderIndex, setCurrentSliderIndex] = useState(0)
    const [lastSliderIndex, setLastSliderIndex] = useState(0)

    const openMe = useCallback(() => {
      if (appFeaturesSheetRef.current) {
        appFeaturesSheetRef.current?.present()
      }
    }, [])

    const closeMe = useCallback(() => {
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

    const { colors } = useTheme()

    const RenderSlide = ({slide}) => (
       <Animated.View
          style={{
            backgroundColor: 'transparent', //transparent
            marginTop: 10,
            flex: 1,
          }}
          entering={(lastSliderIndex - currentSliderIndex) < 0 ? slideLeft : slideRight}
        >
          <View style={styles.imageView}>
           <Image style={styles.image} source={slide.image as ImageSourcePropType} contentFit={'contain'} contentPosition={'center'}/>
          </View>
          <View style={{...styles.textView }}>
            <Text variant="headlineSmall"  >{slide.word1}</Text>
          </View>
        </Animated.View>
    )

    return (
      <SheetModal ref={appFeaturesSheetRef} snapsAt={['60%']} onDismiss={handleDismiss} title="What's new?">
        <View style={{flex: 1, alignItems: 'center' }}>
        
         
       <RenderSlide slide={slides[currentSliderIndex ?? 0]} />
        
        </View>
        <View style={{width: '100%', height: 60, backgroundColor: colors.primaryContainer}}>
          <DotPaginator
                totalPages={slides.length}
                onPageChanged={(index) => { 
                  setCurrentSliderIndex(
                    (lastIndex) => {
                      setLastSliderIndex(() => lastSliderIndex)
                      return index;
                    }
                  ) 
                }}
                />
        </View>
      </SheetModal>
    )
  }

  export default AppFeaturesIntro
