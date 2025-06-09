import React from 'react'
import { Text, Card } from 'react-native-paper'

// eslint-disable-next-line react/prop-types
const Privacy = () => (
  <Card
    mode="contained"
  >
    {/* <Card.Cover source={userData.avatar} /> */}
    <Card.Title
      title="Privacy"
      titleVariant="headlineSmall"
    //   left={() => {}}
      right={() => {}}
    />
    <Card.Content>
      <Text variant="bodyLarge">
        Collect usage data
      </Text>
      <Text variant="bodySmall">
        This app uses google analytics to collect usage data to collec
        anonymous usage information to improve the app.
      </Text>
      <Text variant="bodyLarge">
        Send Logs
      </Text>
      <Text variant="bodySmall">
        This app creates logs  of app activities and crash reports for troubleshooting purposes.
        This will be send anonymously and is there to help troubleshoot user issues.
      </Text>
    </Card.Content>
  </Card>
)

export default Privacy
