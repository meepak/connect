import React, { useMemo, useCallback } from 'react'
import { useTheme } from 'react-native-paper'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SheetModal = React.forwardRef(({ children, snapsAt, onDismiss, allowSwipeToClose }, ref) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  // refs
  //   const bottomSheetRef = useRef(null)
  // variables, TODO pass this as props
  const snapPoints = useMemo(() => snapsAt, [snapsAt])

  // #region callbacks
  // if necessary pass this through props later
  const handleChange = useCallback(() => {
    // eslint-disable-next-line no-console
    // console.log('index', index)
  }, [])
  // const handleDismiss = useCallback(() => {
  // eslint-disable-next-line no-console
  // console.log('on dismiss')
  // }, [])
  //   const handleDismissPress = useCallback(() => {
  //    bottomSheetRef.current?.dismiss()
  //   }, [])
  //   const handleClosePress = useCallback(() => {
  //    bottomSheetRef.current?.close()
  //   }, [])
  //   const handlePresentPress = useCallback(() => {
  //    bottomSheetRef.current?.present()
  //   }, [])
  // #endregion

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      topInset={+insets.top} // since this only works in android, do not rely on it, use inset provided by safe area view
      enablePanDownToClose={allowSwipeToClose}
      enableDismissOnClose
      onDismiss={onDismiss}
      onChange={handleChange}
      backdropComponent={({ animatedIndex, style }) => (
        <BottomSheetBackdrop
          animatedIndex={animatedIndex}
          style={[style, { backgroundColor: colors.background }]}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{ backgroundColor: colors.elevation.level5, borderRadius: 40 }}
      handleIndicatorStyle={{ width: '15%', height: 7, backgroundColor: colors.surfaceDisabled }}
    >
      {children}
    </BottomSheetModal>
  )
})

SheetModal.propTypes = {
  children: PropTypes.node.isRequired,
  snapsAt: PropTypes.arrayOf(PropTypes.string),
  onDismiss: PropTypes.func,
  allowSwipeToClose: PropTypes.bool,
}

SheetModal.defaultProps = {
  snapsAt: ['25%', '50%', '75%', '100%'],
  onDismiss: null,
  allowSwipeToClose: true,
}

export default SheetModal
