import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTitleContext from '../../../context/HomeTitleContext'
// import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/header/HeaderStyle'
import Header from '../../../components/header/Header'

import Home from '../../../scenes/home'
import Detail from '../../../scenes/detail'
// import Profile from '../../../scenes/profile'

const Stack = createStackNavigator()

const HomeStack = () => {
  const { colors } = useTheme()
  // const navigationProps = scheme === 'dark' ? darkProps : lightProps
  const [title, setTitle] = useState('default title')
  return (
    <HomeTitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={(/* { navigation } */) => ({
                headerBackground: () => <HeaderStyle />,
                headerTitle: () => (
                  <Header />
                ),
              })}
            />
            {/* <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: ctx.title,
                headerBackground: () => <HeaderStyle />,
              }}
            /> */}
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                title: ctx.title,
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

export default HomeStack
