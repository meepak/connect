export default ({ config }) => ({
  ...config,
  icon:
    'https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true',
  splash: {
    image:
      'https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/splash.png?raw=true',
    imageBlack: 'https://cdn.nba.com/teams/uploads/sites/1610612741/2022/05/2122-mobile-wallpaper-02.webp',
    imageWhite: 'https://cdn.nba.com/teams/uploads/sites/1610612741/2022/05/2122-mobile-wallpaper-13.webp',
    // png is not transparent
    imageTransparentPng: 'https://img.freepik.com/free-vector/transparent-multicolored-soap-bubbles-set-plaid-background-sphere-ball-design-water-foam-aqua-wash_1284-41350.jpg?w=826&',
    imageSvg: 'https://cdn.svgator.com/images/2023/03/stopwatch-svg-animation.svg',
    resizeMode: 'contain',
    // backgroundColor: '#f00',
  },
})
