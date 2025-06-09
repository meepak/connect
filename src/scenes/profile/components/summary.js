import React from 'react'
import {
  View, StyleSheet,
} from 'react-native'
import { Surface, useTheme, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import Icon from '../../../components/core/icon'
import PencilIconButton from '../../../components/pencil-icon-button'
import Styles from './_styles'

const Summary = (
  {
    editMode,
  },
) => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    ...Styles(colors, fonts),
  })

  return (
    <Surface style={styles.surfaceView}>
      <View style={styles.row}>
        <Text style={styles.sectionHeading} variant="titleLarge">Summary</Text>
        {editMode
          ? (
            <PencilIconButton
              top={-10}
              right={-10}
              bgColor={colors.surface}
              onPress={() => {
                navigation.navigate('EditKeySummary', {
                  screen: 'EditKeySummary',
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
      <View style={styles.list}>
        {
            [
              { key: 'Investor/Active Partner/Advisory Partner' },
              { key: 'Interested in business at any stage' },
              { key: 'Occupation skill' },
              { key: 'Work arrangement' },
              { key: 'Mode of Operation' },
              { key: 'Communication Preference' },
              { key: 'References / NDA / Background Check' },
            ].map((item) => (
              <View style={styles.listItem} key={item.key}>
                <Icon style={styles.listItemText} name="check" />
                <Text style={styles.listItemText}> {item.key}</Text>
              </View>
            ))
        }
      </View>
    </Surface>
  )
}

Summary.propTypes = {
  editMode: PropTypes.bool.isRequired,
}

export default Summary
