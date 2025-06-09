/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  StyleSheet, View, Pressable, Dimensions,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler'
import { convertHexToRGBA } from '../utils/functions'

const Styles = (colors, fonts) => {
  const onBgColor = convertHexToRGBA(colors.onBackground, 0.9)
  const outlineCustom = convertHexToRGBA(colors.outline, 0.9)

  return StyleSheet.create({
    foundation: {
      backgroundColor: colors.background,
      zIndex: 3,
    },
    squareMenuContainer: {
      marginTop: 25,
      backgroundColor: colors.elevation.level5,
      color: colors.onBackground,
      elevation: 4,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      flex: 1,
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width,
      //   minHeight: 85,
      paddingTop: 15,
      paddingBottom: 15,
      overflow: 'hidden',
    },
    squareMenu: {
      borderWidth: 1,
      backgroundColor: colors.elevation.level5,
      borderColor: convertHexToRGBA(colors.outlineVariant, 0.5),
      borderRadius: 10,
      padding: 7,
      width: 'auto',
    },
    squareMenuPressed: {
      backgroundColor: convertHexToRGBA(colors.surfaceVariant, 0.5),
      borderColor: convertHexToRGBA(colors.outlineVariant, 0.9),
      borderBottomWidth: 0,
      // elevation: 5,
    },
    squareMenuContentRow: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 7,
    },
    smallText: { color: outlineCustom, fontSize: fonts.bodySmall.fontSize },
    smallTextActive: { color: onBgColor, fontSize: fonts.bodySmall.fontSize },
    largeText: { color: outlineCustom, fontSize: fonts.headlineSmall.fontSize },
    largeTextActive: { color: onBgColor, fontSize: fonts.headlineSmall.fontSize },
    iconStyleActive: { color: onBgColor },
    iconStyle: { color: outlineCustom },
    listTitle: { color: onBgColor, fontSize: fonts.bodySmall.fontSize },
  })
}

const MenuItem = ({
  styles, icon, count, text, onPress, isSelected, marginLeft, marginRight,
}) => {
  const {
    squareMenu,
    squareMenuPressed,
    squareMenuContentRow,
    iconStyle,
    iconStyleActive,
    smallText,
    smallTextActive,
    largeText,
    largeTextActive,
  } = styles

  return (
    <Pressable
      style={({ pressed }) => [
        squareMenu,
        (pressed || isSelected) && squareMenuPressed,
        { marginLeft, marginRight },
      ]}
      onPress={onPress}
    >
      <View style={squareMenuContentRow}>
        <Text style={isSelected ? largeTextActive : largeText}>{count}</Text>
        <MatIcon
          name={icon}
          size={28}
          style={isSelected ? iconStyleActive : iconStyle}
        />
      </View>
      <View style={squareMenuContentRow}>
        <Text style={isSelected ? smallTextActive : smallText}>{text}</Text>
      </View>
    </Pressable>
  )
}

const SquareMenu = React.forwardRef((props, ref) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)

  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <View style={styles.foundation} ref={ref}>
      <View style={styles.squareMenuContainer}>
        <ScrollView showsHorizontalScrollIndicator={false} style={{ flex: 1, marginHorizontal: 10 }} horizontal>
          <MenuItem
            styles={styles}
            icon="new-box"
            count={0}
            text="New Matches"
            onPress={() => setSelectedIndex(0)}
            isSelected={selectedIndex === 0}
            marginLeft={5}
            marginRight={10}
          />
          <MenuItem
            styles={styles}
            icon="file-account-outline"
            count={0}
            text="Profile Viewed"
            onPress={() => setSelectedIndex(1)}
            isSelected={selectedIndex === 1}
            marginLeft={5}
            marginRight={10}
          />
          <MenuItem
            styles={styles}
            icon="book-plus-outline"
            count={0}
            text="Shortlisted"
            onPress={() => setSelectedIndex(2)}
            isSelected={selectedIndex === 2}
            marginLeft={5}
            marginRight={10}
          />
          <MenuItem
            styles={styles}
            icon="wechat"
            count={0}
            text="Connected"
            onPress={() => setSelectedIndex(3)}
            isSelected={selectedIndex === 3}
            marginLeft={5}
            marginRight={5}
          />
        </ScrollView>
        {/* <View style={{paddingtop: 10, alignSelf: 'flex-start'}}>
          <Text style={styles.listTitle}>Showing 20/99 new matches.</Text>
        </View> */}
      </View>
    </View>
  )
})

export default SquareMenu
