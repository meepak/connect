import React from 'react'
import { useTheme } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import HeaderStyle from '../../components/header/HeaderStyle'
import Header from '../../components/header/Header'
import Manage from '../../scenes/manage'
import Edit from '../../scenes/edit'

const Stack = createStackNavigator()

const ManageStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: false,
      }}
    >
      <Stack.Screen
        name="Manage"
        component={Manage}
        options={(/* { navigation } */) => ({
          // headerBackground: () => <HeaderStyle />,
          // headerTitle: () => (
          //   <Header />
          // ),
        })}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={() => ({
          headerBackground: () => <HeaderStyle />,
          headerTintColor: colors.onBackground,
          headerBackTitleVisible: false,
        })}
      />

    </Stack.Navigator>
  )
}

export default ManageStack
