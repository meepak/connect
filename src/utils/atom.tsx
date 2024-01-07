import { atom } from 'jotai'

// This can be accomplished by just using another context but
// this allows lot les code to do the same thing
// could be useful for future use cases,
// where we require quick global state variable

//UPDATE -- WITH TS UPGRADE, WE CAN'T DO NULL & BOOLEAN FOR SAME VAR
// SO SETTING SEPARATE ATOM TO TRACK IF WE CHECKED EVERYTHING
// null value indicates we haven't checked the user status
// after checking it should be boolean value,
// probably can be done better with other option
const authenticationCheckedAtom = atom(false)
const userAuthenticatedAtom = atom(false)

export {authenticationCheckedAtom, userAuthenticatedAtom}
