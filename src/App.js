import React, { useState, useEffect } from 'react'
import { Provider } from 'jotai'
import 'utils/ignore'
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserDataContextProvider } from './context/UserDataContext'
import LoadingScreen from './components/LoadingScreen'

import jsonData from '../assets/data/occupations.json'

// assets
import Router from './routes'

const isHermes = () => !!global.HermesInternal

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)
  console.log('isHermes', isHermes())

  // load json data to async storage
  const storeData = async () => {
    try {
      const key = 'occupation'
      // Check if the data already exists in AsyncStorage
      const existingData = await AsyncStorage.getItem(key)

      if (existingData === null) { // TODO PRE-CLEAN UP THE JSON FILE TO AVOID DELAYED LOAD TIME
      // we just want unique SOCTitles
        // Extract unique titles from jsonData
        const uniqueTitles = [...new Set(jsonData.SOCGroups.map((item) => item.SOCTitle))]

        // Create newJsonData with unique titles
        const newJsonData = uniqueTitles.map((title) => ({ title }))

        // Sort the newJsonData array by the length of the title (shortest titles first)
        const sortedJsonData = newJsonData.slice().sort((a, b) => a.title.length - b.title.length)
        // Data doesn't exist, so store it
        const jsonStr = JSON.stringify(sortedJsonData)
        // console.log(jsonStr)
        await AsyncStorage.setItem(key, jsonStr)
        console.log('Occupation Data stored successfully')
      } else {
        console.log('Occupation Data already exists in AsyncStorage')
      }
    } catch (error) {
      console.error('Error storing data:', error)
    }
  }
  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    await storeData()
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
  }, [])

  // rendering
  // if (!didLoad) return <LoadingScreen />
  return (
    <Provider>
      <UserDataContextProvider>
        {didLoad
          ? <Router />
          : <LoadingScreen />}
      </UserDataContextProvider>
    </Provider>
  )
}

export default App
