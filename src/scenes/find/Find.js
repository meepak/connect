import React, {
  useState, useContext, useCallback,
} from 'react'
import {
  ScrollView, StyleSheet, RefreshControl,
} from 'react-native'
import { Text } from 'react-native-paper'
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
  Title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 20,
  },
  ResultCount: {
    fontSize: 14,
    margin: 10,
    marginLeft: 20,
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
  function generateRandomName() {
    // Create a list of first names and last names.
    const firstNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'George', 'Hannah', 'Isaac', 'Jack', 'Kate']
    const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Johnson', 'Davis', 'Miller', 'Wilson', 'Taylor', 'Anderson', 'Thomas']

    // Choose a random first name and last name from the lists.
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    // Return the full name.
    return `${firstName} ${lastName}`
  }

  return (
    <ScreenTemplate>
      <Text style={styles.Title}>Matches based on your preferences.</Text>
      <Text style={styles.ResultCount}>99 results.</Text>
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* name, industry, location, occupation, isPromoted, image, */}
        {indexArray.map((_, index) => (
          <UserListItem
        // eslint-disable-next-line react/no-array-index-key
            key={index + 1}
            name={generateRandomName()}
            occupation="Full Stack Engineer - Frontend Focus"
            industry="Jeeve Solutions Australia"
            location="Australia (Remote)"
            rate="A$100/hr-A$110/hr"
            isPromoted
            image={null}
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
