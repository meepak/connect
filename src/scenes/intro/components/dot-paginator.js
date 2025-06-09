import React, {useEffect, useRef, useState} from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Svg, Circle, Ellipse } from 'react-native-svg'
import { IconButton } from 'react-native-paper'
import Animated, { useSharedValue, withDelay, withTiming, withSequence } from 'react-native-reanimated'


const Dot = ({index, size, color, activeColor, isActive}) => {
     const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse)
     const AnimatedCircle = Animated.createAnimatedComponent(Circle)
     const centerX = (index + 1) * (25 + size/2) - 15
     const cx = useSharedValue(centerX)
     const cy = size/2
     const rx = useSharedValue(size/2.2)
     const ry = useSharedValue(size/2.2)
     const bgColor = useSharedValue(isActive ? activeColor : color)
     const delay = 200
     useEffect(() => {
        if(isActive) {
            
            // this should animate second
            ry.value = withDelay(delay, withTiming(size/2.2, {duration: delay}))
            rx.value = withDelay(delay, 
                            withSequence(
                                withTiming(size/1.2, {duration: delay/2}),
                                withTiming(size/2.2, {duration: delay/2})
                            )
                        )
            
        } else {
            // this should first animate
            ry.value = withTiming(0, {duration: delay})
            rx.value = withSequence(
                            withTiming(size/1.2, {duration: delay/2}),
                            withTiming(size/0, {duration: delay/2})
                        )
            
        }
     },[isActive])
    return (
        <>
            <AnimatedCircle 
                cx={centerX}
                cy={cy}
                r={size/5}
                fill={bgColor}
                fillOpacity={1}
            />
            <AnimatedEllipse 
                cx={cx}
                cy={cy}
                rx={rx} // rx to 1.2 to 0 OR 0 to 1.2 to ry
                ry={ry}  // 0 to ry to 0
                stroke={bgColor}
                strokeWidth={1}
                fillOpacity={0}
                />
        </>
    )
}
const DotPaginator =(props) => {
    const {totalPages, /*currentPageIndex,*/ onPageChanged} = props
    const {colors} = useTheme()
    const indexes = Array.from({length: totalPages}, (_,i) => i)
    const [currentIndex, setCurrentIndex] = useState(0)

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
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton
                icon="chevron-left"
                size={dotSize + 7}
                iconColor={colors.onBackground}
                onPress={() => setCurrentIndex((index) =>  {
                    let newIndex = index > 0 ? index - 1 : 0
                    if(onPageChanged) {
                        onPageChanged(newIndex)
                    }
                     return newIndex           
                })}
            />

            <Svg style={{ 
                width: (dotSize + 15) * totalPages + 5, 
                height: dotSize,
                marginHorizontal: 5,
                // backgroundColor: '#FFFFFF'
            }}>
            {indexes.map((index) => (
                <Dot 
                    key={index}
                    index={index}
                    size={dotSize} 
                    color={colors.onBackground} 
                    activeColor={colors.tertiary} 
                    isActive={currentIndex === index} 
                /> 
            ))}
            </Svg>
            <IconButton
                icon="chevron-right"
                size={dotSize + 7}
                iconColor={colors.onBackground}
                onPress={() => {
                    setCurrentIndex((index) =>  {
                    let newIndex = index < totalPages - 1 ? index + 1 : totalPages - 1
                    if(onPageChanged) {
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