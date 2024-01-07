import React, {
  useState, useCallback, useEffect, useContext, useMemo, useRef,
} from 'react'
import {
  View,
} from 'react-native'
import {
  Divider,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { ScreenTemplate } from '../../components/templates'
import ListItemUser from './components/list-item-user'
import { UserDataContext } from '../../context'
import generateMockData from './util/mock-data'
import Header from './components/header'
import PotentialMatchesHeader from './components/potential-matches-header'
import ProfileSheet from '../profile/profile-sheet'
import { fetchPotentialMatches } from './util/db'
import RenderCounter from '../../components/render-counter'
// import WaveBackground from '../../components/core/wave-background'

export default function Home() {
  const navigation = useNavigation()
  const [dataItems, setDataItems] = useState([])
  const { userData } = useContext(UserDataContext)
  const itemBatch = 10
  const [viewUser, setViewUser] = useState({
    key: '', name: '', image: '', banner: '',
  })
  const [showProfileSheet, setShowProfileSheet] = useState(false)
  const potentialMatchesRef = useRef(null)

  const fetchData = async () => {
    const newDataItems = await fetchPotentialMatches(userData.id, itemBatch)

    // additional mock data
    const mockItems = generateMockData(1, itemBatch, 'fetchData')
    // setCurrentCount(() => itemBatch + 1)
    const finalDataItems = [{ key: 'Header' }, ...newDataItems, ...mockItems]
    setDataItems(finalDataItems)
  }

  const fetchMoreData = async () => {
    const count = dataItems.length
    if (count === 0) {
      return // there is no initial data to load more data
    }
    console.log('current count', count)
    // additional mock data
    const mockItems = generateMockData(count + 1, itemBatch, 'fetchMoreData')
    // setCurrentCount(() => (currentCount + itemBatch))
    const finalDataItems = [...dataItems, ...mockItems]
    setDataItems(finalDataItems)
  }

  const updateCountsInPotentialMatchesHeader = useCallback((newCount, newTotalCount) => {
    if (potentialMatchesRef?.current) {
      potentialMatchesRef.current.updateCounts(newCount, newTotalCount)
    }
  }, [])

  useEffect(() => {
    if (potentialMatchesRef?.current) {
      console.log('calling update counts')
      potentialMatchesRef.current.updateCounts(dataItems.length, dataItems.length)
    }
  }, [dataItems, updateCountsInPotentialMatchesHeader])

  // Render Footer
  const renderSpinner = () => {
    try {
      // Check If Loading
      // if (loadingMoreData) {
      //   return (
      //     <View style={{ flex: 1 }}>
      //       <ActivityIndicator size="large" />
      //     </View>
      //   )
      // }
      return <></>
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      // console.log(error)
      // return <></>
    }
  }

  const openProfile = useCallback((item) => {
    setViewUser(item)
    setShowProfileSheet(true)
  }, [])

  const renderItem = useCallback(({ item }) => {
    if (item.key === 'Header') {
      return <PotentialMatchesHeader ref={potentialMatchesRef} />
    }

    return (
      <>
        <RenderCounter title="listItem" />
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
  }, [1])

  // like constructor to load data
  useEffect(() => {
    // setSpinner(true)
    if (dataItems.length === 0) {
      fetchData()
      // setLoadingMoreData(false)
    }
    // setSpinner(false)
  }, [])

  const handleNotificationIconPress = useCallback((value) => {
    // setCurrentCount((count) => count + 10)
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
    // console.log(value, screen)

    navigation.navigate('ManageStack', {
      screen,
    })
  }, [])

  const renderHeader = useMemo(() => (
    <Header
      handleNotificationIconPress={(value) => handleNotificationIconPress(value)}
      handleProfilePress={(item) => openProfile(item)}
    />
  ), [])

  const onEndReached = useCallback(() => {
    // You can add additional logic here before fetching more data
    fetchMoreData()
  }, [fetchMoreData])

  return (
    <ScreenTemplate>
      <RenderCounter title="home" />
      <View style={{ flex: 1 }}>
        <KeyboardAwareFlatList
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
          // refreshing={loadingMoreData}
          stickyHeaderIndices={dataItems.length > 1 ? [1] : [0]}
          // StickyHeaderComponent={PotentialMatchesHeader}
          // refreshing
          // onRefresh={() => {}}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          estimatedItemSize={100}
        />
      </View>
      <ProfileSheet show={showProfileSheet} onClose={() => { setShowProfileSheet(false) }} user={viewUser} />
    </ScreenTemplate>
  )
}
