import React, { useState, useEffect } from 'react'
import { Provider } from 'jotai'
import 'utils/ignore'
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { UserDataContextProvider } from './context/UserDataContext'
import LoadingScreen from './components/LoadingScreen'

// assets
import Router from './routes'

const isHermes = () => !!global.HermesInternal

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)
  console.log('isHermes', isHermes())

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
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
