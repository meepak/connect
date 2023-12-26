import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  useTheme,
} from 'react-native-paper'
import {
  Google, Facebook, Linkedin, Apple,
} from '../../components/svg/social-buttons'

const SocialIcons = () => {
  const { colors } = useTheme()
  const color = colors.background // do I want faint border?
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 330,
      alignSelf: 'center',
    },
    socialIcon: {
    // backgroundColor: colors.primaryContainer,
      color: colors.onPrimaryContainer,
      marginHorizontal: 40,
      marginVertical: 20,
    },
  })
  const GoogleIcon = useMemo(() => (<Google size={50} color={color} onPress={() => {}} />), [])
  const AppleIcon = useMemo(() => (<Apple size={50} color={color} onPress={() => {}} />), [])
  const LinkedinIcon = useMemo(() => (<Linkedin size={50} color={color} onPress={() => {}} />), [])
  const FacebookIcon = useMemo(() => (<Facebook size={50} color={color} onPress={() => {}} />), [])
  return (
    <View style={styles.row}>
      {GoogleIcon}
      {AppleIcon}
      {LinkedinIcon}
      {FacebookIcon}
    </View>
  )
}

export default SocialIcons
