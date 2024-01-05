import React, {
    useEffect, useRef, useCallback,
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
  
  import SheetModal from '../../components/core/sheet-modal'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import imageAssets from '../../theme/images'

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
      borderWidth: 1, borderColor: 'green'
    },
    text: {
      textAlign: 'center',
    //   color: colors.onBackground,
    },
    textView: {
      width: screenWidth,
      alignItems: 'center',
      // bottom: 30,
      borderWidth: 1, borderColor: 'yellow'
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
    const appFeaturesSheetRef = useRef()
  
    const openMenu = useCallback(() => {
      if (appFeaturesSheetRef.current) {
        appFeaturesSheetRef.current.present()
      }
    }, [])
  
    const closeMenu = useCallback(() => {
      if (appFeaturesSheetRef.current) {
        appFeaturesSheetRef.current.close()
      }
    }, [])
  
    useEffect(() => {
      if (show) {
        openMenu()
      } else {
        closeMenu()
      }
    }, [show])
  
    const handleDismiss = useCallback(() => {
      onClose()
    }, [])
  
    const { colors } = useTheme()
    const navigation = useNavigation()
  
    const menuClicked = (screen) => {
      appFeaturesSheetRef.current.dismiss()
      setTimeout(() => {
        navigation.navigate(screen, {
          screen,
          //   params: {
          //     data: userData,
          //     from: 'My Profilie',
          //   },
        })
      }, 100)
    }

    const renderItem = (slide) => (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.elevation.level0, //transparent
            marginTop: 10,
            borderWidth: 1, borderColor: 'blue'
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
        <View style={{borderWidth: 1, borderColor: 'red', flex: 1, alignItems: 'center' }}>
        <BottomSheetFlatList
        //   ref={slider}
          data={slides}
          renderItem={renderItem}
        //   contentContainerStyle={{
        //     zIndex: 2,
        //   }}
          keyExtractor={(item) => item.key}
        //   showsVerticalScrollIndicator={false}
        //   showsHorizontalScrollIndicator={false}
        //   horizontal
          pagingEnabled
          debug
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
  