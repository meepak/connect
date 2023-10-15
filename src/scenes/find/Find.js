import React, {
  useState, useContext, useCallback,
} from 'react'
import {
  ScrollView, StyleSheet, RefreshControl,
} from 'react-native'
import {
  Surface, Text,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../theme'

import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
import { UserDataContext } from '../../context/UserDataContext'
import UserListItem from '../../components/UserListItem'
import TestFontsize from '../../components/TestFontsize'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
})

export default function Find() {
  const navigation = useNavigation()
  // const [token, setToken] = useState('')
  const { userData } = useContext(UserDataContext)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const indexArray = new Array(10).fill('')

  return (
    <ScreenTemplate>
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <UserListItem />
        {indexArray.map((_, index) => (
          <TestFontsize
            // eslint-disable-next-line react/no-array-index-key
            key={index + 1}
            user=""
          />
        ))}
        <Button
          label="Go to Detail"
          color={colors.primary}
          onPress={() => navigation.navigate('Detail', { userData, from: 'Find', title: userData.email })}
        />
        <Button
          label="Open Modal"
          color={colors.tertiary}
          onPress={() => {
            navigation.navigate('ModalStack', {
              screen: 'Post',
              params: {
                data: userData,
                from: 'Find screen',
              },
            })
          }}
        />
      </ScrollView>
    </ScreenTemplate>
  )
}
