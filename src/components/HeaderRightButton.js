import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import { UserDataContext } from '../context/UserDataContext'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
})

export default function HeaderRightButton(props) {
  const { from } = props
  const userData = UserDataContext()
  const navigation = useNavigation()

  const onButtonPress = () => {
    navigation.navigate('ModalStack', {
      screen: 'Post',
      params: {
        data: userData,
        from,
      },
    })
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onButtonPress()}
    >
      <FontIcon
        name="bars"
        size={24}
      />
    </TouchableOpacity>
  )
}

HeaderRightButton.propTypes = {
  from: PropTypes.string.isRequired,
}
