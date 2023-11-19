import React, { useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Text, Surface, Button, useTheme,
} from 'react-native-paper'
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native'
import { layout } from 'theme'
import ScreenTemplate from '../../components/screen-template'
import HomeTitleContext from '../../context/home-title-context'
// import storage from '../../utils/Storage'
// TODO FIGURE THIS OUT WITH ASYNC-STORAGE & UPDATE UTILS/STORAGE

const Styles = (fonts) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: layout.marginLeft,
  },
  title: {
    fontSize: fonts.titleLarge.fontSize,
    marginBottom: layout.margin,
    textAlign: 'center',
  },
  field: {
    fontSize: fonts.bodyLarge.fontSize,
    textAlign: 'center',
  },
  button: {
    marginBottom: layout.marginBottom,
    borderRadius: 15,
    width: 250,
  },
  buttonLabel: {
    fontSize: fonts.bodyLarge.fontSize,
  },
})

export default function Post() {
  const route = useRoute()
  const { colors, fonts } = useTheme()
  const { data, from } = route.params
  const { setTitle } = useContext(HomeTitleContext)
  const navigation = useNavigation()
  const styles = Styles(fonts)
  // const [date, setDate] = useState('')

  // const key = 'date'

  const loadStorage = async () => {
    // try {
    //   const result = await AsyncStorage.getItem(key)
    //   const dt = JSON.parse(result)
    //   // console.log(`loaded ${dt.date}`)
    //   setDate(dt)
    // } catch (e) {
    //   const result = { date: 'no data' }
    //   setDate(result)
    // }
  }

  const saveStorage = () => {
    // const today = moment().toString()
    // storage.save({
    //   key: 'date',
    //   data: {
    //     date: today,
    //   },
    // })
    // console.log(`saved ${today}`)
  }

  const removeStorage = () => {
    // storage.remove({ key: 'date' })
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
    // console.log('Post screen')
    loadStorage()
  }, [])

  useFocusEffect(() => {
    setTitle(data.fullName)
  })

  return (
    <ScreenTemplate>
      <Surface style={styles.container}>
        <Text style={styles.field}>Post Screen</Text>
        <Text style={styles.title}>{data.email}</Text>
        <Text style={styles.field}>from</Text>
        <Text style={styles.title}>{from}</Text>
        <Text style={styles.field}>Latest save date</Text>
        <Text style={styles.title}>date.date</Text>
      </Surface>
      <View style={styles.container}>
        <Button
          buttonColor={colors.primary}
          onPress={() => onSavePress()}
          mode="contained"
          marginBottom={layout.marginBottom}
          labelStyle={styles.buttonLabel}
          style={styles.button}
        >Save Date
        </Button>
        <Button
          buttonColor={colors.secondary}
          onPress={() => onRemovePress()}
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={styles.button}
        >Remove Date
        </Button>
        <Button
          buttonColor={colors.tertiary}
          onPress={() => navigation.navigate('Print')}
          mode="contained"
          labelStyle={styles.buttonLabel}
          style={styles.button}
        >Go to Print
        </Button>
      </View>
    </ScreenTemplate>
  )
}
