// const getKilobyteSize = ({ str }) => {
//   const byteLength = new Blob([str]).size
//   const kilobytes = (byteLength / 1024).toFixed(2)
//   return `${kilobytes}KB`
// }

// function to merge two JSON objects
const mergeJsonObjects = (obj1, obj2) => {
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

export default mergeJsonObjects
