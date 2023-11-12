import React from 'react'
import {
  Surface, Text, Divider, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import RadioButtonGroup from '../../components/core/RadioButtonGroup'

import Styles from './Styles'

const WhoAmI = ({
  onWhoAmIChanged, initialValue, disabled, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)

  return (
    <Surface style={styles.card} onLayout={onLayout}>

      <Text style={styles.question}>
        What describes you best?
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
      </Text>
      <Divider style={styles.divider} />
      <RadioButtonGroup
        disabled={disabled}
        reverse
        items={[
          {
            id: 1,
            text: 'I am a founder, looking for associates',
            value: 'founder',
            checked: initialValue === 'founder',
          },
          {
            id: 2,
            text: 'I want to be an associate of a business',
            value: 'associate',
            checked: initialValue === 'associate',
          },
        ]}
      // textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
        onChecked={(value) => {
          onWhoAmIChanged(value)
        }}
      />
    </Surface>
  )
}

WhoAmI.propTypes = {
  onWhoAmIChanged: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

WhoAmI.defaultProps = {
  initialValue: '',
  disabled: false,
  error: false,
}

export default WhoAmI
