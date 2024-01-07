import React, {
  useDeferredValue, useEffect, useId, useRef, useState,
} from 'react'
import { View } from 'react-native'
import { ModalTemplate } from '../../components/templates'
import Header from './components/header'
import Recent from './components/recent'
import Temp from './components/template'
import SearchOptions from './components/sub-header'

const Settings = () => {
  const paddingVertical = 20
  const [searchQuery, setSearchQuery] = useState('')
  const ref = useRef(null)

  /*
  * Hook to defer the rendering of the search results
  * until after the user stops typing in the search bar.
  */
  const deferredSearchQuery = useDeferredValue(searchQuery)

  useEffect(() => {
    // Fetch search results using deferredSearchQuery
    // Update setSearchResults with the new results
  }, [deferredSearchQuery])

  const setSearchQueryValue = (value) => {
    setSearchQuery(value)
    if (ref?.current) {
      setTimeout(() => ref.current.focus(), 50)
    }
  }

  return (
    <ModalTemplate
      header={<Header ref={ref} searchQuery={searchQuery} onSearchQueryChange={(value) => setSearchQueryValue(value)} />}
      subHeader={<SearchOptions />}
      // subHeader={<Text style={{ top: -7, left: 20 }} variant="headlineSmall">Option: Everywhere</Text>}
      content={(
        <>
          <Recent onSelected={(value) => setSearchQueryValue(value)} />
          <View style={{ paddingVertical }} />
          <Temp id={useId()} />
          <View style={{ paddingVertical }} />
          <Temp id={useId()} />
          <View style={{ paddingVertical }} />
          <Temp id={useId()} />
          <View style={{ paddingVertical }} />
          <Temp id={useId()} />
          <View style={{ paddingVertical }} />
          <Temp id={5} />
          <View style={{ paddingVertical }} />
          <Temp id={6} />
          <View style={{ paddingVertical }} />
          <Temp id={7} />
          {/* <View style={{ paddingVertical }} />
          <View style={{ paddingVertical }} />
          <View style={{ paddingVertical }} /> */}
        </>
      )}
    />
  )
}

export default Settings
