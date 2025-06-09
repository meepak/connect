import React, {
  useEffect, useRef, useCallback,
} from 'react'
import { useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

// import IconLink from '../../../../components/core/IconLink'
import WebView from 'react-native-webview'
import SheetModal from './core/sheet-modal'
import tnc from '../../assets/tnc'

const TermsAndCondition = ({ show, onClose }) => {
  const tncSheetRef = useRef()

  const openMenu = useCallback(() => {
    if (tncSheetRef.current) {
      tncSheetRef.current.present()
    }
  }, [])

  const closeMenu = useCallback(() => {
    if (tncSheetRef.current) {
      tncSheetRef.current.close()
    }
  }, [])

  useEffect(() => {
    if (show) {
      openMenu()
    } else {
      closeMenu()
    }
  }, [show])

  const handleDismiss = useCallback(() => {
    onClose()
  }, [])

  const { colors } = useTheme()

  const html = `<html><head>
                <style>
                  body {
                    font-size: -webkit-xxx-large; 
                    background-color: ${colors.surfaceContainerHigh};
                    color: ${colors.onBackground}
                  }
                </style></head>
                <body>${tnc}</body>
                </html`

  return (
    <SheetModal ref={tncSheetRef} snapsAt={['75%']} onDismiss={handleDismiss} title="Terms and Conditions">
      <WebView
        style={{
          marginHorizontal: 15,
          marginVertical: 10,
          backgroundColor: colors.transparent,
        }}
        nestedScrollEnabled
        source={{ html }}
      />
    </SheetModal>
  )
}

TermsAndCondition.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default TermsAndCondition
