import React, { useContext, useEffect } from 'react'
import { Dimensions, Keyboard, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'react-native-paper'
import LoadingScreen from '@/components/animated/loading/loading-screen'
import ErrorScreen from '@/components/error-screen'
import { useAuthUser } from '@/context'
import LorenzAttractor from '@/components/svg/lorenz-attractor'
// import SvgAnimatedLogoBg from '@/components/animated/svg-animated-logo-bg'

const { width, height } = Dimensions.get('screen') // we don't want animmation change when keyboard appears 
const styles = StyleSheet.create({
        rootLayout: {
            width: width,
            height: height,
            flex: 1,

            // Glassmorphic effect
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,


            // backgroundColor: colors.surfaceContainerHighest,
            // below line causes view shadow calculation warning in IOS, note for similar cases
            // backgroundColor: colors.surfaceContainerHighest,
            // backgroundColor: convertHexToRGBA(colors.background, 0.2) as ColorValue, // 'rgba(155, 155, 155, 0.2)', // Adjust thce alpha for transparency
            // opacity: 0.2, // this is just not the same as having transparent background color
            // borderRadius: 16, // Adjust the border radius for rounded corners
            // paddingHorizontal: 16,
            // marginHorizontal: 16,
            // width: '80%', // Adjust the width as needed
            // alignSelf: 'center',
            // justifyContent: 'flex-start',
            // alignItems: 'flex-start',
        },
      })


interface ScreenTemplateProps {
  children: React.ReactNode
  onTouchStart?: () => void
  onTouchEnd?: () => void
  isLoading?: boolean
  isError?: ConstrainBoolean
}

const ScreenTemplate = (
  {
    isLoading = false,
    isError = false,
    children = <></>,
    onTouchStart = () => {},
    onTouchEnd = () => {},
  }: ScreenTemplateProps
  ) => {
  const navigation = useNavigation()
  const { authUser } = useAuthUser()
  // const preferences = useContext(PreferencesContext)
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
  useEffect(() => navigation.addListener('beforeRemove', () => {
    // TODO -- Probably don't need in iOS, test and put condition
    if (Keyboard.isVisible()) {
      Keyboard.dismiss()
    }
  }), [navigation])

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}>
        <StatusBar hidden={false} style={authUser?.preferences?.isDark ? 'light' : 'dark'} />
        <LorenzAttractor /> 
        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>
          { children }
        </SafeAreaView>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  )
}

export default ScreenTemplate
