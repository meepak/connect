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
import ScreenTemplate from '../../components/screen-template'
import ListItemUser from '../../components/list-item-user'
import { UserDataContext } from '../../context/user-data-context'
import generateMockData from './util/mock-data'
import Header from './components/header'
import PotentialMatchesHeader from './components/potential-matches-header'
import { fetchPotentialMatches, viewProfile } from './util/db'
import ConnectionNotification from '../../sheets/notification/connection'

export default function Home() {
  const navigation = useNavigation()
  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [dataItems, setDataItems] = useState([])
  const { userData } = useContext(UserDataContext)
  const [showConnectionNotifications, setShowConnectionNotifications] = useState(false)
  // const [currentCount, setCurrentCount] = useState(20)
  // const [spinner, setSpinner] = useState(false)
  // const [lastFetchedData, setLastFetchedData] = useState(null)

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

  const renderItem = useCallback(({ item }) => (
    item.key === 'Header'
      ? <PotentialMatchesHeader currentCount={20} totalCount={200} />
      : (
        <ListItemUser // List is better than card here
          name={item.name}
          image={item.image}
          occupation={item.occupation}
          industry={item.industry}
          location={item.location}
          rate={item.rate}
          isPromoted={item.isPromoted}
          viewedAt={item.viewedAt ?? null}
          onPress={() => viewProfile(userData.id, item, setDataItems, navigation)}
        />
      )

  ),
  [])

  // like constructor to load data
  useEffect(() => {
    // console.log(`loading data, current dataItems length is: ${dataItems.length}`)
    // setSpinner(true)
    if (dataItems.length === 0) {
      fetchData()
      setLoadingMoreData(false)
    }
    // setSpinner(false)
  }, [])

  const handleNotificationIconPress = (value) => {
    if (value === 'connect') {
      setShowConnectionNotifications(true)
    } else {
      console.log('Yet to be implemented')
    }
  }

  return (
    <ScreenTemplate>
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataItems}
          renderItem={renderItem}
          ListHeaderComponent={<Header handleNotificationIconPress={(value) => handleNotificationIconPress(value)} />}
          ListFooterComponent={renderSpinner}
          ItemSeparatorComponent={<Divider />}
          // contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          // ListEmptyComponent={}
          keyExtractor={(item) => item.key}
              // onEndReached={onLoadingMoreData}
          onEndReachedThreshold={0}
          refreshing={loadingMoreData}
          stickyHeaderIndices={dataItems.length > 2 ? [1] : [0]}
          // StickyHeaderComponent={PotentialMatchesHeader}
        />
        {/* <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      /> */}
      </View>
      <ConnectionNotification show={showConnectionNotifications} onClose={() => setShowConnectionNotifications(false)} />
    </ScreenTemplate>
  )
}
