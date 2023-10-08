import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useColorScheme } from 'react-native'
import HomeTitleContext from '../../../context/HomeTitleContext'

import HeaderStyle from '../../../components/HeaderStyle'
import Post from '../../../scenes/post'
import Print from '../../../scenes/print'
import { colors } from '../../../theme'

const Stack = createStackNavigator()

const ModalStack = () => {
  const [title, setTitle] = useState('Back')
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

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
            }}
          >
            <Stack.Screen
              name="Post"
              component={Post}
              options={{
                title: ctx.title,
                headerBackTitle: '',
                headerBackground: () => <HeaderStyle />,
                // headerBackground: isDark ? colors.black : colors.white,
                headerTintColor: isDark ? colors.white : colors.white,
              }}
            />
            <Stack.Screen
              name="Print"
              component={Print}
            />
          </Stack.Navigator>
        )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}

export default ModalStack
