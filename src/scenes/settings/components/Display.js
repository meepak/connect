import React, { useContext } from 'react'
import {
  Text, Card, useTheme, SegmentedButtons,
} from 'react-native-paper'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import PreferencesContext from '../../../context/PreferencesContext'

const Display = () => {
  const { colors } = useTheme()
  const preferences = useContext(PreferencesContext)

  return (
    <Card
      mode="contained"
    >
      {/* <Card.Cover source={userData.avatar} /> */}
      <Card.Title
        title="Display"
        titleVariant="headlineSmall"
        left={() => (
          <MatIcon
            name="monitor-edit"
            size={40}
            color={colors.onBackground}
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyLarge" style={{ marginBottom: 5 }}>
          Theme option
        </Text>
        <SegmentedButtons
          value={preferences.themePreference}
          onValueChange={(value) => {
            preferences.setThemePreference(value)
          }}
          buttons={[
            {
              value: 'dark',
              label: 'Dark',
            },
            {
              value: 'light',
              label: 'Light',
            },
            {
              value: 'system',
              label: 'System',
            },
          ]}
        />
        <Text variant="bodyMedium">
          {/* {userData.email} */}
        </Text>
        <Text variant="bodySmall">
          {/* Member since {userData.createdAtLocale} */}
        </Text>
      </Card.Content>
    </Card>
  )
}

export default Display
