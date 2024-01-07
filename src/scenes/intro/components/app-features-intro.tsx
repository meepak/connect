import React, {
    useEffect, useRef, useCallback, useState
  } from 'react'
  import {
      Dimensions,
      FlatList,
    Image,
    StyleSheet,
    View,
  } from 'react-native'
  import { Text, useTheme } from 'react-native-paper'
  import {
    useNavigation,
  } from '@react-navigation/native'
  import PropTypes from 'prop-types'

  import SheetModal from '../../../components/core/sheet-modal'
import { BottomSheetFlatList, BottomSheetFlatListMethods, BottomSheetModal } from '@gorhom/bottom-sheet'
import imageAssets from '../../../theme/images'
import DotPaginator from './dot-paginator'

const screenWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
    image: {
      width: screenWidth,
    //   height: 300,
      height: 152,

    },
    imageView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: screenWidth,
    },
    text: {
      textAlign: 'center',
    //   color: colors.onBackground,
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

  const AppFeaturesIntro = ({ show, onClose }) => {
    const appFeaturesSheetRef = useRef<BottomSheetModal>(null)
    const sliderRef = useRef<BottomSheetFlatListMethods>(null)
    // const [currentSliderIndex, setCurrentSliderIndex] = useState(0)

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


    const renderItem = (slide) => (
        <View
          style={{
            backgroundColor: 'transparent', //transparent
            marginTop: 10,
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



    return (
      <SheetModal ref={appFeaturesSheetRef} snapsAt={['60%']} onDismiss={handleDismiss} title="What's new?">
        <View style={{flex: 1, alignItems: 'center' }}>
        <BottomSheetFlatList
          ref={sliderRef}
          data={slides}
          renderItem={renderItem}
          maxToRenderPerBatch={3}
          windowSize={3}
          contentContainerStyle={{
            zIndex: 2,
          }}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          scrollEnabled = {false}
          // viewabilityConfig={{
          //   itemVisiblePercentThreshold: 90
          // }}
          // onViewableItemsChanged={
          //   useCallback(
          //     (({viewableItems}) => {
          //         if(viewableItems.length > 0 && viewableItems[0].index) {
          //           setCurrentSliderIndex(() => viewableItems[0].index)
          //         }
          //       }), [])
          // }
          // debug
        />
        </View>
        <View style={{width: '100%', height: 60, backgroundColor: colors.primaryContainer}}>
          <DotPaginator
                totalPages={slides.length}
                // currentPageIndex={currentSliderIndex}
                onPageChanged={(index) => {
                          sliderRef.current?.scrollToIndex({
                            index: index,
                            animated: true,
                          })
                      }}
                    />
        </View>
      </SheetModal>
    )
  }

  AppFeaturesIntro.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  export default AppFeaturesIntro
