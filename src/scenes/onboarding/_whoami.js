import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import RadioButtonGroup from '../../components/core/RadioButtonGroup'

import styles from './styles'

const WhoAmI = ({
  onWhoAmIChanged, initialValue, disabled,
}) => (
  <Surface style={styles.card}>

    <Text style={styles.question}>
      What describes you best?
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

WhoAmI.propTypes = {
  onWhoAmIChanged: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
}

WhoAmI.defaultProps = {
  initialValue: '',
  disabled: false,
}

export default WhoAmI
