import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Onboarding from '../../../scenes/onboarding'
import Logo from '../../../components/core/Logo'
import SelectLocation from '../../../scenes/location'
import Occupation from '../../../scenes/occupation'

const Stack = createStackNavigator()

const OnboardingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Onboarding"
      component={Onboarding}
      options={() => ({
        headerTitle: () => ( // App Logo
          <Logo style={{ width: 200, alignSelf: 'center' }} />
        ),
      })}
    />
    <Stack.Screen
      name="SelectLocation"
      component={SelectLocation}
      options={{
        presentation: 'modal',
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: false,
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    />
    <Stack.Screen
      name="SelectOccupation"
      component={Occupation}
      options={{
        presentation: 'modal',
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: false,
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    />
  </Stack.Navigator>
)

export default OnboardingStack
