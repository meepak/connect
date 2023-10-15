import React, { useState } from 'react'
// import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeTitleContext from '../../../context/HomeTitleContext'
// import { lightProps, darkProps } from '../../navigationProps'
import HeaderStyle from '../../../components/HeaderStyle'
import Header from '../../../components/Header'

import Find from '../../../scenes/find'
import Detail from '../../../scenes/detail'

const Stack = createStackNavigator()

const FindStack = () => {
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
              name="Find"
              component={Find}
              options={(/* { navigation } */) => ({
                headerBackground: () => <HeaderStyle />,
                headerTitle: () => (
                  <Header />
                ),
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

export default FindStack
