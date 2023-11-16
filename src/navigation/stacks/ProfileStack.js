import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Profile from '../../scenes/profile'
import EditIntro from '../../scenes/profile/EditIntro'
import EditKeySummary from '../../scenes/profile/EditKeySummary'
import EditExperiences from '../../scenes/profile/EditExperiences'
import EditExperience from '../../scenes/profile/EditExperience'
import SelectLocation from '../../scenes/location'
import Occupation from '../../scenes/occupation'
// import HeaderStyle from '../../../components/header/HeaderStyle'

const Stack = createStackNavigator()

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: 'modal',
      headerShown: false,
      gestureEnabled: false,
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

    <Stack.Screen
      name="EditIntro"
      component={EditIntro}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />

    <Stack.Screen
      name="EditKeySummary"
      component={EditKeySummary}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />

    <Stack.Screen
      name="EditExperiences"
      component={EditExperiences}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="EditExperience"
      component={EditExperience}
      options={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    />

    <Stack.Group
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
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
