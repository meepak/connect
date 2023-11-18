import { Asset } from 'expo-asset'

// svg
// import Logo from '../../assets/images/logo.svg'

// export const svgs = {
//   logo: Logo,
// }

// png/jpeg
const images = {
  default_banner: require('../../assets/images/default-banner.png'),
  logo_black: require('../../assets/images/fa_black.png'),
  logo_white: require('../../assets/images/fa_white.png'),
  intro1: require('../../assets/images/discover.png'),
  intro2: require('../../assets/images/connection.png'),
  intro3: require('../../assets/images/thrive.png'),

}

// image preloading
// const imageAssets = Object.keys(images).map((key) => Asset.fromModule(images[key])) // images[key]).downloadAsync() if images was url

// This is not working when doing eas update, TODO check
const imageAssets = {}
Object.keys(images).forEach((key) => {
  imageAssets[key] = Asset.fromModule(images[key])
})
export default imageAssets
