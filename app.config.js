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
})
