/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// To be decided on the user object will pass through to here
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Text, TouchableRipple, useTheme,
} from 'react-native-paper'
// import { Swipeable } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import Avatar from '@/components/core/avatar'
import { convertHexToRGBA } from '@/utils/functions'
import Swipeable from '@/components/core/swipeable'

const ListItemUser = ({
  name, industry, location, occupation, isPromoted, image, onPress, viewedAt,
}) => {
  const { colors } = useTheme()
  // console.log(`${name} is viewed at ${viewedAt}`)
  const fontWeight = viewedAt == null ? 900 : 100
  const color = viewedAt == null ? colors.onBackground : colors.onSurfaceDisabled

  // const [opacity, setOpacity] = useState(0)

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingVertical: 10,
      borderRadius: 5,
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
  })

  const LeftSwipeActions = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ff8303',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          // transform: [scale],
        }}
      >
        Left Action
      </Text>
    </View>
  )

  const RightSwipeActions = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ccffbd',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
      }}
    >
      <Animated.Text
        style={{
          flex: 1,
          color: 'black',
          paddingHorizontal: 10,
          fontWeight: '600',
          // transform: [scale],
        }}
      >
        Right Action
      </Animated.Text>
    </View>
  )

  return (
    <Swipeable
      leftContent={LeftSwipeActions()}
      rightContent={RightSwipeActions()}
      onRightActionActivate={() => console.log('Right action activated')}
      onLeftActionActivate={() => console.log('Left action activated')}
    >
      <View style={{ backgroundColor: colors.background }}>
        <TouchableRipple
          onPress={() => {
            // console.log('Pressed but onPress not yet handled.')
            onPress()
          }}
          rippleColor={convertHexToRGBA(colors.secondary, 0.3)}
        >
          <View style={styles.container}>
            <Avatar fullName={name} url={image} style={styles.Image} size={55} rounded={false} />
            <View style={styles.Info}>
              <Text style={styles.Title}>{name}</Text>
              <Text style={styles.Company}>{industry}</Text>
              <Text style={styles.Location}>{location}</Text>
              <Text style={styles.Rate}>{occupation}</Text>
              {isPromoted && <Text style={styles.Promoted}>Promoted</Text>}
            </View>
          </View>
        </TouchableRipple>
      </View>
    </Swipeable>
  )
}

export default ListItemUser
