/* eslint-disable react/prop-types */
// To be decided on the user object will pass through to here
import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Text, useTheme, Card,
} from 'react-native-paper'
import imageAssets from '../theme/images'

const CardItemUser = ({
  name, industry, location, occupation, image, onPress, viewedAt,
}) => {
  const { colors } = useTheme()
  // console.log(`${name} is viewed at ${viewedAt}`)
  const fontWeight = viewedAt === null || viewedAt === undefined ? 900 : 100
  const color = viewedAt === null || viewedAt === undefined ? colors.onBackground : colors.onSurfaceDisabled
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.2,
      // shadowRadius: 4,
      marginTop: 15,
    },
    Image: {
      alignSelf: 'flex-start',
    //   width: 64,
    //   height: 64,
    //   borderRadius: 32,
    },
    Info: {
      flex: 1,
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    Title: {
      fontSize: 18,
      fontWeight,
      color,
    },
    Company: {
      fontSize: 16,
      color,
    },
    Location: {
      fontSize: 14,
      color,
    },
    Rate: {
      fontSize: 16,
      fontWeight,
      color,
    },
    Promoted: {
      padding: 4,
      borderRadius: 2,
      fontSize: 12,
      color,
    },
    card: {
      margin: 4,
    },
  })

  //   <TouchableRipple
  //     onPress={() => {
  //       // console.log('Pressed but onPress not yet handled.')
  //       onPress()
  //     }}
  //     rippleColor="rgba(0, 0, 0, .32)"
  //   >
  //     <View style={styles.container}>
  //       <Avatar fullName={name} url={image} style={styles.Image} width={55} height={55} rounded={false} />
  //       <View style={styles.Info}>
  //         <Text style={styles.Title}>{name}</Text>
  //         <Text style={styles.Company}>{industry}</Text>
  //         <Text style={styles.Location}>{location}</Text>
  //         <Text style={styles.Rate}>{occupation}</Text>
  //         {isPromoted && <Text style={styles.Promoted}>Promoted</Text>}
  //         <Divider />
  //       </View>
  //     </View>
  //   </TouchableRipple>
  // )

  return (
    <Card style={styles.card} mode="elevated" onPress={onPress}>
      <Card.Cover source={image ? { uri: image } : imageAssets.default_banner} style={{ height: 50, width: 50 }} />
      <Card.Title title={name} subtitle={occupation} />
      <Card.Content>
        <Text style={styles.Title}>{name}</Text>
        <Text style={styles.Company}>{industry}</Text>
        <Text style={styles.Location}>{location}</Text>
        <Text style={styles.Rate}>{occupation}</Text>
      </Card.Content>
    </Card>
  )
}

export default CardItemUser
