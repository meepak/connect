import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import PropTypes from 'prop-types'
import { Text, useTheme } from 'react-native-paper'

export default function Logo({ bgColor, textColor }) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    firstText: {
      color: textColor ?? colors.onBackground,
      fontWeight: 'bold',
    },
    secondText: {
      color: bgColor ?? colors.background,
      fontWeight: 'bold',
    },
    second: {
      backgroundColor: textColor ?? colors.onBackground,
      paddingHorizontal: 7,
      marginLeft: 3,
    },
    logo: {
      flex: 1,
      alignSelf: 'flex-start',
      marginLeft: 30,
      marginTop: 10,
      marginBottom: 20,
    },
  })

  return (
    <View style={styles.row}>
      <Text style={styles.firstText} variant="titleMedium">FIND</Text>
      <View style={styles.second}>
        <Text style={styles.secondText} variant="titleMedium">ASSOCIATE</Text>
      </View>
    </View>
  )
}

Logo.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}

Logo.defaultProps = {
  bgColor: null,
  textColor: null,
}
