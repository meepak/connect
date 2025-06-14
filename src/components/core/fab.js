import React from 'react'
import {
  FAB, Portal,
} from 'react-native-paper'

const Fab = () => {
  const [state, setState] = React.useState({ open: false })

  const onStateChange = ({ open }) => setState({ open })

  const { open } = state

  return (
    <Portal>
      <FAB.Group
        open={open}
        theme={{ colors: { backdrop: 'transparent' } }}
        visible
        icon={open ? 'calendar' : 'plus'}
        actions={[
          { icon: 'plus', onPress: () => console.log('Pressed add') },
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'home',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  )
}

export default Fab
