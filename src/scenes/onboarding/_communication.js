import React from 'react'
import {
  Surface, Text, Divider, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import CheckboxGroup from '../../components/core/checkbox-group'
import Styles from './styles'

const CommunicationPreferences = ['Chat', 'Email', 'Phone call', 'Online meeting', 'In-person meeting']

const SelectCommunicationPreference = ({
  onCommunicationPreferenceChanged, initialValues, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  return (
    <Surface style={styles.card} onLayout={onLayout}>
      <Text style={styles.question}>
        How do you prefer to communicate?
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
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
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectCommunicationPreference.defaultProps = {
  initialValues: [],
  error: false,
}

export default SelectCommunicationPreference
