import React from 'react'
import { useTheme } from 'react-native-paper'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Chat from '../../scenes/chat'
import HeaderStyle from '../../components/header/header-style'
import Header4Chat from '../../components/header/header-4-chat'
import ChatTabs from '../tabs-top'
import Header from '../../components/header/header'

const Stack = createStackNavigator()

const ChatStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={(/* { navigation } */) => ({
        headerBackground: () => <HeaderStyle />,
        headerTitle: () => (
          <Header />
        ),
      })}
    >

      <Stack.Group
        screenOptions={(/* { navigation } */) => ({
          // headerBackground: () => <HeaderStyle />,
          // headerTintColor: colors.onBackground,
          // headerBackTitleVisible: false,
          // headerBackTitleStyle: {
          //   color: colors.onBackground,
          // },
        })}

      >

        <Stack.Screen
          name="ChatTabs"
          component={ChatTabs}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
            gestureDirection: 'horizontal-inverted',
          }}
        />

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={() => ({
            headerTintColor: colors.onBackground,
            headerBackTitleVisible: false,
            headerBackTitleStyle: {
              color: colors.onBackground,
            },
            headerTitle: () => (
              <Header4Chat />
            ),
            ...TransitionPresets.SlideFromRightIOS,
          })}
        />

      </Stack.Group>

    </Stack.Navigator>
  )
}

export default ChatStack
