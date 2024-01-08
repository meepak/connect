import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import RenderCounter from '@/components/render-counter'

const Header = ({ label, marginTop, marginBottom }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop,
      marginBottom,
    },
  })

  return (
    <View style={styles.titleContainer}>
      <IconButton
        icon="chevron-left"
        color={colors.onBackground}
        size={32}
        onPress={() => navigation.goBack()}
      />
      <Text variant="displaySmall">{label}</Text>
      <RenderCounter />
    </View>
  )
}

Header.propTypes = {
  label: PropTypes.string.isRequired,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
}

Header.defaultProps = {
  marginTop: 25,
  marginBottom: 30,
}

export default Header
