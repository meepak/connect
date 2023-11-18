import React, {
  useState, useCallback, useEffect, useContext,
} from 'react'
import {
  ActivityIndicator, StyleSheet, View, FlatList, Alert,
} from 'react-native'
import {
  Divider, FAB, Portal, useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import {
  collection, query, orderBy, where, getDocs, limit, serverTimestamp, doc, updateDoc,
} from 'firebase/firestore'
// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { firestore } from '../../firebase'
import ScreenTemplate from '../../components/ScreenTemplate'
import ListItemUser from '../../components/ListItemUser'
import { UserDataContext } from '../../context/UserDataContext'
import generateDummyData from './DummyData'
import SquareMenu from './components/SquareMenu'
import Header from './components/Header'

const Styles = (colors) => StyleSheet.create({
  scrollContentView: {
    flex: 1,
    // zIndex: 0,
  },
  header: {
  },
  headerIcons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',

    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
    // marginTop: 5, // probably put it back for android only
  },
  iconsRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',

    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  hi: {
    marginLeft: 20,
    marginVertical: 5,
    fontWeight: 700,
  },

  searchButton: {
    width: '100%',
    backgroundColor: colors.secondaryContainer,
    color: colors.onSecondaryContainer,
    borderRadius: 7,
    textAlign: 'left',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: colors.shadow,
  },
  searchButtonText: {
    color: colors.onSecondaryContainer,
    alignSelf: 'flex-start',
  },
})

export default function Home() {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [dataItems, setDataItems] = useState([])
  const styles = Styles(colors, fonts)
  const { userData } = useContext(UserDataContext)
  const [spinner, setSpinner] = useState(false)
  const [visible, setVisible] = useState(false)
  const [toggleStackOnLongPress, setToggleStackOnLongPress] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  // const [lastFetchedData, setLastFetchedData] = useState(null)

  // Define the data generation function
  const fetchPotentialMatches = async (itemCount = 15) => {
    // console.log('Fetching potential matches for user', userData.id)
    // Get a reference to the potential matches collection.
    const potentialMatchesCollection = collection(firestore, `/users/${userData.id}/potential_matches`)

    // Create a query to get all potential matches for the current user, sorted by their match score.
    const potentialMatchesQuery = query(potentialMatchesCollection, orderBy('createdAt', 'desc'), orderBy('matchScore', 'desc'), limit(itemCount))
    // , orderBy('match_score', 'desc')

    // Get the first page of results.
    let potentialMatchesSnapshot = null

    // if (lastFetchedData === null) {
    // console.log('Loading first page of potential matches...')
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
    const matches = potentialMatches.map((match) => match.id)
    if (matches.length === 0) {
      // console.log('No potential matches found for user', userData.id)
      return []
    }
    const usersQuery = query(usersCollection, where('id', 'in', matches))

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
    if (dataItems.length > 0) { // case when we are adding more data to the existing list via refresh control
      setDataItems((prevDataItems) => [...prevDataItems, ...newDataItems])
    } else {
      // append with dummy data
      const dummyItems = generateDummyData(1, 10)
      // console.log(dummyItems)
      // setDataItems(newDataItems)
      // setDataItems(() => [{ key: 'header' }, ...newDataItems, ...dummyItems])
      setDataItems(() => [{ key: 'Header' }, ...newDataItems, ...dummyItems])
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
      // console.log(error)
      return <></>
    }
  }

  const renderItem = useCallback(({ item }) => (
    item.key === 'Header'
      ? <SquareMenu />
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
      )

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
    setSpinner(false)
  }, [])

  return (
    <ScreenTemplate>
      <View style={styles.scrollContentView}>
        <FlatList
          data={dataItems}
          renderItem={renderItem}
          ListHeaderComponent={<Header />}
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
          // stickyHeaderHiddenOnScroll
          // StickyHeaderComponent={<SquareMenu />}
          // ScrollViewStickyHeader={<SquareMenu />}
          // style={{borderWidth: 1, borderColor: 'red'}}
          // fadingEdgeLength={2}
        />
        {/* <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      /> */}
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'calendar' : 'plus'}
            toggleStackOnLongPress={toggleStackOnLongPress}
            actions={[
              { icon: 'plus', onPress: () => {} },
              { icon: 'star', label: 'Star', onPress: () => {} },
              { icon: 'person', label: 'person', onPress: () => {} },
              {
                icon: 'bell',
                label: 'Remind',
                onPress: () => {},
                size: 'small', // 'medium'
              },
              {
                icon: toggleStackOnLongPress
                  ? 'gesture-tap'
                  : 'eye',
                label: toggleStackOnLongPress
                  ? 'Toggle on Press'
                  : 'Toggle on Long Press',
                onPress: () => {
                  setToggleStackOnLongPress(!toggleStackOnLongPress)
                },
              },
            ]}
            enableLongPressWhenStackOpened
            onStateChange={(sopen) => setOpen(sopen)}
            onPress={() => {
              if (toggleStackOnLongPress) {
                Alert.alert('Fab is Pressed')
              // do something on press when the speed dial is closed
              } else if (open) {
                Alert.alert('Fab is Pressed')
              }
            }}
            onLongPress={() => {
              if (!toggleStackOnLongPress || open) {
                Alert.alert('Fab is Long Pressed')
                // do something if the speed dial is open
              }
            }}
            visible={visible}
          />
        </Portal>
      </View>
    </ScreenTemplate>
  )
}
