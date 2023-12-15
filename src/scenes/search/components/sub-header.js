import React from 'react'
import { SegmentedButtons, useTheme } from 'react-native-paper'
import { convertHexToRGBA } from '../../../utils/functions'

const SearchOptions = () => {
  const { colors } = useTheme()
  const [value, setValue] = React.useState('chat')
  return (
    <SegmentedButtons
      multiSelect
      showSelectedCheck
      style={{ top: -7 }}
      value={value}
      onValueChange={(val) => setValue(() => val)}
      buttons={[
        {
          value: 'people',
          label: 'People',
          style: {
            borderRadius: 0,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderColor: convertHexToRGBA(colors.outline, 0.5),
          },
        },
        {
          value: 'chat',
          label: 'Chat',
          style: {
            borderWidth: 1,
            borderColor: convertHexToRGBA(colors.outline, 0.5),
          },
        },
        {
          value: 'note',
          label: 'Note',
          style: {
            borderWidth: 1,
            borderRightWidth: 0,
            borderRadius: 0,
            borderColor: convertHexToRGBA(colors.outline, 0.5),
          },
        },
      ]}
    />
  )
}

export default SearchOptions
