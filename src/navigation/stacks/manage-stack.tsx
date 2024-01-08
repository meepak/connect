import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Manage from '@/scenes/manage'
import { ManageBackgroundCheck, ManageInvitations, ManageNda } from '@/scenes/manage/section'

const Stack = createStackNavigator()

const ManageStack = () => (
  <Stack.Navigator
    screenOptions={{
      presentation: 'modal',
      headerShown: false,
      gestureEnabled: false, // can't override
      cardStyle: { flex: 1 },
    }}
  >

    <Stack.Screen
      name="Manage"
      component={Manage} // not sure how this will be used, will see
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
        ...TransitionPresets.ModalSlideFromBottomIOS, // only applies if I am coming from manage sreen,
      }}
    >

      <Stack.Screen
        name="ManageInvitations"
        component={ManageInvitations}
      />

      <Stack.Screen
        name="ManageBackgroundCheck"
        component={ManageBackgroundCheck}
      />

      <Stack.Screen
        name="ManageNda"
        component={ManageNda}
      />
    </Stack.Group>
  </Stack.Navigator>
)

export default ManageStack
