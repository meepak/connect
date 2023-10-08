import React from 'react'
import {
    Text, View,
  } from 'react-native'
import RadioButtonGroup from '../../components/RadioButtonGroup'

const Screen1WhoAmI = ({ whoAmI, onWhoAmIChanged, onAvatarChanged, onNext, colorScheme }) => (
    <View>
      <View style={styles.avatar}>
        <Avatar
          size="xlarge"
          onEdited={(item) => onAvatarChanged(item)}
        />
      </View>
  
      <Text style={[styles.greetingMessage, { color: colorScheme.text }]}>
        What describes you best?
      </Text>
  
      <RadioButtonGroup
        items={[
          {
            id: 1,
            text: 'I am a founder, looking for associates.',
            value: 'founder',
            checked: whoAmI === 'founder',
          },
          {
            id: 2,
            text: 'I want to be an associate of a business.',
            value: 'associate',
            checked: whoAmI === 'associate',
          },
        ]}
        textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
        onChecked={(value) => {
          onWhoAmIChanged(value)
        }}
      />
      <Button
        label="Next"
        color={colors.primary}
        onPress={onNext}
      />
    </View>
  )