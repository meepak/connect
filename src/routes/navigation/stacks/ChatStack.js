import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HeaderStyle from '../../../components/HeaderStyle'
import Header from '../../../components/Header'
import Chat from '../../../scenes/chat'

const Stack = createStackNavigator()

const ChatStack = () => (
  <Stack.Navigator>
    <Stack.Group>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={(/* { navigation } */) => ({
          headerBackground: () => <HeaderStyle />,
          headerTitle: () => (
            <Header />
          ),
        })}
      />
    </Stack.Group>
  </Stack.Navigator>
)

export default ChatStack
