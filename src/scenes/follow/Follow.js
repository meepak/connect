import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet, useColorScheme } from 'react-native'
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
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark ? colors.white : colors.primaryText,
  }

  useEffect(() => {
    console.log('Follow screen')
  }, [])

  return (
    <ScreenTemplate>
      <View style={[styles.container]}>
        <View style={{ width: '100%' }}>
          <Text style={[styles.field, { color: colorScheme.text }]}>Follow Screen</Text>
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
