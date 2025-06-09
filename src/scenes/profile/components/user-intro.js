import React from 'react'
import {
  View, StyleSheet,
} from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import PencilIconButton from '../../../components/pencil-icon-button'
import Styles from './_styles'

const UserIntro = (
  {
    editMode,
    userFullName,
    sheetMode,
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
        {sheetMode
          ? <></>
          : <Text style={styles.sectionHeading} variant="titleLarge">{userFullName}</Text>}
        <Text style={styles.sectionSubHeading} variant="titleMedium">Chief Digital Transformation Officer</Text>
        {/* Location */}
        <View style={{ marginVertical: 20 }} />
        <Text style={styles.sectionContent} variant="bodyMedium">Seacombe Gardens - 5047, South Australia, Australia</Text>
      </View>
      {editMode
        ? (
          <PencilIconButton
            right={-10}
            bgColor={colors.background}
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
  sheetMode: PropTypes.bool,
}

UserIntro.defaultProps = {
  sheetMode: false,
}

export default UserIntro
