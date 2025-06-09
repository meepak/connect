import React, { useContext, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  Text, Card, useTheme, Switch,
} from 'react-native-paper'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { Alert, View } from 'react-native'
import { firestore } from '../../../firebase'
import { UserDataContext, PreferencesContext } from '../../../context'

// eslint-disable-next-line react/prop-types
const Developer = () => {
  const { colors } = useTheme()
  const { userData } = useContext(UserDataContext)
  const { showRenderCounter, setShowRenderCounter } = useContext(PreferencesContext)
  const [spinner, setSpinner] = useState(false)

  const profileUpdate = async () => {
    try {
      setSpinner(true)
      const data = {
        id: userData.id,
        isOnboard: false,
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
          title="Developer"
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
              Reset Onboard Flag
            </Text>
            <Switch
              value={false}
              onValueChange={() => {
                profileUpdate()
              }}
              color={colors.tertiary}
            />
          </View>
        </Card.Content>

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
              Display Render Counter
            </Text>
            <Switch
              value={showRenderCounter}
              onValueChange={setShowRenderCounter}
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

export default Developer
