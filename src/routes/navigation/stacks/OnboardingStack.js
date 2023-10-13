import React from 'react'
// import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
// import HeaderStyle from '../../../components/HeaderStyle'
import Onboarding from '../../../scenes/onboarding'
import Logo from '../../../components/Logo'
import SelectLocation from '../../../scenes/location'
import Occupation from '../../../scenes/occupation'

const Stack = createStackNavigator()

const OnboardingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Back"
      component={Onboarding}
      options={(/* { navigation } */) => ({
        // headerBackground: () => <HeaderStyle />,
        headerTitle: () => ( // App Logo
          <Logo style={{ width: 200, alignSelf: 'center' }} />
        ),
      })}
    />
    <Stack.Screen
      name="Select Location"
      component={SelectLocation}
      options={(/* { navigation } */) => ({
        // headerBackground: () => <HeaderStyle />,
        headerTitle: () => ( // App Logo
          <Logo style={{ width: 200, alignSelf: 'center' }} />
        ),
      })}
    />
    <Stack.Screen
      name="Select Occupation"
      component={Occupation}
      options={(/* { navigation } */) => ({
        // headerBackground: () => <HeaderStyle />,
        headerTitle: () => ( // App Logo
          <Logo style={{ width: 200, alignSelf: 'center' }} />
        ),
      })}
    />
  </Stack.Navigator>
)

export default OnboardingStack
