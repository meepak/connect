import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ScreenTemplate } from '@/components/template'
import TypewriterText from '@/components/animated/TypewriterText'
import IntroSceneOne from './scenes/one'
import { getGreeting, sleep } from '@/utils/functions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Intro = () => {
  const { colors } = useTheme()
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [renderedScenes, setRenderedScenes] = useState([])
  const navigation = useNavigation()

  const setNextScene = (index) => {
    setCurrentSceneIndex(index)
  }

  const handleRestart = () => {
    setCurrentSceneIndex(0)
    setRenderedScenes([])
  }

  const scenes = [
    {
      component: IntroSceneOne,
      step: 'one',
      color: colors.onBackground,
      bgColor: colors.background,
      onFinished: (finished) => sleep(100).then(() => (finished && setNextScene(1))),
    },
    {
      component: TypewriterText,
      step: 'two',
      text: getGreeting(),
    },
    // Add more scenes as needed
  ]

  useEffect(() => {
    if (currentSceneIndex > 0 && currentSceneIndex < scenes.length) {
      // const currentScene = scenes[currentSceneIndex]
      // if (currentScene.onFinished) {
      //   currentScene.onFinished(setNextScene)
      // }

      if (!renderedScenes.includes(currentSceneIndex)) {
        setRenderedScenes((prevRenderedScenes) => [...prevRenderedScenes, currentSceneIndex])
      }
    }
  }, [currentSceneIndex])

  return (
    <ScreenTemplate>
      <View style={{ ...styles.container }}>
        {scenes.map((scene, index) => (
          (renderedScenes.includes(index) || index === currentSceneIndex)
          && React.createElement(scene.component, { key: scene.step, ...scene })
        ))}

        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Button onPress={() => navigation.navigate('Sign in')} mode="outlined">
            <Text variant="bodyLarge">Enter</Text>
          </Button>
        </View>

        <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <Button onPress={handleRestart} mode="outlined">
            <Text variant="bodyLarge">Restart</Text>
          </Button>
        </View>
      </View>
    </ScreenTemplate>
  )
}

export default Intro
