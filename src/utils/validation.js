export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email)

export const isValidName = (name) => /^[A-Za-z\s-]+$/.test(name)

export const isValidLength = (text, length) => text.length <= length

// TODO create complexity rule later
export const isPasswordComplex = (text) => text.length > 4
