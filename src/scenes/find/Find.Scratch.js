import React, {
  useState, useCallback, useEffect, useRef,
} from 'react'
import {
  ActivityIndicator, StyleSheet, View, FlatList,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
// import { colors } from '../../theme'
import * as Animatable from 'react-native-animatable'

import ScreenTemplate from '../../components/ScreenTemplate'
// import Button from '../../components/core/Button'
// import { UserDataContext } from '../../context/UserDataContext'
import ListItemUser from '../../components/ListItemUser'

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

export default function FindScratch() {
  const navigation = useNavigation()
  // const [token, setToken] = useState('')
  // const { userData } = useContext(UserDataContext)
  const [loadingMoreData, setLoadingMoreData] = useState(false)
  // const [refreshing, setRefreshing] = useState(false)
  const [dataItems, setDataItems] = useState([])
  // const [showScrollToTopButton, setShowScrollToTopButton] = useState(false)
  // const [scrollY, setScrollY] = useState(0)
  const { colors } = useTheme()

  const handleViewRef = useRef()

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

  // Define the data generation function
  const generateDummyData = (startIndex, itemCount) => {
    const dummyData = []

    for (let index = startIndex; index < startIndex + itemCount; index += 1) {
      const name = `${index} ${generateRandomName()}`
      const image = index % 2 === 0 ? images[Math.floor(index / 2)] : null
      const banner = bannerImages[Math.floor(Math.random() * bannerImages.length)]

      const userItem = {
        key: index,
        name,
        image,
        banner,
        occupation: 'Full Stack Engineer - Frontend Focus',
        industry: 'Jeeve Solutions Australia',
        location: 'Australia (Remote)',
        rate: 'A$100/hr-A$110/hr',
        isPromoted: true,
        onPress: () => {
        // Your navigation logic here
          console.log('Going to profile')
        },
      }

      dummyData.push(userItem)
    }

    return dummyData
  }

  let currentY = 0
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y
    if (Math.abs(currentY - scrollY) > 5) {
      currentY = scrollY
    }
    if (currentY - scrollY > 3) {
      handleViewRef.current.transitionTo({ height: 50 }, 10, { useNativeDriver: true })
    }

    if (currentY - scrollY < -3) {
      handleViewRef.current.transitionTo({ height: 0 }, 10, { useNativeDriver: true })
    }
  }

  const onLoadingMoreData = useCallback(() => {
    setLoadingMoreData(true)
  }, [])

  useEffect(() => {
    if (!loadingMoreData) {
      return
    }
    const startIndex = dataItems.length + 1
    // console.log(`onRefresh generating dummy data, current start Index is: ${startIndex}`)
    // if (startIndex === 1) {
    //   setRefreshing(false)
    //   return // WHY IS THIS HAPPENING???
    // }
    const newDataItems = generateDummyData(startIndex, 5)
    setTimeout(() => {
      setDataItems((prevDataItems) => [...prevDataItems, ...newDataItems])
      setLoadingMoreData(false)
      // console.log(`added  ${newDataItems.length} items to dataItems`)
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
    <ListItemUser
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
      const listData = generateDummyData(0, 10)
      setDataItems(listData)
    }
  }, [])

  return (
    <ScreenTemplate>
      <Animatable.View style={styles(colors).appBar} ref={handleViewRef}>
        <Text style={styles.title}>Matches based on your preferences.</Text>
        <Text style={styles.resultCount}>{dataItems.length} results.</Text>
      </Animatable.View>
      <FlatList
        onScroll={handleScroll}
        data={dataItems}
        // refreshControl={(
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //   />
        // )}
        renderItem={renderItem}
        ListFooterComponent={renderSpinner}
        keyExtractor={(item) => item.key}
        // onScrollEndDrag={console.log('Scroll End Drag')}
        onEndReached={onLoadingMoreData}
          // How Close To The End Of List Until Next Data Request Is Made
        onEndReachedThreshold={0}
        refreshing={loadingMoreData}
      />
      {/* <FAB
        icon="plus"
        size="small"
        style={styles.fab}
        visible={showScrollToTopButton}
        onPress={() => console.log('Pressed')}
      /> */}
    </ScreenTemplate>
  )
}
