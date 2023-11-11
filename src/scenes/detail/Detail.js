import React, { useContext } from 'react'
import {
  ScrollView,
  StyleSheet,
} from 'react-native'
import {
  Surface, Text, useTheme,
} from 'react-native-paper'
import {
  useNavigation,
  useRoute,
  useEffect,
} from '@react-navigation/native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/core/Button'
import HomeTitleContext from '../../context/HomeTitleContext'

export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute()
  const { from, userData, title } = route.params
  const { setTitle } = useContext(HomeTitleContext)
  const { colors, fonts } = useTheme()

  const styles = StyleSheet.create({
    content: {
      padding: 20,
      borderRadius: 5,
      marginTop: 30,
      marginLeft: 30,
      marginRight: 30,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      flex: 1,
      width: '100%',
    },
    title: {
      fontSize: fonts.headlineMedium.fontSize,
      marginBottom: 20,
      textAlign: 'center',
    },
    field: {
      fontSize: fonts.bodyLarge.fontSize,
      textAlign: 'center',
    },
  })

  useEffect(() => {
    setTitle(title)
  })

  // useEffect(() => {
  //   console.log('Detail screen')
  // }, [])

  return (
    <ScreenTemplate>
      <ScrollView style={styles.main}>
        <Surface style={styles.content}>
          <Text style={styles.field}>
            {userData.id}
          </Text>
          <Text style={styles.field}>
            {userData.fullName}
          </Text>
          <Text style={styles.field}>
            {userData.email}
          </Text>
          <Text style={styles.field}>
            {userData.avatar}
          </Text>
        </Surface>
        <Button
          label={`Back to ${from}`}
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </ScreenTemplate>
  )
}
