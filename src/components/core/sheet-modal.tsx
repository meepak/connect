import React, { useMemo, useCallback, forwardRef, Ref } from 'react'
import { IconButton, Text, useTheme } from 'react-native-paper'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { convertHexToRGBA } from '@/utils/functions'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'

interface SheetModalProps {
  children: React.ReactNode
  snapsAt?: string[]
  index?: number
  onDismiss?: () => void
  allowSwipeToClose?: boolean
  title?: string
  marginHorizontal?: number
  backgroundColor?: string
  opacity?: number
}

const SheetModal = forwardRef(
      (
        {
          children = <></>,
          snapsAt = ['25%', '50%', '75%', '100%'], // TODO -- confine 100% within safe area
          index = 0,
          onDismiss = () => {},
          allowSwipeToClose = true,
          title = '',
          marginHorizontal = 15,
          backgroundColor = '',
          opacity = 0.65,

        }: SheetModalProps,
        ref: Ref<any>
      ) => {
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
        index={index}
        $modal={true}
        overDragResistanceFactor={2.5}
        topInset={insets.top}
        enablePanDownToClose={allowSwipeToClose}
        enableDismissOnClose
        onDismiss={onDismiss}
        onChange={handleChange}
        // backdropComponent={({ animatedIndex, style }) => (
        //   <BottomSheetBackdrop
        //     animatedIndex={animatedIndex}
        //     style={[
        //       style,
        //       {
        //         backgroundColor: colors.background,
        //         position: 'absolute',
        //         top: 0,
        //         left: 0,
        //         right: 0,
        //       },
        //     ]}
        //     disappearsOnIndex={-1} animatedPosition={{
        //       value: 0
        //     }}          />
        // )}
        backgroundStyle={{
          /* backgroundColor: colors.elevation.level3,*/ borderRadius: 20,
          // backgroundColor: 'transparent',
          backgroundColor:
            backgroundColor === '' ? colors.primaryContainer : backgroundColor,
          opacity: opacity,
          marginHorizontal: marginHorizontal,
          // borderWidth: 1,
          // borderColor: colors.onBackground,
          // paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 4,
        }}
        handleIndicatorStyle={{ height: 0 }}
        handleComponent={() => (
          <View
            style={{
              flex: 1,
              flexWrap: 'nowrap',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: 55,
              // backgroundColor: convertHexToRGBA(colors.primaryContainer, 0.15),
              // elevation: 5,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text
              variant="titleLarge"
              numberOfLines={1}
              style={{
                marginBottom: 10,
                fontWeight: '500',
              }}
            >
              {title}
            </Text>
            <IconButton
              style={{
                right: -15,
                alignSelf: 'flex-end',
                // backgroundColor: convertHexToRGBA(colors.onBackground, 0.1),
              }}
              icon="x"
              size={24}
              iconColor={colors.onBackground}
              onPress={() => onDismiss()}
              // mode="outlined"
            />
          </View>
        )}
      >
        {children}
      </BottomSheetModal>
    )
  },
)



export default SheetModal
