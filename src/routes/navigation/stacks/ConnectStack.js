import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { UserDataContext } from '../../../context/UserDataContext'
import HeaderStyle from '../../../components/HeaderStyle'
import HeaderRightButton from '../../../components/HeaderRightButton'
import { FollowFollowerTabs } from '../tabsTop'

const Stack = createStackNavigator()

const ConnectStack = () => {
  const { userData } = useContext(UserDataContext)

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Connect"
          component={FollowFollowerTabs}
          options={(/* { navigation } */) => ({
            headerBackground: () => <HeaderStyle />,
            headerRight: () => <HeaderRightButton from="Connect" userData={userData} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default ConnectStack
