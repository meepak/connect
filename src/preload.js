import AsyncStorage from '@react-native-async-storage/async-storage'
import { preloadImages } from './theme/images'
import jsonData from '../assets/data/occupations.json'
import { ASYNC_STORAGE_KEY } from './utils/constants'

/*
* Things that needs pre-loading for app operation
* 1. load json data to async storage
* 2. load images / fonts assets
* 3. Anything that needs downloading from API before app starts
*
* This will be executed during splash screen display
*/

const storeData = async () => {
  try {
    // Check if the data already exists in AsyncStorage
    const occupationsKey = ASYNC_STORAGE_KEY.Occupations
    const existingData = await AsyncStorage.getItem(occupationsKey)

    if (existingData === null) {
      // TODO PRE-CLEAN UP THE JSON FILE TO AVOID DELAYED LOAD TIME
      // we just want unique SOCTitles
      // Extract unique titles from jsonData
      const uniqueTitles = [
        ...new Set(jsonData.SOCGroups.map((item) => item.SOCTitle)),
      ]

      // Create newJsonData with unique titles
      const newJsonData = uniqueTitles.map((title) => ({ title }))

      // Sort the newJsonData array by the length of the title (shortest titles first)
      const sortedJsonData = newJsonData
        .slice()
        .sort((a, b) => a.title.length - b.title.length)
      // Data doesn't exist, so store it
      const jsonStr = JSON.stringify(sortedJsonData)
      // console.log(jsonStr)
      await AsyncStorage.setItem(occupationsKey, jsonStr)
      // console.log('Occupation Data stored successfully')
    } else {
      // console.log('Occupation Data already exists in AsyncStorage')
    }
  } catch (error) {
    console.error('Error storing data:', error)
  }
}

export default async function Preload() {
  // Load your data here
  await Promise.all(preloadImages())
  await storeData()
  // additional simulated delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
}
