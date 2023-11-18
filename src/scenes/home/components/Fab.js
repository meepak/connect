import React, {
  useState,
} from 'react'
import {
  Alert,
} from 'react-native'
import {
  FAB, Portal,
} from 'react-native-paper'

const Fab = () => {
  const [toggleStackOnLongPress, setToggleStackOnLongPress] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [visible, setVisible] = useState(false)
  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={open ? 'calendar' : 'plus'}
        toggleStackOnLongPress={toggleStackOnLongPress}
        actions={[
          { icon: 'plus', onPress: () => {} },
          { icon: 'star', label: 'Star', onPress: () => {} },
          { icon: 'person', label: 'person', onPress: () => {} },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => {},
            size: 'small', // 'medium'
          },
          {
            icon: toggleStackOnLongPress
              ? 'gesture-tap'
              : 'eye',
            label: toggleStackOnLongPress
              ? 'Toggle on Press'
              : 'Toggle on Long Press',
            onPress: () => {
              setToggleStackOnLongPress(!toggleStackOnLongPress)
            },
          },
        ]}
        enableLongPressWhenStackOpened
        onStateChange={(sopen) => setOpen(sopen)}
        onPress={() => {
          if (open) {
            Alert.alert('Fab is Pressed')
            // do something on press when the speed dial is closed
          }
        }}
        onLongPress={() => {
          if (toggleStackOnLongPress) {
            Alert.alert('Fab is Long Pressed')
            // do something if the speed dial is open
          }
        }}
        visible={visible}
      />
    </Portal>
  )
}

export default Fab
