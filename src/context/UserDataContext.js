import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const UserDataContext = createContext()

export const UserDataContextProvider = (props) => {
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

UserDataContextProvider.protoTypes = {
  children: PropTypes.node.isRequired,
}
