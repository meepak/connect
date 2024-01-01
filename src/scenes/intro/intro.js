import React, { useState } from 'react'
import { Dimensions, StyleSheet, View, useColorScheme } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ScreenTemplate } from '../../components/templates'

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
  const SCREEN_WIDTH = Dimensions.get('screen').width
  const SCREEN_HEIGHT = Dimensions.get('screen').height

  return (
    <ScreenTemplate>
      <View style={{ ...styles.container }}>


        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Button onPress={() => navigation.navigate('Sign in')} mode="outlined">
            <Text variant="bodyLarge">Enter</Text>
          </Button>
        </View>

      </View>
    </ScreenTemplate>
  )
}

export default Intro
