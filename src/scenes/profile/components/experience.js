import React, { useContext } from 'react'
import {
  View, Text, StyleSheet,
} from 'react-native'
import { Surface, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import Icon from '../../../components/core/icon'
import PencilIconButton from '../../../components/pencil-icon-button'
import { UserDataContext } from '../../../context/user-data-context'
import Styles from './_styles'
import IconLink from '../../../components/core/icon-link'

const Experience = (
  {
    editMode,
  },
) => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()
  const { userData } = useContext(UserDataContext)

  const styles = StyleSheet.create({
    ...Styles(colors, fonts),
  })

  /*
 "work": [
      {
        "company": "Your employer name",
        "position": "Your job title",
        "website": "The URL for the employer's website",
        "startDate": "Your start date, in YYYY-MM-DD format",
        "endDate": "Your end date, in YYY-MM-DD format (leave blank for a current position)",
        "summary": "A one-sentence to one-paragraph summary of this employer or position",
        "highlights": [
          "Bullet-point list items that you would like to include along with (or instead of) a summary paragraph."
        ]
      }
    ],
  */
  return (
    <Surface style={styles.surfaceView}>
      {
        userData.experiece && userData.experience.length > 0
          ? (
            <>
              <View style={styles.row}>
                <Text style={styles.sectionHeading}>Work Experience</Text>
                {editMode
                  ? (
                    <PencilIconButton
                      top={-10}
                      right={-10}
                      onPress={() => {
                        navigation.navigate('EditExperience', {
                          screen: 'EditExperience',
                          params: {
                            data: [], // userData, get from context
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
            </>
          )
          : (
            <IconLink
              marginLeft={-10}
              icon="plus-circle"
              text="Add Work Experience"
              color={colors.primary}
              onPress={() => {
                navigation.navigate('EditExperience', {
                  screen: 'EditExperience',
                  params: {
                    data: userData,
                    from: 'My Profilie',
                  },
                })
              }}
            />
          )
        }
    </Surface>
  )
}

Experience.propTypes = {
  editMode: PropTypes.bool.isRequired,
}

export default Experience
