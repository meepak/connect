import React, { useEffect } from 'react'
import { Dimensions, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingScreen from '@/components/animated/loading/loading-screen'
import ErrorScreen from '@/components/error-screen'
import { useAuthUser } from '@/context'
import SvgAnimatedMuncheBg from '@/components/animated/svg-animated-munche-bg'

const { width, height } =  Dimensions.get('screen')
interface ScreenTemplateProps {
  children: React.ReactNode
  isLoading?: boolean
  isError?: ConstrainBoolean
}

const ScreenTemplate = ({
  isLoading = false,
  isError = false,
  children = <></>,
}: ScreenTemplateProps) => {
  const navigation = useNavigation()
  const { authUser } = useAuthUser()
  // const { colors } = useTheme()

  if (isError) {
    // console.log('Screen Template received IsError')
    children = <ErrorScreen />
    // return <ErrorScreen />
  }

  if (isLoading) {
    children = <LoadingScreen />
    // return <LoadingScreen />
  }

  // If keyboard was active in screen remove it
  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        // TODO -- Probably don't need in iOS, test and put condition
        if (Keyboard.isVisible()) {
          Keyboard.dismiss()
        }
      }),
    [navigation],
  )

  return (
    <>
      <StatusBar
        hidden={false}
        style={authUser?.preferences?.isDark ? 'light' : 'dark'}
      />
      <SvgAnimatedMuncheBg width={width} height={height} />
      <SafeAreaView
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
        }}
      >
        {children}
      </SafeAreaView>
    </>
  )
}

export default ScreenTemplate
