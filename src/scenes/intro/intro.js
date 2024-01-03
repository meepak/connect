import React, { useState } from 'react'
import { Dimensions, StyleSheet, View, useColorScheme } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ScreenTemplate } from '../../components/templates'
import IntroSceneOne from './scenes/One'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Intro = () => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'
  const navigation = useNavigation()
  const ENTER_DURATION = 2000
  const SCREEN_WIDTH = Dimensions.get('screen').width
  const SCREEN_HEIGHT = Dimensions.get('screen').height
  const VIEW_WIDTH = SCREEN_WIDTH - 40
  const VIEW_HEIGHT = SCREEN_HEIGHT * 0.8

  return (
    <ScreenTemplate>

        <IntroSceneOne width={VIEW_WIDTH} height={VIEW_HEIGHT} enterTime={ENTER_DURATION} />
        
        <View style={{...styles.container, height: SCREEN_HEIGHT - VIEW_HEIGHT, width: SCREEN_WIDTH}}>

        {/* <View style={{ position: 'absolute', bottom: 0, right: 0 }}> */}
          <Button onPress={() => navigation.navigate('Sign in')} mode="outlined">
            <Text variant="bodyLarge">Enter</Text>
          </Button>
        {/* </View> */}
        </View>

    </ScreenTemplate>
  )
}

export default Intro
