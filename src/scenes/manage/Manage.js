import React, {
  useState, useContext, useEffect, useCallback,
} from 'react'
import {
  View, StyleSheet, ScrollView, RefreshControl,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Surface, Text } from 'react-native-paper'
import Dialog from 'react-native-dialog'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  doc, deleteDoc, onSnapshot, collection, query, where, getDocs, setDoc, serverTimestamp, updateDoc,
} from 'firebase/firestore'
import { signOut, deleteUser } from 'firebase/auth'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
// import Restart from '../../utils/Restart'
import { firestore, auth } from '../../firebase'
import { UserDataContext } from '../../context/UserDataContext'
import { colors, fontSize } from '../../theme'
import AvatarOfAuthUser from '../../components/AvatarOfAuthUser'
import sendNotification from '../../utils/SendNotification'
import TestFontsize from '../../components/TestFontsize'
import ListItemConnection from '../../components/ListItemConnection'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    marginBottom: 80,
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
  avatar: {
    margin: 30,
    alignSelf: 'center',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
  content: {
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
})

export default function Manage() {
  const { userData, setUserData } = useContext(UserDataContext)
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [token, setToken] = useState('')
  const [connectionRequestReceived, setConnectionRequestReceived] = useState([])
  const [connectionRequestSent, setConnectionRequestSent] = useState([])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 200)
  }, [])

  const onNotificationPress = async () => {
    const res = await sendNotification({
      title: 'Hello',
      body: 'This is some something 👋',
      data: 'something data',
      token: token.token,
    })
    // console.log(res)
  }

  const goDetail = () => {
    navigation.navigate('Edit', { userData })
  }

  const onSignOutPress = () => {
    signOut(auth)
      .then(() => {
        setUserData('')
        // Restart() // do not restart, just go back to pre login page
      })
      .catch((error) => {
        // console.log(`on sign out press - ${error.message}`)
      })
  }

  const showDialog = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const accountDelete = async () => {
    try {
      setSpinner(true)
      const tokensDocumentRef = doc(firestore, 'tokens', userData.id)
      const usersDocumentRef = doc(firestore, 'users', userData.id)
      await deleteDoc(tokensDocumentRef)
      await deleteDoc(usersDocumentRef)
      const user = auth.currentUser
      deleteUser(user).then(() => {
        setSpinner(false)
        signOut(auth)
          .then(() => {
            // console.log('user deleted')
          })
          .catch((error) => {
            // console.log(error.message)
          })
      }).catch((error) => {
        setSpinner(false)
        // console.log(error)
      })
    } catch (error) {
      // console.log(error)
    }
  }

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
      // console.log('no connections found')
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

    const requestReceived = []
    const requestSent = []
    users.forEach((user) => {
      if (connections[user.id].requestAccepted
        || connections[user.id].requestRejected
        || connections[user.id].requestCancelled) {
        return
      }
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
      if (finalConnection.requestReceived) {
        // finalConnection.requestReceived = finalConnection.requestReceived.toLocaleTimeString()
        // console.log(finalConnection.requestReceived)
        requestReceived.push(finalConnection)
      }
      if (finalConnection.requestSent) {
        // finalConnection.requestSent = finalConnection.requestReceived.toLocaleTimeString()
        requestSent.push(finalConnection)
      }
    })

    // console.log(requestReceived)
    setConnectionRequestReceived(requestReceived)
    setConnectionRequestSent(requestSent)

    setSpinner(false)
  }

  const onAcceptConnection = async (connection) => {
    // console.log(`Connection Accepted - ${connection.key}`)
    // send connection request, TODO ADD/UPDATE APPROPRIATELY LATER
    await updateDoc(doc(firestore, 'users', userData.id, 'connection', connection.key), {
      requestAccepted: serverTimestamp(),
    })

    // set state, to be revised properly later
    const newConnectionRequestReceived = []
    connectionRequestReceived.forEach((requestReceived) => {
      if (requestReceived.key === connection.key) {
        const newRequestReceived = { ...requestReceived, requestAccepted: serverTimestamp() }
        newConnectionRequestReceived.push(newRequestReceived)
      } else {
        newConnectionRequestReceived.push(requestReceived)
      }
    })
    setConnectionRequestReceived(newConnectionRequestReceived)
    // setConnectionStatus({ requestSent: serverTimestamp() })

    // TODO -- do this through firebase function, as in client
    // auth user can only write their own document,
    // also probably notification need to be generated
    await updateDoc(doc(firestore, 'users', connection.key, 'connection', userData.id), {
      requestAccepted: serverTimestamp(),
    })
  }
  const onRejectConnection = async (connection) => {
    // console.log(`Connection Rejected - ${connection.key}`)
    // send connection request, TODO ADD/UPDATE APPROPRIATELY LATER
    await updateDoc(doc(firestore, 'users', userData.id, 'connection', connection.key), {
      requestRejected: serverTimestamp(),
    })

    // set state, to be revised properly later
    const newConnectionRequestReceived = []
    connectionRequestReceived.forEach((requestReceived) => {
      if (requestReceived.key === connection.key) {
        const newRequestReceived = { ...requestReceived, requestRejected: serverTimestamp() }
        newConnectionRequestReceived.push(newRequestReceived)
      } else {
        newConnectionRequestReceived.push(requestReceived)
      }
    })
    setConnectionRequestReceived(newConnectionRequestReceived)
    // setConnectionStatus({ requestSent: serverTimestamp() })

    // TODO -- do this through firebase function, as in client
    // auth user can only write their own document,
    // also probably notification need to be generated
    await updateDoc(doc(firestore, 'users', connection.key, 'connection', userData.id), {
      requestRejected: serverTimestamp(),
    })
  }
  const onCancelConnection = async (connection) => {
    // console.log(`Connection Cancelled - ${connection.key}`)
    // send connection request, TODO ADD/UPDATE APPROPRIATELY LATER
    await updateDoc(doc(firestore, 'users', userData.id, 'connection', connection.key), {
      requestCancelled: serverTimestamp(),
    })

    // set state, to be revised properly later
    const newConnectionRequestSent = []
    connectionRequestSent.forEach((requestSent) => {
      if (requestSent.key === connection.key) {
        const newRequestSent = { ...requestSent, requestCancelled: serverTimestamp() }
        newConnectionRequestSent.push(newRequestSent)
      } else {
        newConnectionRequestSent.push(requestSent)
      }
    })
    setConnectionRequestReceived(newConnectionRequestSent)
    // setConnectionStatus({ requestSent: serverTimestamp() })

    // TODO -- do this through firebase function, as in client
    // auth user can only write their own document,
    // also probably notification need to be generated
    await updateDoc(doc(firestore, 'users', connection.key, 'connection', userData.id), {
      requestCancelled: serverTimestamp(),
    })
  }

  useEffect(() => {
    setSpinner(true)
    fetchConnection()
  }, [refreshing])

  useEffect(() => {
    const tokensRef = doc(firestore, 'tokens', userData.id)
    const tokenListner = onSnapshot(tokensRef, (querySnapshot) => {
      if (querySnapshot.exists) {
        const data = querySnapshot.data()
        setToken(data)
      } else {
        // console.log('No such document!')
      }
    })
    return () => tokenListner()
  }, [])

  const ConnectionRequests = () => (
    <View>
      <Text>Connection Request Received - </Text>
      {connectionRequestReceived.map((connection) => (
        <ListItemConnection
          key={connection.key}
          name={connection.name}
          image={connection.image}
          industry={connection.industry}
          location={connection.location}
          // date={connection.requestReceived}
          onYes={() => onAcceptConnection(connection)}
          onNo={() => onRejectConnection(connection)}
        />
      ))}
      <Text>Connection Request Sent - </Text>
      {connectionRequestSent.map((connection) => (
        <ListItemConnection
          key={connection.key}
          name={connection.name}
          image={connection.image}
          industry={connection.industry}
          location={connection.location}
          // date={connection.requestReceived}
          onNo={() => onCancelConnection(connection)}
        />
      ))}
    </View>
  )

  return (
    <ScreenTemplate>
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ConnectionRequests />
        <View style={styles.avatar}>
          <AvatarOfAuthUser
            size="xlarge"
          />
        </View>
        <Text style={styles.field}>Name:</Text>
        <Text style={styles.title}>{userData.fullName}</Text>
        <Text style={styles.field}>Mail:</Text>
        <Text style={styles.title}>{userData.email}</Text>
        <Button
          label="Edit"
          color={colors.primary}
          onPress={goDetail}
        />
        <TestFontsize />
        <Surface
          style={styles.content}
        >
          <Text style={styles.field}>Mail:</Text>
          <Text style={styles.title}>{userData.email}</Text>
          {token
            ? (
              <>
                <Text style={styles.field}>Expo push token:</Text>
                <Text style={styles.title}>{token.token}</Text>
              </>
            ) : null}
        </Surface>
        <Button
          label="Open Modal"
          color={colors.tertiary}
          onPress={() => {
            navigation.navigate('ModalStack', {
              screen: 'Post',
              params: {
                data: userData,
                from: 'Manage screen',
              },
            })
          }}
        />
        <Button
          label="Account delete"
          color={colors.secondary}
          onPress={showDialog}
        />
        <Button
          label="Send Notification"
          color={colors.pink}
          onPress={() => onNotificationPress()}
          disable={!token}
        />
        <View style={styles.footerView}>
          <Text onPress={onSignOutPress} style={styles.footerLink}>Sign out</Text>
        </View>
      </ScrollView>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={accountDelete} />
      </Dialog.Container>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}
