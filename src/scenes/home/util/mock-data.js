import { Asset } from 'expo-asset'
import { mockImages, mockBannerImages } from '../../../theme/images'

function generateRandomName() {
  // Create a list of first names and last names.
  const firstNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'George', 'Hannah', 'Isaac', 'Jack', 'Kate']
  const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Johnson', 'Davis', 'Miller', 'Wilson', 'Taylor', 'Anderson', 'Thomas']

  // Choose a random first name and last name from the lists.
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

  // Return the full name.
  return `${firstName} ${lastName}`
}

// Define the data generation function
const generateMockData = (startIndex, itemCount, from) => {
  console.log(`called generateMockData from ${from ?? 'unknown'}`)
  const mockData = []

  for (let index = startIndex; index < startIndex + itemCount; index += 1) {
    const name = `${generateRandomName()}-${index}`
    const image = index % 2 === 0 ? mockImages[Math.floor(index / 2)] : null
    const banner = mockBannerImages[Math.floor(Math.random() * mockBannerImages.length)]

    const userItem = {
      id: index + 1,
      key: `ss${index}`,
      name,
      image: image ? Asset.fromModule(image).localUri : null,
      banner: banner ? Asset.fromModule(banner).localUri : null,
      occupation: 'Full Stack Engineer - Frontend Focus',
      industry: 'Jeeves Solutions Australia',
      location: 'Australia (Remote)',
      rate: 'A$100/hr-A$110/hr',
      isPromoted: true,
      onPress: () => {
        // Your navigation logic here
        // console.log('Going to profile')
      },
    }

    mockData.push(userItem)
  }

  return mockData
}

export default generateMockData
