import React from 'react'
import { Snackbar } from 'react-native-paper'

const ShowSnackbar = (props) => {
  const {
    visible, onDismissSnackBar, title, duration,
  } = props

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={duration}
    >
      {title}
    </Snackbar>
  )
}

export default ShowSnackbar
