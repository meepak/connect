import React from 'react'
import { useAtom } from 'jotai'
import Navigation from './navigation'
import Initial from '../scenes/initial/Initial'
import { checkedAtom } from '../utils/atom' // loggedInAtom

const Routes = () => {
  const [checked] = useAtom(checkedAtom)
  // const [loggedIn] = useAtom(loggedInAtom)

  // console.log('route loaded')
  // TODO: switch router by loggedIn state
  // console.log('[##] loggedIn', loggedIn)

  // rendering
  if (!checked) {
    // console.log('[Routes.js] not checked')
    return <Initial />
  }

  return <Navigation />
}

export default Routes
