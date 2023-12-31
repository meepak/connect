import { atom } from 'jotai'

// This can be accomplished by just using another context but
// this allows lot les code to do the same thing
// could be useful for future use cases,
// where we require quick global state variable

// null value indicates we haven't checked the user status
// after checking it should be boolean value,
// probably can be done better with other option
const userAuthenticatedAtom = atom(null)

export default userAuthenticatedAtom
