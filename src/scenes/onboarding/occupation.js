import React, { useState, useEffect } from 'react'
import {
  Surface, Text, Divider, Chip,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button'
import { colors } from '../../theme'

import styles from './styles'

const SelectOccupations = ({
  onOccupationsSelected,
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
      <Text style={styles.greetingMessage}>
        Add up to 5 occupational background for your partner?
      </Text>
      <Divider style={styles.divider} />

      {Occupations.map((occupation) => (
        <Chip key={occupation} onClose={() => handleClose(occupation)} style={styles.divider}>
          {occupation}
        </Chip>
      ))}

      <Button
        disable={Occupations.length >= 5}
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

export default SelectOccupations
