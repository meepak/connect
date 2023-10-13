import React, { useState, useEffect } from 'react'
import {
  Surface, Text, Divider, Chip,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import { colors } from '../../theme'

import styles from './styles'

const SelectOccupations = ({
  onOccupationsSelected, question, maxSelect,
}) => {
  const [Occupations, setOccupations] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    onOccupationsSelected(Occupations)
  }, [Occupations])

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
          navigation.navigate('Select Occupation', {
            onReturn: (item) => {
              if (!Occupations.includes(item)) {
                setOccupations([...Occupations, item])
              }
            },
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
}

SelectOccupations.defaultProps = {
  question: null,
  maxSelect: 5,
}

export default SelectOccupations
