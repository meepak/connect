import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, useColorScheme } from 'react-native'
import { Text } from 'react-native-paper'
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native'
import { colors, fontSize } from 'theme'
import moment from 'moment'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import HomeTitleContext from '../../context/HomeTitleContext'
import storage from '../../utils/Storage'

const styles = StyleSheet.create({
  // lightContent: {
  //   backgroundColor: '#e6e6fa',
  // },
  // darkContent: {
  //   backgroundColor: '#696969',
  // },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
})

export default function Post() {
  const route = useRoute()
  const { data, from } = route.params
  const scheme = useColorScheme()
  const [date, setDate] = useState('')
  const { setTitle } = useContext(HomeTitleContext)
  const navigation = useNavigation()
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark ? styles.darkContent : styles.lightContent,
    text: isDark ? colors.white : colors.primaryText,
  }

  const loadStorage = async () => {
    try {
      const result = await storage.load({ key: 'date' })
      setDate(result)
    } catch (e) {
      const result = { date: 'no data' }
      setDate(result)
    }
  }

  const saveStorage = () => {
    const today = moment().toString()
    storage.save({
      key: 'date',
      data: {
        date: today,
      },
    })
  }

  const removeStorage = () => {
    storage.remove({ key: 'date' })
  }

  const onSavePress = () => {
    saveStorage()
    loadStorage()
  }

  const onRemovePress = () => {
    removeStorage()
    loadStorage()
  }

  useEffect(() => {
    console.log('Post screen')
    loadStorage()
  }, [])

  useFocusEffect(() => {
    setTitle(data.fullName)
  })

  return (
    <ScreenTemplate>
      <View style={[styles.container, colorScheme.content]}>
        <Text style={styles.field}>Post Screen</Text>
        <Text style={styles.title}>{data.email}</Text>
        <Text style={styles.field}>from</Text>
        <Text style={styles.title}>{from}</Text>
        <Text style={styles.field}>Latest save date</Text>
        <Text style={styles.title}>{date.date}</Text>
        <View style={{ width: '100%' }}>
          <Button
            label="Save Date"
            color={colors.primary}
            onPress={() => onSavePress()}
          />
          <Button
            label="Remove Date"
            color={colors.secondary}
            onPress={() => onRemovePress()}
          />
          <Button
            label="Go to Print"
            color={colors.tertiary}
            onPress={() => navigation.navigate('Print')}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}
