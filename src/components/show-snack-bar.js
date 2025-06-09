import React from 'react'
import { Snackbar } from 'react-native-paper'
import PropTypes from 'prop-types'

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

ShowSnackbar.propTypes = {
  visible: PropTypes.bool,
  onDismissSnackBar: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
}

ShowSnackbar.defaultProps = {
  visible: false,
}

export default ShowSnackbar
