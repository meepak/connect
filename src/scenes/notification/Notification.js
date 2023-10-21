import React, { useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { fontSize } from 'theme'
import { useNavigation } from '@react-navigation/native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
import { UserDataContext } from '../../context/UserDataContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
})

export default function Notification() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { userData } = useContext(UserDataContext)

  useEffect(() => {
    console.log('Notification screen')
  }, [])

  return (
    <ScreenTemplate>
      <View style={[styles.container]}>
        <View style={{ width: '100%' }}>
          <Text style={styles.field}>Notification Screen</Text>
          <Button
            label="Open Modal"
            color={colors.tertiary}
            onPress={() => {
              navigation.navigate('ModalStack', {
                screen: 'Post',
                params: {
                  data: userData,
                  from: 'Notification screen',
                },
              })
            }}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}
