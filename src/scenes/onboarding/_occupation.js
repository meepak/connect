import React, { useState, useEffect } from 'react'
import {
  Surface, Text, Divider, Chip, useTheme, Button,
} from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import PropTypes from 'prop-types'

import Styles from './styles'

const SelectOccupations = ({
  onOccupationsSelected, question, initialValues, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
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
    <Surface style={styles.card} onLayout={onLayout}>
      <Text style={styles.question}>
        { question }
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
      </Text>
      <Divider style={styles.divider} />

      {Occupations.map((occupation) => (
        <Chip key={occupation} onClose={() => handleClose(occupation)} style={styles.divider}>
          {occupation}
        </Chip>
      ))}

      <Button
        onPress={() => {
          // for now we don't need to send any params
          navigation.navigate('SelectOccupation', {
            title: 'Occupational skills',
          })
        }}
        mode="contained"
        style={styles.selectButton}
        icon="plus"
        textColor={colors.onPrimaryContainer}
      >
        <Text style={styles.selectButtonText}>Add</Text>
      </Button>
    </Surface>
  )
}

SelectOccupations.propTypes = {
  question: PropTypes.string,
  onOccupationsSelected: PropTypes.func.isRequired,
  initialValues: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectOccupations.defaultProps = {
  question: null,
  initialValues: [],
  error: false,
}

export default SelectOccupations
