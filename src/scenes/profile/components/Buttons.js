import React, { useState, useEffect, useContext } from 'react'
import {
  View, StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import { Button, useTheme } from 'react-native-paper'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  doc, serverTimestamp, getDoc, setDoc,
} from 'firebase/firestore'
import { firestore } from '../../../firebase'
import Styles from './_styles'
import { UserDataContext } from '../../../context/UserDataContext'

const Buttons = (
  {
    editMode,
    userId,
  },
) => {
  const { colors, fonts } = useTheme()
  const [connectionStatus, setConnectionStatus] = useState([])
  const { userData } = useContext(UserDataContext)
  const [spinner, setSpinner] = useState(false)

  async function fetchConnection() {
    const docSnap = await getDoc(doc(firestore, 'users', userData.id, 'connection', userId))

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data())
      setConnectionStatus(docSnap.data())
    } else {
      // console.log('No such document!')
    }
    setSpinner(false)
  }

  useEffect(() => {
    if (!editMode) {
      fetchConnection()
      // console.log('connection status', connectionStatus)
    } else {
      setSpinner(false)
    }
  }, [])

  const styles = StyleSheet.create({
    ...Styles(colors, fonts),
    scrollContent: {
      zIndex: 1,
    },
    connectContainer: {
      marginHorizontal: 20,
      paddingTop: 20,
      // backgroundColor: 'green',
    },
    connectButton: {
      backgroundColor: colors.primaryContainer,
    },
    // connectLabel: {
    //   color: colors.onPrimaryContainer,
    //   // fontSize: fonts.titleLarge.fontSize,
    // },
  })

  return (
    <>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      />
      {(!editMode)
        ? (
          <View style={styles.connectContainer}>
            <Button
              disabled={!(connectionStatus.requestSent === undefined && connectionStatus.requestReceived === undefined)}
              icon="person-add"
              onPress={async () => {
                console.log('connect button')
                // send connection request, TODO ADD/UPDATE APPROPRIATELY LATER
                await setDoc(doc(firestore, 'users', userData.id, 'connection', userId), {
                  requestSent: serverTimestamp(),
                })
                setConnectionStatus({ requestSent: serverTimestamp() })

                // TODO -- do this through firebase function, as in client
                // auth user can only write their own document,
                // also probably notification need to be generated
                await setDoc(doc(firestore, 'users', userId, 'connection', userData.id), {
                  requestReceived: serverTimestamp(),
                })
              }}
              mode="elevated"
        //   labelStyle={styles.buttonLabel}
              style={styles.connectButton}
            >
              {
                // eslint-disable-next-line no-nested-ternary
                connectionStatus.requestSent !== undefined
                  ? 'Connection Request Sent'
                  : (connectionStatus.requestReceived !== undefined
                    ? 'Connection Request Received'
                    : 'Request Connection')
                }
            </Button>
          </View>
        )
        : <></>}
    </>
  )
}

Buttons.propTypes = {
  editMode: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
}

export default Buttons
