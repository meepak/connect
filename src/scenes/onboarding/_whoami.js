import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import RadioButtonGroup from '../../components/core/RadioButtonGroup'

import styles from './styles'

const WhoAmI = ({
  onWhoAmIChanged,
}) => (
  <Surface style={styles.card}>

    <Text style={styles.question}>
      What describes you best?
    </Text>
    <Divider style={styles.divider} />
    <RadioButtonGroup
      reverse
      items={[
        {
          id: 1,
          text: 'I am a founder, looking for associates',
          value: 'founder',
          checked: false,
        },
        {
          id: 2,
          text: 'I want to be an associate of a business',
          value: 'associate',
          checked: false,
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
}

export default WhoAmI
