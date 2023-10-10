import React, { useState } from 'react'
// import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTitleContext from '../../../context/HomeTitleContext'
// import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'

import Home from '../../../scenes/home'
import Detail from '../../../scenes/detail'

const Stack = createStackNavigator()

const HomeStack = () => {
  // const scheme = useColorScheme()
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
              })}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                title: ctx.title,
                headerBackground: () => <HeaderStyle />,
              }}
            />
          </Stack.Navigator>
        )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}

export default HomeStack
