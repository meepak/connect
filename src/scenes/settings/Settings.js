import React, { useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
import { UserDataContext } from '../../context/UserDataContext'

const Styles = (fonts) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  field: {
    fontSize: fonts.bodyLarge.fontSize,
    textAlign: 'center',
  },
})

export default function Settings() {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()
  const styles = Styles(fonts)

  const { userData } = useContext(UserDataContext)
  useEffect(() => {
    // console.log('Notification screen')
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
