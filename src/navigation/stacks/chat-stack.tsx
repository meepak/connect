import React from 'react'
import { useTheme } from 'react-native-paper'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Chat from '@/scenes/chat'
import ChatTabs from '@/scenes/chat-main/chat-tabs'
import { HeaderChat } from '@/components/header'

const Stack = createStackNavigator()

const ChatStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={() => ({
      })}
    >

      <Stack.Group>

        <Stack.Screen
          name="ChatTabs"
          component={ChatTabs}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
            gestureDirection: 'horizontal-inverted',
          }}
        />

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={() => ({
            headerShown: true,
            headerTintColor: colors.onBackground,
            headerBackTitleVisible: false,
            headerLeftLabelVisible: false,
            headerLeft: null,
            headerRight: null,
            headerTitle: () => (
              <HeaderChat />
            ),
            ...TransitionPresets.SlideFromRightIOS,
          })}
        />

      </Stack.Group>

    </Stack.Navigator>
  )
}

export default ChatStack
