import React, { useState, useEffect } from 'react'
import {
  Surface, Text, Divider, Chip,
} from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import PropTypes from 'prop-types'
import Button from '../../components/core/Button'
import { colors } from '../../theme'

import styles from './styles'

const SelectOccupations = ({
  onOccupationsSelected, question, maxSelect, initialValues,
}) => {
  const [Occupations, setOccupations] = useState(initialValues)
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    onOccupationsSelected(Occupations)
  }, [Occupations])

  useEffect(() => {
    if (route.params?.selectedOccupation) {
      // doesn't this suppose to do automatic merging,
      // anyway can be looked at when such use case arises
      const item = route.params.selectedOccupation
      if (!Occupations.includes(item)) {
        setOccupations([...Occupations, item])
      }
    }
  }, [route.params?.selectedOccupation])

  const handleClose = (occupation) => {
    setOccupations(Occupations.filter((c) => c !== occupation))
  }

  return (
    <Surface style={styles.card}>
      <Text style={styles.question}>
        { question }
      </Text>
      <Divider style={styles.divider} />

      {Occupations.map((occupation) => (
        <Chip key={occupation} onClose={() => handleClose(occupation)} style={styles.divider}>
          {occupation}
        </Chip>
      ))}

      <Button
        disable={maxSelect ? Occupations.length >= maxSelect : false}
        label="Add"
        color={colors.tertiary}
        onPress={() => {
          // for now we don't need to send any params
          navigation.navigate('SelectOccupation',{
            title: 'Occupational skills',
          })
        }}
      />
    </Surface>
  )
}

SelectOccupations.propTypes = {
  question: PropTypes.string,
  maxSelect: PropTypes.number,
  onOccupationsSelected: PropTypes.func.isRequired,
  initialValues: PropTypes.arrayOf(PropTypes.string),
}

SelectOccupations.defaultProps = {
  question: null,
  maxSelect: 5,
  initialValues: [],
}

export default SelectOccupations
