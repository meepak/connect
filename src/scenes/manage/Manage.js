import React, {
  useContext,
} from 'react'
import {
  StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import ScreenTemplate from '../../components/ScreenTemplate'
// import Restart from '../../utils/Restart'
import { UserDataContext } from '../../context/UserDataContext'
import Header from './components/Header'

const Styles = () => StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    marginBottom: 80,
  },
})

export default function Manage() {
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)

  const { userData, setUserData } = useContext(UserDataContext)
 

  return (
    <ScreenTemplate>
      <Header />
    </ScreenTemplate>
  )
}
