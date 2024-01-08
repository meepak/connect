import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Profile from '@/scenes/profile'
import EditIntro from '@/scenes/profile/edit-intro'
import EditKeySummary from '@/scenes/profile/edit-key-summary'
import EditExperiences from '@/scenes/profile/edit-experiences'
import EditExperience from '@/scenes/profile/edit-experience'
import SelectLocation from '@/scenes/location'
import Occupation from '@/scenes/occupation'

const Stack = createStackNavigator()

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: 'modal',
      headerShown: false,
      gestureEnabled: false, // can't override
      cardStyle: { flex: 1 },
    }}
  >

    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />

    <Stack.Group
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
        gestureEnabled: false, // can't override
        cardOverlayEnabled: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name="EditIntro"
        component={EditIntro}
      />

      <Stack.Screen
        name="EditKeySummary"
        component={EditKeySummary}
      />

      <Stack.Screen
        name="EditExperiences"
        component={EditExperiences}
      />
      <Stack.Screen
        name="EditExperience"
        component={EditExperience}
      />

      <Stack.Screen
        name="SelectLocation"
        component={SelectLocation}
      />
      <Stack.Screen
        name="SelectOccupation"
        component={Occupation}
      />

    </Stack.Group>

  </Stack.Navigator>
)

export default ProfileStack
