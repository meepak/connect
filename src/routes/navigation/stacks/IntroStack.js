import React, { useContext } from 'react'
import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
// import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'

import Intro from '../../../scenes/intro'
import LoginStack from './LoginStack'

const Stack = createStackNavigator()

const IntroStack = () => {
  const  scheme  = useColorScheme()
  // const navigationProps = scheme === 'dark' ? darkProps : lightProps
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={(/* { navigation } */) => ({
          headerBackground: scheme === 'dark' ? null : () => <HeaderStyle />,
        })}
      />

      <Stack.Screen
        name="LoginStack"
        component={LoginStack}
      />
    </Stack.Navigator>
  )
}

export default IntroStack
