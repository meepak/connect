import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Svg, Circle, Ellipse, Rect } from 'react-native-svg'
import { IconButton } from 'react-native-paper'
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  withSequence,
  withSpring,
} from 'react-native-reanimated'

const Dot = (props: {
  index: number
  size: number
  color: string
  activeColor: string
  activeIndex: number
}) => {
  const { index, size, color, activeColor, activeIndex } = props
  // const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse)
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const AnimatedRect = Animated.createAnimatedComponent(Rect)

  const isActive = activeIndex === index

  const centerX = (i: number) => (i + 1) * (25 + size / 2) - 15
  const cy = size / 2

  const wx = useSharedValue(centerX(index) - size / 6)
  const wy = useSharedValue(cy - size / 6)
  const ww = useSharedValue(size / 3)
  const wst = useSharedValue(1)

  const cx = useSharedValue(centerX)
  const cr = useSharedValue(size / 7)
  const rx = useSharedValue(size / 2.2)
  const ry = useSharedValue(size / 2.2)

  const bgColor = useSharedValue(isActive ? activeColor : color)
  const delay = 200
  useEffect(() => {
    if (isActive) {
      // this should animate second
      cr.value = withDelay(delay, withSpring(size / 3, { damping: 3 }))

    } else {
      cr.value = withTiming(size / 7, { duration: delay })
    }
  }, [isActive])
  return (
    <>
      <AnimatedCircle
        cx={centerX(index)}
        cy={cy}
        r={cr}
        fill={color}
        fillOpacity={1}
        // strokeWidth={1}
        // stroke={color}
      />
    </>
  )
}
const DotPaginator = (props: {
  totalPages: number
  onPageChanged: Function
}) => {
  // for now removed from prop currentPageIndex,
  const { totalPages, onPageChanged } = props
  const { colors } = useTheme()
  const indexes = Array.from({ length: totalPages }, (_, i) => i)
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0)

  const dotSize = 22

  // to support updating of paginator when list is scrolled by other means
  // this doesn't seem to be super reliable,
  // so disabling other means of scrolling in list view for now
  // useEffect(() => {
  //     console.log('currentPageIndex sent', currentPageIndex)
  //     if(currentPageIndex && currentPageIndex !== currentIndex) {
  //         setCurrentIndex(() => currentPageIndex)
  //     }
  // }, [currentPageIndex])

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <IconButton
        icon="chevron-left"
        size={dotSize + 7}
        iconColor={colors.onBackground}
        onPress={() =>
          setCurrentActiveIndex((index) => {
            let newIndex = index > 0 ? index - 1 : 0
            if (onPageChanged) {
              onPageChanged(newIndex)
            }
            return newIndex
          })
        }
      />

      <Svg
        style={{
          width: (dotSize + 15) * totalPages + 5,
          height: dotSize,
          marginHorizontal: 5,
          // backgroundColor: '#FFFFFF'
        }}
      >
        {indexes.map((index) => (
          <Dot
            key={index}
            index={index}
            size={dotSize}
            color={colors.onBackground}
            activeColor={colors.tertiary}
            activeIndex={currentActiveIndex}
          />
        ))}
      </Svg>
      <IconButton
        icon="chevron-right"
        size={dotSize + 7}
        iconColor={colors.onBackground}
        onPress={() => {
          setCurrentActiveIndex((index) => {
            let newIndex = index < totalPages - 1 ? index + 1 : totalPages - 1
            if (onPageChanged) {
              onPageChanged(newIndex)
            }
            return newIndex
          })
        }}
      />
    </View>
  )
}

export default DotPaginator
