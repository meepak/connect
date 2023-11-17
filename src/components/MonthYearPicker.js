import React, { useMemo, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import {
  useTheme, Dialog, Button, Text,
} from 'react-native-paper'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import PropTypes from 'prop-types'
import Color from 'color'

function MonthYearPicker({
  visible,
  onChange,
  initialMonth,
  initialYear,
  onClose,
}) {
  const nowYear = new Date().getUTCFullYear()
  const nowMonth = new Date().getUTCMonth()
  const totalYears = 15
  const years = Array.from({ length: totalYears }, (_, i) => nowYear - i)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [monthsItems, setMonthsItems] = useState(months.map((name) => ({ label: name, value: '' })))

  let currentYearIndex = years.indexOf(initialYear) > 0 ? years.indexOf(initialYear) : 0
  let currentMonthIndex = months.indexOf(initialMonth) >= 0 ? months.indexOf(initialMonth) : (nowMonth - 1)

  const { colors, fonts } = useTheme()
  console.log(colors)
  const pageWidth = Dimensions.get('window').width
  const eachWheelWidth = (pageWidth / 2) * 0.6
  const eachWheelHeight = Dimensions.get('window').height / 4
  const containerWidth = eachWheelWidth * 2.5
  const leftPosition = (pageWidth - containerWidth) / 4

  const styles = StyleSheet.create({
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      maxWidth: containerWidth,
      backgroundColor: colors.elevation.level3,
    },
    doneButton: {
      width: 85,
      height: 32,
    },
    doneButtonLabel: {
      fontSize: fonts.bodyMedium.fontSize,
      color: colors.onBackground,
      lineHeight: 13,
      height: 12,
      fontWeight: 'bold',
    },
  })

  const handleClose = () => {
    onClose()
  }

  // Use memoized function to update show state
  const show = useMemo(() => visible, [visible])

  const handleChange = (value) => {
    if (value.month) {
      currentMonthIndex = value.month.index
    }
    if (value.year) {
      currentYearIndex = value.year.index
    }

    // do not allow selecting future dates, if performance degrades
    // remove this
    if (currentYearIndex === 0 && currentMonthIndex > (nowMonth - 1)) {
      currentMonthIndex = nowMonth - 1
      // is there a way to change the wheel?
      setMonthsItems(months.filter((_, index) => index <= currentMonthIndex).map((name) => ({ label: name, value: '' })))
    } else {
      setMonthsItems(months.map((name) => ({ label: name, value: '' })))
    }
    onChange({ month: months[currentMonthIndex], year: years[currentYearIndex] })
  }

  return (
    <Dialog
      visible={show}
      onDismiss={handleClose}
      theme={{
        colors: {
          backdrop: 'transparent',
          backgroundColor: colors.elevation.level3,
        },
      }}
      style={{ width: containerWidth, left: leftPosition }}
    >
      <Dialog.Content>
        <View style={styles.content}>
          <WheelPickerExpo
            backgroundColor={Color(colors.elevation.level3).hex()}
            height={eachWheelHeight}
            width={eachWheelWidth}
            initialSelectedIndex={currentMonthIndex}
            items={monthsItems}
            onChange={(item) => handleChange({ month: item })}
          />
          <WheelPickerExpo
            backgroundColor={Color(colors.elevation.level3).hex()}
            height={eachWheelHeight}
            width={eachWheelWidth}
            initialSelectedIndex={currentYearIndex}
            items={years.map((name) => ({ label: name, value: '' }))}
            onChange={(item) => handleChange({ year: item })}
          />
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          onPress={handleClose}
          mode="outlined"
          style={styles.doneButton}
          textColor={colors.onBackground}
        ><Text style={styles.doneButtonLabel}>Done</Text>
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

MonthYearPicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  initialMonth: PropTypes.string,
  initialYear: PropTypes.number,
  onClose: PropTypes.func.isRequired,
}

MonthYearPicker.defaultProps = {
  initialMonth: null,
  initialYear: null,
}

export default MonthYearPicker
