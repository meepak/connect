import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { ScreenTemplate } from '../../components/templates'
import Button from '../../components/core/button'
import { showToast } from '../../utils/show-toast'
import ShowSnackbar from '../../components/show-snack-bar'

export default function Follower() {
  const { colors, fonts } = useTheme()
  const [visible, setVisible] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    field: {
      fontSize: fonts.bodyLarge.middle,
      textAlign: 'center',
    },
  })

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
              color={colors.primary}
              onPress={onShowToastPress}
            />
            <Button
              label="Show Snackbar"
              color={colors.secondary}
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
