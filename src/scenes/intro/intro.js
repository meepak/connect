import React, { useState, useColorScheme } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ScreenTemplate } from '../../components/templates'
import AnimatedLogoNameIntro from '../../components/animated/animated-splash'
import AnimatedName from '../../components/animated/animated-name'
import SvgFindAssociate from '../../components/svg/svg-find-associate'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

// TODO -- either use global atom state to check AnimatedLogoNameIntro was shown before and do not show here again
// Or create different loading screen and always use AnimatedLogoNameIntro here
const Intro = () => {
  const { colors } = useTheme()
  const isDark = useColorScheme() === 'dark'
  const navigation = useNavigation()
  // const [introSceneFinished, setIntroSceneFinished] = useState(false)

  return (
    <ScreenTemplate>
      <View style={{ ...styles.container }}>

        <View style={{
          width: 700, height: 100, borderWidth: 1, borderColor: 'green',
        }}
        >
          {/* <AnimatedName /> */}
          <SvgFindAssociate stroke={colors.onBackground} strokeWidth={isDark ? 7 : 5} />
        </View>

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
