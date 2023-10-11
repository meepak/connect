import React from 'react'
import {
  Surface,Text, Divider
} from 'react-native-paper'
import RadioButtonGroup from '../../components/RadioButtonGroup'

import styles from './styles'

const WhoAmI = ({
  whoAmI, onWhoAmIChanged,
}) => (
  <Surface style={styles.card}>

    <Text style={styles.greetingMessage}>
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
          checked: whoAmI === 'founder',
        },
        {
          id: 2,
          text: 'I want to be an associate of a business',
          value: 'associate',
          checked: whoAmI === 'associate',
        },
      ]}
      // textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
      onChecked={(value) => {
        onWhoAmIChanged(value)
      }}
    />
  </Surface>
)

export default WhoAmI
