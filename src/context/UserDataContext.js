import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const UserDataContext = createContext()

const UserDataContextProvider = (props) => {
  const [userData, setUserData] = useState('')
  const { children } = props

  return (
    <UserDataContext.Provider
      value={{
        userData, setUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

export { UserDataContext, UserDataContextProvider }
