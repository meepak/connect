// const getKilobyteSize = ({ str }) => {
//   const byteLength = new Blob([str]).size
//   const kilobytes = (byteLength / 1024).toFixed(2)
//   return `${kilobytes}KB`
// }

// function to merge two JSON objects
export const mergeJsonObjects = (obj1, obj2) => {
  const result = { ...obj1 }
  Object.keys(obj2).forEach((key) => {
    if (typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
      result[key] = mergeJsonObjects(obj1[key] || {}, obj2[key])
    } else {
      result[key] = obj2[key]
    }
  })
  return result
}

export const convertHexToRGBA = (hexCode, opacity = 1) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  /* Backward compatibility for whole number based opacity values. */
  let op = opacity
  if (opacity > 1 && opacity <= 100) {
    op = opacity / 100
  }

  return `rgba(${r},${g},${b},${op})`
}
