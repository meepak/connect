import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, useColorScheme } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ScreenTemplate } from '../../components/templates'
import IntroSceneOne from './scenes/One'
import SvgAnimatedLogoBg from '../../components/animated/svg-animated-logo-bg'
import AppFeaturesIntro from './components/app-features-intro'
import SvgAnimatedMuncheBg from '../../components/animated/svg-animated-munche-bg'



const Intro = () => {
  const navigation = useNavigation()
  const [showAppFeatures, setShowAppFeatures] = useState(true)

  const ENTER_DURATION = 500
  const SCREEN_WIDTH = Dimensions.get('screen').width
  const SCREEN_HEIGHT = Dimensions.get('screen').height
  const VIEW_WIDTH = SCREEN_WIDTH
  const VIEW_HEIGHT = SCREEN_HEIGHT * 0.8

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })


  return (         
  <>
  <SvgAnimatedMuncheBg />
  <ScreenTemplate>

      <IntroSceneOne width={VIEW_WIDTH} height={VIEW_HEIGHT} enterTime={ENTER_DURATION} />

      {/* <View style={{ position: 'absolute', bottom: 0, right: 0 }}> */}
      <Button onPress={() => navigation.navigate('Sign in')} mode="outlined">
        <Text variant="bodyLarge">Enter</Text>
      </Button>
      {/* </View> */}
      <Button onPress={() => setShowAppFeatures(true)} mode="outlined">
        <Text variant="bodyLarge">App Features</Text>
      </Button>

    <AppFeaturesIntro show={showAppFeatures} onClose={() => { setShowAppFeatures(false) }} />
    </ScreenTemplate>
  
    </>
  )
}

export default Intro
