import React from 'react'
import { View } from 'react-native'
// import { Text } from 'react-native-paper'
import Animation from './play'
// import { samples } from './text'
import HandwrittenAnimation from './hand-writing'
// import AnimatedLogo from './animated-logo'

const PlayGround = () => (
  <>
    <View
      pointerEvents="none"
      style={{
        position: 'absolute', top: 600, flexDirection: 'row', justifyContent: 'center', zIndex: 9999, width: '100%', height: '100%',
      }}
    >
      <HandwrittenAnimation />
    </View>
    {/* <View
      pointerEvents="none"
      style={{
        position: 'absolute', top: -50, left: 50, zIndex: 9999, width: '100%', height: '100%',
      }}
    >
      <AnimatedLogo />
    </View> */}
    {/* <View
      pointerEvents="none"
      style={{
        position: 'absolute', top: 10, left: 100, zIndex: 9999, width: '100%', height: '100%',
      }}
    >
      {samples.map((Sample, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`sample-${i}`}>
          <Text>{Sample.title}</Text>
          <Sample />
        </View>
      ))}
    </View> */}
    {/* <View
      pointerEvents="none"
      style={{
        position: 'absolute', top: 100, left: 0, zIndex: 9998, flex: 1, flexGrow: 1, width: '100%', height: '100%',
      }}
    >
      <Animation />
    </View> */}
  </>
)

export default PlayGround
