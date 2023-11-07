import React from 'react'
import {
  View, Text, StyleSheet,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import PencilIconButton from '../../../components/PencilIconButton'
import Styles from './_styles'

const UserIntro = (
  {
    editMode,
    userFullName,
  },
) => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    ...Styles(colors, fonts),
    userIntro: {
      marginHorizontal: 20,
      paddingBottom: 20,
    },
    userIntroContent: {
      marginRight: 30,
    },
  })

  return (
    <View style={styles.userIntro}>
      <View style={styles.userIntroContent}>
        <Text style={styles.sectionHeading}>{userFullName} asfdvxczvasdds asdfasfdasfdsafdsasdfasfdasfdsafds</Text>
        <Text style={styles.sectionSubHeading}>Chief Digital Transformation Officer and something else and more</Text>
        {/* Location */}
        <View style={{ marginVertical: 20 }} />
        <Text style={styles.sectionContent}>Seacombe Gardens - 5047, South Australia, Australia</Text>
      </View>
      {editMode
        ? (
          <PencilIconButton
            right={-10}
            onPress={() => {
              navigation.navigate('ProfileStack', {
                screen: 'EditIntro',
                params: {
                  data: [], // userData,
                  from: 'My Profilie',
                },
              })
            }}
          />
        )
        : <></>}
    </View>
  )
}

UserIntro.propTypes = {
  editMode: PropTypes.bool.isRequired,
  userFullName: PropTypes.string.isRequired,
}

export default UserIntro
