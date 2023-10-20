import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'
import HomeTitleContext from '../../../context/HomeTitleContext'

import HeaderStyle from '../../../components/HeaderStyle'
import Post from '../../../scenes/post'
import Print from '../../../scenes/print'

const Stack = createStackNavigator()

const ModalStack = () => {
  const [title, setTitle] = useState('Back')
  const { colors } = useTheme()

  return (
    <HomeTitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerTintColor: colors.onBackground,
            }}
          >
            <Stack.Screen
              name="Post"
              component={Post}
              options={{
                title: ctx.title,
                headerBackTitle: '',
                headerBackground: () => <HeaderStyle />,
                headerTintColor: colors.onBackground,
              }}
            />
            <Stack.Screen
              name="Print"
              component={Print}
              options={{
                // title: ctx.title,
                headerBackground: () => <HeaderStyle />,
                headerTintColor: colors.onBackground,
              }}
            />
          </Stack.Navigator>
        )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}

export default ModalStack
