import { createContext } from 'react'

const HomeTitleContext = createContext({
  title: 'default title',
  setTitle: () => {},
})

export default HomeTitleContext
