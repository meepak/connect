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

  const images = [
    'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=200&dpr=1',
    'https://images.pexels.com/photos/2906635/pexels-photo-2906635.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/989200/pexels-photo-989200.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1804514/pexels-photo-1804514.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/3797438/pexels-photo-3797438.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ]

  const bannerImages = [
    { uri: 'https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { uri: 'https://images.freeimages.com/variants/k1wQB7egQotJ7Hr3ZBPP1S5c/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=550' },
    { uri: 'https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500' },
    { uri: 'https://images.freeimages.com/images/large-previews/e78/family-1421593.jpg?fmt=webp&w=550' },
  ]

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
        {indexArray.map((_, index) => {
          const name = generateRandomName()
          const image = index % 2 === 0 ? images[index / 2] : null
          const banner = bannerImages[Math.floor(Math.random() * bannerImages.length) + 1]
          return (
            <UserListItem
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
                // console.log('going to profile')
                navigation.navigate('ProfileStack', {
                  screen: 'Profile',
                  params: {
                    userFullName: name,
                    userAvatar: image,
                    userBannerImage: banner,
                    // from: 'Find screen',
                  },
                })
              }}
            />

          )
        })}
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
