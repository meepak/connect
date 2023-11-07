import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Profile from '../../../scenes/profile'
import EditIntro from '../../../scenes/profile/EditIntro'
import EditKeySummary from '../../../scenes/profile/EditKeySummary'
import EditExperiences from '../../../scenes/profile/EditExperiences'
import EditExperience from '../../../scenes/profile/EditExperience'
// import HeaderStyle from '../../../components/header/HeaderStyle'

const Stack = createStackNavigator()

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
    }}
  >

    <Stack.Screen
      name="Profile"
      component={Profile}
      // options={{
      //   title: 'Hello',
      //   headerBackTitle: 'Back',
      //   headerTitleAlign: 'center',
      //   // headerBackground: () => <HeaderStyle />,
      //   // headerTintColor: isDark ? colors.white : colors.white,
      // }}
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

  </Stack.Navigator>
)

export default ProfileStack
