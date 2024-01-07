import {
  collection, query, orderBy, where, getDocs, limit, serverTimestamp, doc, updateDoc,
} from 'firebase/firestore'
import { firestore } from '../../../firebase'

// Define the data generation function
export const fetchPotentialMatches = async (userId, itemCount = 15) => {
  // console.log('Fetching potential matches for user', userData.id)
  // Get a reference to the potential matches collection.
  const potentialMatchesCollection = collection(firestore, `/users/${userId}/potential_matches`)

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

// TOD --- THIS DOESN'T LOOOK RIGHT AT ALL, RECHECK
export const viewProfile = (currentUserId, item, setDataItems, navigation) => {
  const viewedAt = serverTimestamp()
  // save user is viewed
  const docRef = doc(firestore, `/users/${currentUserId}/potential_matches/${item.key}`)
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
    },
  })
}
