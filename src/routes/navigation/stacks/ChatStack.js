import React from 'react'
import { useTheme } from 'react-native-paper'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Chat from '../../../scenes/chat'
import ChatMain from '../../../scenes/chatMain'
import HeaderStyle from '../../../components/HeaderStyle'
import Header4Chat from '../../../components/Header4Chat'
import { ChatTabs } from '../tabsTop'

const Stack = createStackNavigator()

const ChatStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={(/* { navigation } */) => ({
        headerBackground: () => <HeaderStyle />,
        headerBackTitleVisible: false,
        headerBackTitleStyle: {
          color: colors.onBackground,
        },
        headerTitle: () => (
          <Header4Chat />
        ),
      })}
    >

      <Stack.Group
        screenOptions={(/* { navigation } */) => ({
          headerBackground: () => <HeaderStyle />,
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

      >

        <Stack.Screen
          name="ChatTabs"
          component={ChatTabs}
        />

        <Stack.Screen
          name="ChatMain"
          component={ChatMain}
        />

        <Stack.Screen
          name="Chat"
          component={Chat}
        />

      </Stack.Group>

    </Stack.Navigator>
  )
}

export default ChatStack
