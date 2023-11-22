import React from 'react'
import { Text, Card } from 'react-native-paper'

// eslint-disable-next-line react/prop-types
const Temp = ({ id }) => (
  <Card
    mode="contained"
  >
    {/* <Card.Cover source={userData.avatar} /> */}
    <Card.Title
      title={`Template - ${id}`}
      titleVariant="headlineSmall"
    //   left={() => {}}
      right={() => {}}
    />
    <Card.Content>
      <Text variant="bodyLarge">
        {/* {userData.fullName} */}
      </Text>
      <Text variant="bodyMedium">
        {/* {userData.email} */}
      </Text>
      <Text variant="bodySmall">
        {/* Member since {userData.createdAt?.toDate()?.toLocaleDateString()} */}
      </Text>
    </Card.Content>
  </Card>
)

export default Temp
