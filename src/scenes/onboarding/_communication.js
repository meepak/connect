import React from 'react'
import {
  Surface, Text, Divider, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import CheckboxGroup from '../../components/core/CheckboxGroup'
import Styles from './Styles'

const CommunicationPreferences = ['Chat', 'Email', 'Phone call', 'Online meeting', 'In-person meeting']

const SelectCommunicationPreference = ({
  onCommunicationPreferenceChanged, initialValues,
}) => {
  const { fonts } = useTheme()
  const styles = Styles(fonts)
  return (
    <Surface style={styles.card}>
      <Text style={styles.question}>
        How do you prefer to communicate?
      </Text>
      <Divider style={styles.divider} />
      <CheckboxGroup
        items={CommunicationPreferences.map((industry, index) => ({
          id: index + 1,
          text: industry,
          value: industry,
          checked: initialValues.includes(industry),
        }))}
        maxSelect={CommunicationPreferences.length}
        onChecked={(value) => {
          onCommunicationPreferenceChanged(value)
        }}
        reverse
      />
    </Surface>
  )
}

SelectCommunicationPreference.propTypes = {
  onCommunicationPreferenceChanged: PropTypes.func.isRequired,
  initialValues: PropTypes.arrayOf(PropTypes.string),
}

SelectCommunicationPreference.defaultProps = {
  initialValues: [],
}

export default SelectCommunicationPreference
