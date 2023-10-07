import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
// import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'

import Introduce from '../../../scenes/introduce'

const Stack = createStackNavigator()

const IntroduceStack = () => {
  const { scheme } = useContext(ColorSchemeContext)
  // const navigationProps = scheme === 'dark' ? darkProps : lightProps
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Introduce"
        component={Introduce}
        options={(/* { navigation } */) => ({
          headerBackground: scheme === 'dark' ? null : () => <HeaderStyle />,
        })}
      />
    </Stack.Navigator>
  )
}

export default IntroduceStack
