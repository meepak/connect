/* eslint-disable max-classes-per-file */
import React, { Component } from 'react'

import {
  Svg,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg'

class TextExample extends Component {
  static title = 'FIND ASSOCIATE';

  render() {
    return (
      <Svg height="30" width="100">
        <Text x="50" y="9" fill="red" textAnchor="middle">
          FIND ASSOCIATE
        </Text>
      </Svg>
    )
  }
}

class TextRotate extends Component {
  static title = 'Find Associate';

  render() {
    return (
      <Svg height="60" width="200">
        <Text x="0" y="15" fill="red" rotate="30" origin="20,40">
          Find Associate
        </Text>
        <Text x="95" y="47" fill="blue" rotate="-25" origin="95, 20">
          Find Associate
        </Text>
        <Text
          x="126"
          y="5"
          fill="#f60"
          rotate="106"
          scale="1.36"
          origin="140, 0"
        >
          FIND ASSOCIATE
        </Text>
      </Svg>
    )
  }
}

class TextStroke extends Component {
  static title = 'FIND ASSOCIATE';

  render() {
    return (
      <Svg height="60" width="200">
        <Defs>
          <LinearGradient
            id="text-stroke-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <Stop offset="0%" stopColor="blue" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="red" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Text
          stroke="url(#text-stroke-grad)"
          strokeWidth="2"
          fill="none"
          fontSize="24"
          fontWeight="bold"
          x="100"
          y="20"
        >
          <TSpan textAnchor="middle">{['FIND ASSOCIATE']}</TSpan>
        </Text>
      </Svg>
    )
  }
}

class TextFill extends Component {
  static title = 'FIND ASSOCIATE';

  render() {
    return (
      <Svg height="60" width="200">
        <Defs>
          <LinearGradient id="text-fill-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="rgb(255,255,0)" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="red" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Text
          fill="url(#text-fill-grad)"
          stroke="purple"
          strokeWidth="1"
          fontSize="20"
          fontWeight="bold"
          x="100"
          y="20"
          textAnchor="middle"
        >
          FIND ASSOCIATE
        </Text>
      </Svg>
    )
  }
}

const path = `
M 10 20
C 40 10 60  0 80 10
C 100 20 120 30 140 20
C 160 10 180 10 180 10
`
class TextPathExample extends Component {
  static title = 'Find Associate';

  render() {
    return (
      <Svg height="100" width="200">
        <Defs>
          <Path id="textpath" d={path} />
        </Defs>
        <G y="20">
          <Text fill="blue">
            <TextPath href="#textpath" startOffset="-10%">
              We go up and down,
              <TSpan fill="red" dy="5,5,5">
                then up again
              </TSpan>
            </TextPath>
          </Text>
          <Path d={path} fill="none" stroke="red" strokeWidth="1" />
        </G>
      </Svg>
    )
  }
}

class TSpanExample extends Component {
  static title = 'TSpan nest';

  render() {
    return (
      <Svg height="160" width="200">
        <Text y="20" dx="5 5" fill="black">
          <TSpan x="10">tspan line 1</TSpan>
          <TSpan x="10" dy="15">
            Find Associate
          </TSpan>
          <TSpan x="10" dx="10" dy="15">
            Find Associate
          </TSpan>
        </Text>
        <Text x="10" y="60" fill="red" fontSize="14">
          <TSpan dy="5 10 20">12345</TSpan>
          <TSpan fill="blue" dy="15" dx="0 5 5">
            <TSpan>6</TSpan>
            <TSpan>7</TSpan>
          </TSpan>
          <TSpan dx="0 10 20" dy="0 20" fontWeight="bold" fontSize="12">
            Find
          </TSpan>
        </Text>
        <Text y="140" dx="0 5 5" dy="0 -5 -5" fill="black">
          Associate
        </Text>
      </Svg>
    )
  }
}

class TWavePath extends Component {
    title = 'Text in wave path'

    render() {
      return (

        <Svg height="40" width="200">
          <Defs>
            <Path
              id="path"
              d="M10 20 Q 50 0 100 20 T 190 20"
              fill="transparent"
              stroke="black"
              strokeWidth="2"
            />
          </Defs>
          <Text fill="blue" fontSize="18">
            <TextPath href="#path">
              Your handwritten text here
            </TextPath>
          </Text>
        </Svg>
      )
    }
}

const icon = (
  <Svg height="30" width="30" viewBox="0 0 100 100">
    <Text x="0" y="80" fontSize="100" fill="blue">
      字
    </Text>
  </Svg>
)

const TextLogo = () => (
  <Svg width={94.379} height={79.019} viewBox="0 0 24.971 20.907">
    <Path d="M.564 20.05c-.18.247-.383.496-.564.767.497.067.7.09 1.106.09.745 0 1.332-.113 1.694-.316.654-.361 1.806-1.468 2.415-2.258.7-.948 1.513-2.867 2.032-4.944.858-3.229 1.287-4.9 1.333-5.058.203.023.293.023.383.023l1.174-.045c.068 0 .204 0 .43.022l.948-.722c-.655-.023-.903-.023-1.445-.023-.497 0-.7 0-1.31.023 1.468-5.758 1.784-6.435 3.138-6.435.407 0 .723.045 1.513.18L14.45.136A3.57 3.57 0 0 0 13.366 0c-1.377 0-2.28.474-3.816 1.964C8.286 3.206 7.993 3.838 7.112 7.61c-.226-.023-.339-.023-.452-.023l-1.106.045c-.045 0-.158 0-.339-.022-.135.09-.27.18-.316.203-.248.135-.293.18-.496.27-.068.046-.249.136-.452.25h.565l1.58.022c.135 0 .384 0 .835-.023-.36 1.377-.496 1.964-.925 3.951-1.355 6.232-1.874 7.225-3.793 7.225-.339 0-.61-.022-1.197-.113zM9.98 15.15c.519.158.767.203 1.196.203 1.535 0 2.596-.813 5.554-4.2 1.784 0 3.116.023 3.996.09-.045.272-.09.543-.113.814-.045.225-.112.7-.18 1.196a10.13 10.13 0 0 1-.136.926 6.4 6.4 0 0 0-.112.97c0 .294.225.497.519.497.09 0 .7-.112 1.829-.316l1.287-.225c.158-.023.406-.068.79-.136l.361-.542c-.926.068-1.49.113-1.67.113-.904 0-1.152-.226-1.152-1.016 0-1.445.88-7.767 1.603-11.357l-.316-.225c-.678.7-.723.722-1.197.722-.293 0-.406-.022-1.287-.158-1.016-.158-1.603-.226-2.054-.226-1.039 0-2.123.52-3.184 1.558-1.197 1.152-1.716 2.145-1.716 3.342 0 .542.068.903.316 1.558l1.671-.904c-.361-1.06-.474-1.58-.474-2.1 0-1.286.97-2.054 2.619-2.054.248 0 .542.023.835.045l.542.068c.316.023.542.045.7.068.361.045.565.045 1.174.09L17.475 9.01c-.948 1.219-2.416 2.935-3.025 3.522-.903.88-1.58 1.196-2.62 1.196-.383 0-.586-.022-.993-.158zm7.45-4.922 4.358-5.712-.926 5.712z" />
  </Svg>
)

const samples = [
  TWavePath,
  TextExample,
  TextRotate,
  TextStroke,
  TextFill,
  TextPathExample,
  TSpanExample,
  TextLogo,
]

export { icon, samples }
