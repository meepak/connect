import React, {
  useState, useCallback,
} from 'react'
import {
  ScrollView, StyleSheet, RefreshControl,
} from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import ScreenTemplate from '../../components/ScreenTemplate'
// import { UserDataContext } from '../../context/UserDataContext'
import ListItemChat from '../../components/ListItemChat'

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

export default function ChatRecent() {
  const navigation = useNavigation()
  // const [token, setToken] = useState('')
  // const { userData } = useContext(UserDataContext)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const indexArray = new Array(Math.round(Math.random() * 10)).fill('')
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

  const images = [
    'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=200&dpr=1',
    'https://images.pexels.com/photos/2906635/pexels-photo-2906635.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/989200/pexels-photo-989200.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1804514/pexels-photo-1804514.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/3797438/pexels-photo-3797438.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ]

  return (
    <ScreenTemplate>
      <Text style={styles.Title}>Continue chatting...</Text>
      <Text style={styles.ResultCount}>Let&apos;s chat!!.</Text>
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      >
        {indexArray.map((_, index) => {
          const name = generateRandomName()
          const image = index % 2 === 0 ? images[index / 2] : null
          return (
            <ListItemChat
          // eslint-disable-next-line react/no-array-index-key
              key={index + 1}
              name={name}
              image={image}
              occupation="Full Stack Engineer - Frontend Focus"
              industry="Jeeve Solutions Australia"
              location="Australia (Remote)"
              rate="A$100/hr-A$110/hr"
              isPromoted
              onPress={() => {
                // console.log('going to chat')
                // navigation.navigate('ChatStack', {
                //   screen: 'Chat',
                //   params: {
                //     userId: 1,
                //     userFullName: name,
                //     // userAvatar: image,
                //     // userBannerImage: banner,
                //     // from: 'Find screen',
                //   },
                // })
              }}
            />

          )
        })}
      </ScrollView>
    </ScreenTemplate>
  )
}
