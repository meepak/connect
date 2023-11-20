import React, { useContext, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  Text, Card, useTheme, Switch,
} from 'react-native-paper'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { Alert, View } from 'react-native'
import { firestore } from '../../../firebase'
import { UserDataContext } from '../../../context/user-data-context'

// eslint-disable-next-line react/prop-types
const Reset = () => {
  const { colors } = useTheme()
  const { userData } = useContext(UserDataContext)
  const [spinner, setSpinner] = useState(false)

  const profileUpdate = async () => {
    try {
      setSpinner(true)
      const data = {
        id: userData.id,
        isOnboarded: false,
        updatedAt: serverTimestamp(),
      }
      const usersRef = doc(firestore, 'users', userData.id)
      await updateDoc(usersRef, data)
      setSpinner(false)
    } catch (e) {
      setSpinner(false)
      Alert.alert('Error at profile update', e.message)
    }
  }

  return (
    <>
      <Card
        mode="contained"
      >
        {/* <Card.Cover source={userData.avatar} /> */}
        <Card.Title
          title="Reset"
          titleVariant="headlineSmall"
          //   left={() => {}}
          right={() => { }}
        />
        <Card.Content>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            marginBottom: 5,
            marginTop: 10,
          }}
          >
            <Text variant="bodyMedium">
              Reset Onboarded Flag (for dev testing)
            </Text>
            <Switch
              value
              onValueChange={() => {
                profileUpdate()
              }}
              color={colors.tertiary}
            />
          </View>
        </Card.Content>
      </Card>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </>
  )
}

export default Reset
