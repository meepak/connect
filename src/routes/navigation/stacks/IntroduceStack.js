import React, { useContext } from 'react'
import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
// import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'

import Introduce from '../../../scenes/introduce'
import Logo from '../../../components/Logo'

const Stack = createStackNavigator()

const IntroduceStack = () => {
  const { scheme } = useColorScheme()
  // const navigationProps = scheme === 'dark' ? darkProps : lightProps
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Introduce"
        component={Introduce}
        options={(/* { navigation } */) => ({
          headerBackground: () => <HeaderStyle />,
          headerTitle: () => ( // App Logo
            <Logo style={{ width: 200, alignSelf: 'center' }} />
          ),
        })}
      />
    </Stack.Navigator>
  )
}

export default IntroduceStack
