import React, { useContext } from 'react'
import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

// import { UserDataContext } from '../../../context/UserDataContext'

import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'
// import HeaderRightButton from '../../../components/HeaderRightButton'

import Chat from '../../../scenes/chat'

const Stack = createStackNavigator()

const ChatStack = () => {
  const scheme = useColorScheme()
  // const { userData } = useContext(UserDataContext)
  const navigationProps = scheme === 'dark' ? darkProps : lightProps

  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Group>
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={(/* { navigation } */) => ({
            headerBackground: () => <HeaderStyle />,
            // headerRight: () => <HeaderRightButton from="Connect" userData={userData} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default ChatStack
