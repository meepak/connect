export default ({ config }) => ({
  ...config,
  icon:
    'https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true',
  splash: {
    splash_black: '../../../assets/images/splash-black.png',
    splash_white: '../../../assets/images/splash-white.png',
    resizeMode: 'contain',
    // backgroundColor: '#f00',
  },
  asyncStorage: {
    key: {
      preferences: 'CONNECT411_PREFERENCES',
      occupations: 'CONNECT411_OCCUPATIONS',
    },
  },
  display: {
    bottomTabsHeight: 80,
    palette: [
      '#FBC02D',
      '#FFA000',
      '#F57C00',
      '#E64A19',
      '#D32F2F',
      '#C2185B',
      '#7B1FA2',
      '#512DA8',
      '#303F9F',
      '#1976D2',
      '#0288D1',
      '#0097A7',
      '#00796B',
      '#388E3C',
      '#689F38',
      '#AFB42B',
      '#5D4037',
      '#616161',
      '#455A64',
      '#FFFFFF',
      '#000000',
    ],
  },
  // plugins: [
  //   [
  //     '@react-native-voice/voice',
  //     {
  //       microphonePermission: 'Allow (PRODUCT_NAME) to access your microphone',
  //       speechRecogntionPermission: 'Allow (PRODUCT_NAME) to securely recognize user speech',
  //     },
  //   ],
  // ],
})
