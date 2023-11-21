import React, {
  useState, useCallback, useEffect, useContext,
} from 'react'
import {
  ActivityIndicator, View, FlatList,
} from 'react-native'
import {
  Divider,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { ScreenTemplate } from '../../components/templates'
import ListItemUser from '../../components/list-item-user'
import { UserDataContext } from '../../context/user-data-context'
import generateMockData from './util/mock-data'
import Header from './components/header'
import PotentialMatchesHeader from './components/potential-matches-header'
import ProfileSheet from '../profile/profile-sheet'
import { fetchPotentialMatches } from './util/db'

export default function Home() {
  const navigation = useNavigation()
  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [dataItems, setDataItems] = useState([])
  const { userData } = useContext(UserDataContext)
  const [currentCount, setCurrentCount] = useState(40)
  // const [spinner, setSpinner] = useState(false)
  // const [lastFetchedData, setLastFetchedData] = useState(null)
  const [viewUser, setViewUser] = useState({
    key: '', name: '', image: '', banner: '',
  })
  const [showProfileSheet, setShowProfileSheet] = useState(false)

  const fetchData = async () => {
    const newDataItems = await fetchPotentialMatches(userData.id, 10)
    if (dataItems.length > 0) { // case when we are adding more data to the existing list via refresh control
      setDataItems((prevDataItems) => [...prevDataItems, ...newDataItems])
    } else {
      // append with dummy data
      const mockItems = generateMockData(1, 10)
      setDataItems(() => [{ key: 'Header' }, ...newDataItems, ...mockItems])
    }
    // setSpinner(false)
  }

  // called on onLoadingMoreData
  // const onLoadingMoreData = useCallback(() => {
  //   setLoadingMoreData(true)
  // }, [])

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
          <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
      return <></>
    } catch (error) {
      // console.log(error)
      return <></>
    }
  }

  const openProfile = (item) => {
    setViewUser(item)
    setShowProfileSheet(true)
  }

  const renderItem = useCallback(({ item }) => {
    if (item.key === 'Header') {
      return <PotentialMatchesHeader currentCount={currentCount} totalCount={200} />
    }

    return (
      <>
        <ListItemUser // List is better than card here
          name={item.name}
          image={item.image}
          occupation={item.occupation}
          industry={item.industry}
          location={item.location}
          rate={item.rate}
          isPromoted={item.isPromoted}
          viewedAt={item.viewedAt ?? null}
          onPress={() => openProfile(item)}
        />
      </>
    )
  },
  [])

  // like constructor to load data
  useEffect(() => {
    // setSpinner(true)
    if (dataItems.length === 0) {
      fetchData()
      setLoadingMoreData(false)
    }
    // setSpinner(false)
  }, [])

  const handleNotificationIconPress = (value) => {
    setCurrentCount((count) => count + 10)
    let screen
    switch (value) {
      case 'connect':
        screen = 'ManageInvitations'
        break
      case 'nda':
        screen = 'ManageNda'
        break
      case 'bgCheck':
        screen = 'ManageBackgroundCheck'
        break
      default:
        return
    }
    console.log(value, screen)

    navigation.navigate('ManageStack', {
      screen,
    })
  }

  const renderHeader = () => (
    <Header
      handleNotificationIconPress={(value) => handleNotificationIconPress(value)}
      handleProfilePress={(item) => openProfile(item)}
    />
  )

  return (
    <ScreenTemplate>
      <View style={{ flex: 1, marginTop: 7 }}>
        <FlatList
          data={dataItems}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderSpinner}
          ItemSeparatorComponent={<Divider />}
          // contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          // ListEmptyComponent={}
          keyExtractor={(item) => item.key}
              // onEndReached={onLoadingMoreData}
          onEndReachedThreshold={0}
          refreshing={loadingMoreData}
          stickyHeaderIndices={dataItems.length > 1 ? [1] : [0]}
          // StickyHeaderComponent={PotentialMatchesHeader}
        />
      </View>
      <ProfileSheet show={showProfileSheet} onClose={() => { setShowProfileSheet(false) }} user={viewUser} />
    </ScreenTemplate>
  )
}
