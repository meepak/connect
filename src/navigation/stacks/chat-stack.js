import React from 'react'
import { useTheme } from 'react-native-paper'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Chat from '../../scenes/chat'
import ChatTabs from '../../scenes/chat-main/chat-tabs'
import Header4Chat from '../../components/header/header-4-chat'

const Stack = createStackNavigator()

const ChatStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >

      <Stack.Group>

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
