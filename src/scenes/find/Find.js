import React, {
  useState, useCallback, useEffect, useContext,
} from 'react'
import {
  ActivityIndicator, StyleSheet, View, FlatList,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import {
  collection, addDoc, query, orderBy, onSnapshot, where, getDocs, limit, startAfter,
} from 'firebase/firestore'
import { firestore } from '../../firebase'
import ScreenTemplate from '../../components/ScreenTemplate'
import UserListItem from '../../components/UserListItem'
import { UserDataContext } from '../../context/UserDataContext'

const styles = (colors = null) => StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 20,
  },
  resultCount: {
    fontSize: 14,
    margin: 10,
    marginLeft: 20,
  },
  spinnerView: {
    paddingVertical: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  appBar: {
    backgroundColor: colors.elevation.level3,
    color: colors.onBackground,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    zIndex: 99,
    height: 50,
  },
})

export default function Find() {
  const navigation = useNavigation()
  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [dataItems, setDataItems] = useState([])
  const { colors } = useTheme()
  const { userData } = useContext(UserDataContext)

  const [lastFetchedData, setLastFetchedData] = useState(null)

  // Define the data generation function
  const fetchPotentialMatches = async (itemCount) => {
    const potentialMatchesCollection = firestore.collection('users').doc(userData.id).collection('potential_matches')
    // where('__name__', '==', userData.id).get().then((snapshot) => {

    // // Get a reference to the potential matches collection.
    // const potentialMatchesCollection = collection(firestore, 'potential_matches')

    // // Create a query to get all potential matches for the current user, sorted by their match score.
    const potentialMatchesQuery = query(potentialMatchesCollection, orderBy('match_score'), limit(itemCount))
    // // , orderBy('match_score', 'desc')

    // // Get the first page of results.
    let potentialMatchesSnapshot = null

    if (lastFetchedData === null) {
      potentialMatchesSnapshot = await getDocs(potentialMatchesQuery)
    } else {
      potentialMatchesSnapshot = await getDocs(query(potentialMatchesQuery, startAfter(lastFetchedData)))
    }

    const potentialMatches = potentialMatchesSnapshot.docs.map((doc) => doc.data())

    console.log(potentialMatches)

    // Get the last document in the first page of results.
    const lastDocument = potentialMatches[potentialMatches.length - 1]
    setLastFetchedData(lastDocument.id)

    return potentialMatches

    // Get a reference to the users collection.
    // const usersRef = firebase.database().ref('users')
    // // Get the profile of all users who are your potential matches.
    // potentialMatchesQuery.get().then((snapshot) => {
    //   // Get the profile of each user in the snapshot.
    //   snapshot.forEach((userSnapshot) => {
    //     // Get the user's profile data.
    //     const userProfile = {
    //     potentialMatchesapshot.child('name').val(),
    //       email: userSnapshot.child('email').val(),
    //       phoneNumber: userSnapshot.child('phone_number').val(),
    //       avatar: userSnapshot.child('avatar').val(),
    //       banner: userSnapshot.child('banner').val(),
    //       whoAmI: userSnapshot.child('whoAmI').val(),
    //       industries: userSnapshot.child('industries').val(),
    //       businessStage: userSnapshot.child('businessStage').val(),
    //       operationMode: userSnapshot.child('operationMode').val(),
    //       location: userSnapshot.child('location').val(),
    //     }

    //     // Do something with the user's profile data.
    //   })
    // })
  }

  const onLoadingMoreData = useCallback(() => {
    setLoadingMoreData(true)
  }, [])

  useEffect(() => {
    if (!loadingMoreData) {
      return
    }
    const newDataItems = fetchPotentialMatches(5)
    setTimeout(() => {
      setDataItems((prevDataItems) => [...prevDataItems, ...newDataItems])
      setLoadingMoreData(false)
    }, 2000)
  }, [loadingMoreData])

  // Render Footer
  const renderSpinner = () => {
    try {
      // Check If Loading
      if (loadingMoreData) {
        return (
          <View style={styles.spinnerView}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
      return <></>
    } catch (error) {
      console.log(error)
      return <></>
    }
  }

  const renderItem = useCallback(({ item }) => (
    <UserListItem
  // eslint-disable-next-line react/no-array-index-key
      name={item.name}
      image={item.image}
      occupation={item.occupation}
      industry={item.industry}
      location={item.location}
      rate={item.rate}
      isPromoted={item.isPromoted}
      onPress={() => {
        // console.log('going to profile')
        navigation.navigate('ProfileStack', {
          screen: 'Profile',
          params: {
            userFullName: item.name,
            userAvatar: item.image,
            userBannerImage: item.banner,
            // from: 'Find screen',
          },
        })
      }}
    />

  ), [])

  // like constructor to load data
  useEffect(() => {
    // console.log(`loading data, current dataItems length is: ${dataItems.length}`)
    if (dataItems.length === 0) {
      const listData = fetchPotentialMatches(1)
      setDataItems(listData)
    }
  }, [])

  return (
    <ScreenTemplate>
      <View style={styles(colors).appBar}>
        <Text style={styles.title}>Matches based on your preferences.</Text>
        <Text style={styles.resultCount}>{dataItems.length} results.</Text>
      </View>
      <FlatList
        data={dataItems}
        renderItem={renderItem}
        ListFooterComponent={renderSpinner}
        keyExtractor={(item) => item.key}
        onEndReached={onLoadingMoreData}
        onEndReachedThreshold={0}
        refreshing={loadingMoreData}
      />
    </ScreenTemplate>
  )
}
