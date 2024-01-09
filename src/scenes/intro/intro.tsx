import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import IntroSceneOne from './scenes/one'
import AppFeaturesIntro from './components/app-features-intro'

const Intro = () => {
  const navigation = useNavigation()
  const [showAppFeatures, setShowAppFeatures] = useState(true)

  const ENTER_DURATION = 500
  const SCREEN_WIDTH = Dimensions.get('window').width
  const SCREEN_HEIGHT = Dimensions.get('window').height
  const VIEW_WIDTH = SCREEN_WIDTH
  const VIEW_HEIGHT = SCREEN_HEIGHT * 0.8

  return (
    <>
      <IntroSceneOne
        width={VIEW_WIDTH}
        height={VIEW_HEIGHT}
        enterTime={ENTER_DURATION}
      />
      <Button onPress={() => navigation.navigate('Sign in' as never)} mode="outlined">
        <Text variant="bodyLarge">Enter</Text>
      </Button>
      <Button onPress={() => setShowAppFeatures(true)} mode="outlined">
        <Text variant="bodyLarge">App Features</Text>
      </Button>

      <AppFeaturesIntro
        show={showAppFeatures}
        onClose={() => {
          setShowAppFeatures(false)
        }}
      />
    </>
  )
}

export default Intro
