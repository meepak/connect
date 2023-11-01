import React, {
  useState, useCallback, useEffect, useContext,
} from 'react'
import {
  ActivityIndicator, StyleSheet, View, FlatList,
} from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import {
  collection, addDoc, query, orderBy, where, getDocs, limit, startAfter, serverTimestamp, doc, updateDoc,
} from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { firestore } from '../../firebase'
import ScreenTemplate from '../../components/ScreenTemplate'
import ListItemUser from '../../components/ListItemUser'
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
  const [spinner, setSpinner] = useState(false)
  const [lastFetchedData, setLastFetchedData] = useState(null)

  // Define the data generation function
  const fetchPotentialMatches = async (itemCount = 15) => {
    console.log('Fetching potential matches for user', userData.id)
    // // // Get a reference to the potential matches collection.
    const potentialMatchesCollection = collection(firestore, `/users/${userData.id}/potential_matches`)

    // // // Create a query to get all potential matches for the current user, sorted by their match score.
    const potentialMatchesQuery = query(potentialMatchesCollection, orderBy('createdAt', 'desc'), orderBy('matchScore', 'desc'), limit(itemCount))
    // // // , orderBy('match_score', 'desc')

    // // // Get the first page of results.
    let potentialMatchesSnapshot = null

    // if (lastFetchedData === null) {
    console.log('Loading first page of potential matches...')
    potentialMatchesSnapshot = await getDocs(potentialMatchesQuery)
    // } else {
    //   console.log('Loading next page of potential matches...')
    //   potentialMatchesSnapshot = await getDocs(query(potentialMatchesQuery, startAfter(lastFetchedData)))
    // }

    // Get the IDs of the potential matches and their match scores.
    const potentialMatches = potentialMatchesSnapshot.docs.map((docP) => ({
      id: docP.id,
      matchScore: docP.data().matchScore,
      viewedAt: docP.data().viewedAt ?? null,
    }))

    // setLastFetchedData(potentialMatches[potentialMatches.length - 1])

    // Get a reference to the users collection.
    const usersCollection = collection(firestore, '/users')

    // Create a query to get all of the users whose IDs match the potential match IDs.
    const usersQuery = query(usersCollection, where('id', 'in', potentialMatches.map((match) => match.id)))

    // Get the users.
    const usersSnapshot = await getDocs(usersQuery)
    const users = usersSnapshot.docs.map((docU) => docU.data())

    // Add the matchScore property to the final user property in the returned users array.
    const finalUsers = []
    users.forEach((user) => {
      const finalUser = {
        key: user.id,
        name: user.fullName,
        image: user.avatar,
        banner: user.bannerImage,
        occupation: user.occupation,
        industry: user.industry,
        location: user.location,
        rate: 'To Be Defined',
        isPromoted: false,
        matchScore: potentialMatches.find((match) => match.id === user.id).matchScore,
        viewedAt: potentialMatches.find((match) => match.id === user.id).viewedAt,
      }
      finalUsers.push(finalUser)
    })

    // console.log('finalUsers', finalUsers)
    return finalUsers
  }

  const fetchData = async () => {
    const newDataItems = await fetchPotentialMatches(10)
    if (dataItems.length > 0) {
      setDataItems((prevDataItems) => [...prevDataItems, ...newDataItems])
    } else {
      setDataItems(newDataItems)
    }
    setSpinner(false)
  }

  const onLoadingMoreData = useCallback(() => {
    setLoadingMoreData(true)
  }, [])

  useEffect(() => {
    if (!loadingMoreData) {
      return
    }
    setLoadingMoreData(false)
    fetchData()
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

  // useEffect(() => { console.log('dataItems', dataItems) }, [dataItems])

  const renderItem = useCallback(({ item }) => (
    <ListItemUser
      name={item.name}
      image={item.image}
      occupation={item.occupation}
      industry={item.industry}
      location={item.location}
      rate={item.rate}
      isPromoted={item.isPromoted}
      viewedAt={item.viewedAt ?? null}
      onPress={() => {
        const viewedAt = serverTimestamp()
        // save user is viewed
        const docRef = doc(firestore, `/users/${userData.id}/potential_matches/${item.key}`)
        // update dataItems for this item
        const updatedDataItems = ((prevDataItems) => prevDataItems.map((dataItem) => (dataItem.key === item.key ? { ...dataItem, viewedAt } : dataItem)))
        // console.log('updated dataItems', updatedDataItems)
        setDataItems((prevDataItems) => updatedDataItems(prevDataItems))
        updateDoc(docRef, {
          viewedAt: serverTimestamp(),
        })
        console.log('going to profile')
        navigation.navigate('ProfileStack', {
          screen: 'Profile',
          params: {
            userId: item.key,
            userFullName: item.name,
            userAvatar: item.image,
            userBannerImage: item.banner,
            // from: 'Find screen',
          },
        })
      }}
    />

  ),
  [])

  // like constructor to load data
  useEffect(() => {
    // console.log(`loading data, current dataItems length is: ${dataItems.length}`)
    setSpinner(true)
    if (dataItems.length === 0) {
      fetchData()
      setLoadingMoreData(false)
    }
    // setSpinner(false)
  }, [])

  return (
    <ScreenTemplate>
      {!spinner
        ? (
          <>
            <View style={styles(colors).appBar}>
              <Text style={styles.title}>Matches based on your preferences.</Text>
              <Text style={styles.resultCount}>{dataItems.length} results.</Text>
            </View>
            <FlatList
              data={dataItems}
              renderItem={renderItem}
              ListFooterComponent={renderSpinner}
              keyExtractor={(item) => item.key}
              // onEndReached={onLoadingMoreData}
              onEndReachedThreshold={0}
              refreshing={loadingMoreData}
            />
          </>
        )
        : null}
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
