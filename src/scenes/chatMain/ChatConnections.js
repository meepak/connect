import React, {
  useState, useCallback, useContext, useEffect,
} from 'react'
import {
  ScrollView, StyleSheet, RefreshControl,
} from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  doc, deleteDoc, onSnapshot, collection, query, where, getDocs, setDoc, serverTimestamp, updateDoc,
} from 'firebase/firestore'
import { firestore } from '../../firebase'
import { UserDataContext } from '../../context/UserDataContext'

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

export default function ChatConnections() {
  const navigation = useNavigation()
  // const [token, setToken] = useState('')
  const { userData } = useContext(UserDataContext)
  const [refreshing, setRefreshing] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [connectionRequestAccepted, setConnectionRequestAccepted] = useState([])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 200)
  }, [])

  // TODO CHECK FOR BUG, THAT IT CREATES FIRST GROUP EMPTY WITH ID ONLY AND WILL LET THE CHAT BUT CAN'T BE RETRIEVED
  async function fetchConnection() {
    const connections = []
    const userIds = []
    const docSnap = await getDocs(collection(firestore, 'users', userData.id, 'connection'))
    docSnap.forEach((docC) => {
      // doc.data() is never undefined for query doc snapshots
      // connections.push({ [docC.id]: docC.data() })
      connections[docC.id] = docC.data()
      userIds.push(docC.id)
    })

    if (userIds.length === 0) {
      // console.log('No connections')
      setSpinner(false)
      return
    }

    // Get a reference to the users collection.
    const usersCollection = collection(firestore, '/users')

    // Create a query to get all of the users whose IDs match the potential match IDs.
    const usersQuery = query(usersCollection, where('id', 'in', userIds))

    // Get the users.
    const usersSnapshot = await getDocs(usersQuery)
    const users = usersSnapshot.docs.map((docU) => docU.data())

    const requestAccepted = []
    users.forEach((user) => {
      if (connections[user.id].requestAccepted) {
        const finalConnection = {
          ...connections[user.id],
          key: user.id,
          name: user.fullName,
          image: user.avatar,
          banner: user.bannerImage,
          occupation: user.occupation,
          industry: user.industry,
          location: user.location,
        // rate: 'To Be Defined',
        // isPromoted: false,
        // matchScore: potentialMatches.find((match) => match.id === user.id).matchScore,
        // viewedAt: potentialMatches.find((match) => match.id === user.id).viewedAt,
        }

        requestAccepted.push(finalConnection)
      }
    })

    // console.log(requestAccepted)
    setConnectionRequestAccepted(() => requestAccepted)

    setSpinner(false)
  }

  const ChatItems = () => connectionRequestAccepted.map((requestAccepted) => (
    <ListItemChat
      // eslint-disable-next-line react/no-array-index-key
      key={requestAccepted.key}
      name={requestAccepted.name}
      image={requestAccepted.image}
      occupation={requestAccepted.occupation}
      industry={requestAccepted.industry}
      location={requestAccepted.location}
      rate=""
      isPromoted
      onPress={() => {
        // console.log('going to chat', requestAccepted)
        navigation.navigate('ChatStack', {
          screen: 'Chat',
          params: {
            userId: requestAccepted.key,
            userFullName: requestAccepted.name,
            userAvatar: requestAccepted.image,
            // userBannerImage: banner,
            // from: 'Find screen',
          },
        })
      }}
    />

  ))

  useEffect(() => {
    setSpinner(true)
    fetchConnection()
  }, [refreshing])

  return (
    <ScreenTemplate>
      <Spinner
        visible={spinner}
        textStyle={{ color: '#FFF' }}
        overlayColor="rgba(0,0,0,0.5)"
      />
      <Text style={styles.Title}>Your connections...</Text>
      <Text style={styles.ResultCount}>Let&apos;s chat!!.</Text>
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      >
        <ChatItems />
      </ScrollView>
    </ScreenTemplate>
  )
}
