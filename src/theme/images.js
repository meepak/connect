import {
  Asset,
} from 'expo-asset'

export const images = {
  default_banner: require('../../assets/images/default-banner.png'),
  logo_black: require('../../assets/images/fa_black.png'),
  logo_white: require('../../assets/images/fa_white.png'),
  intro1: require('../../assets/images/discover.png'),
  intro2: require('../../assets/images/connection.png'),
  intro3: require('../../assets/images/thrive.png'),
  // test_remote_image: require('https://findassociate.com/mahatau.png'),
}

/**
 * It may not make lots of sense but it may provide benefit
 * for local images by moving to internal cache,
 * Also beauty of this thing is to provide consistent approach to
 * access both local and remote images,
 * so I can just add more images either local
 * or remote up there in images array above,
 * and it will be dealt with consistently
 *
 * ** await preloadImages() in preload function
 *
 * to cache them locally
 * And later on we can access the images using
 *
 * ** Asset.fromModule(images.key)
 *
 * Yes we will still be using the original path reference to access image
 * But Asset.fromModule will use the cached version
 *
 * So preserving keys during promise creation was never necessary
 * my understanding was wrong
 */
export async function preloadImages() {
  return Object.values(images).map((image) => Asset.fromModule(image).downloadAsync())
}

/**
 *  To use the images in app we will have to do
 *
 *  ** Asset.fromModule(images.key)
 *
 * As explained above so the following export is
 * just to make life ittle easier by allowing to do equivalent
 * using
 *
 * ** imageAssets.key
 */
const imageAssets = Object.entries(images).reduce((acc, [key, value]) => {
  acc[key] = Asset.fromModule(value)
  return acc
}, {})

export default imageAssets
