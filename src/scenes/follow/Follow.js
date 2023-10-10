import React, { useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { colors, fontSize } from 'theme'
import { useNavigation } from '@react-navigation/native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
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

export default function Follow() {
  const navigation = useNavigation()
  const { userData } = useContext(UserDataContext)

  useEffect(() => {
    console.log('Follow screen')
  }, [])

  return (
    <ScreenTemplate>
      <View style={[styles.container]}>
        <View style={{ width: '100%' }}>
          <Text style={styles.field}>Follow Screen</Text>
          <Button
            label="Open Modal"
            color={colors.tertiary}
            onPress={() => {
              navigation.navigate('ModalStack', {
                screen: 'Post',
                params: {
                  data: userData,
                  from: 'Follow screen',
                },
              })
            }}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}
