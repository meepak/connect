import {
  Asset,
} from 'expo-asset'

export const appImages = {
  default_banner: require('../../assets/images/default-banner.png'),
  logo_black: require('../../assets/images/fa_black.png'),
  logo_white: require('../../assets/images/fa_white.png'),
  intro1: require('../../assets/images/discover.png'),
  intro2: require('../../assets/images/connection.png'),
  intro3: require('../../assets/images/thrive.png'),
  // test_remote_image: require('https://findassociate.com/mahatau.png'),
}

// For mocking purpose used in generateMockData, will be removed before release
export const mockImages = [
  'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=200&dpr=1',
  'https://images.pexels.com/photos/2906635/pexels-photo-2906635.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/989200/pexels-photo-989200.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1804514/pexels-photo-1804514.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/3797438/pexels-photo-3797438.jpeg?auto=compress&cs=tinysrgb&w=1600',
]

export const mockBannerImages = [
  'https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.freeimages.com/variants/k1wQB7egQotJ7Hr3ZBPP1S5c/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=550',
  'https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500',
  'https://images.freeimages.com/images/large-previews/e78/family-1421593.jpg?fmt=webp&w=550',
]

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
  return [...Object.values(appImages), ...mockImages, ...mockBannerImages].map((image) => Asset.fromModule(image).downloadAsync())
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
const imageAssets = Object.entries(appImages).reduce((acc, [key, value]) => {
  acc[key] = Asset.fromModule(value)
  return acc
}, {})

export default imageAssets
