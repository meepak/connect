import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import ScreenTemplate from '../../components/ScreenTemplate'
import { colors, fontSize } from '../../theme'
import Button from '../../components/Button'
import { showToast } from '../../utils/ShowToast'
import ShowSnackbar from '../../components/ShowSnackbar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
})

export default function Follower() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log('Follower screen')
  }, [])

  const onDismissSnackBar = () => setVisible(false)

  const onShowToastPress = () => {
    showToast({
      title: 'Hello',
      body: 'This is some something 👋',
    })
  }

  const onShowSnackbarPress = () => {
    setVisible(true)
  }

  return (
    <>
      <ScreenTemplate>
        <View style={styles.container}>
          <View style={{ width: '100%' }}>
            <Text style={styles.field}>Follower Screen</Text>
            <Button
              label="Show Toast"
              color={colors.lightPurple}
              onPress={onShowToastPress}
            />
            <Button
              label="Show Snackbar"
              color={colors.purple}
              onPress={onShowSnackbarPress}
            />
          </View>
        </View>
      </ScreenTemplate>
      <ShowSnackbar
        visible={visible}
        onDismissSnackBar={onDismissSnackBar}
        title="Hello 👋"
        duration={3000}
      />
    </>
  )
}
