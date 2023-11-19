// // import Voice, {
// //   SpeechRecognizedEvent,
// //   SpeechResultsEvent,
// //   SpeechErrorEvent,
// // } from '@react-native-voice/voice'

// // #region Voice input

// // https://github.com/react-native-voice/voice/blob/master/example/src/VoiceTest.tsx

// const [recognized, setRecognized] = useState('')
// const [volume, setVolume] = useState('')
// const [error, setError] = useState('')
// const [end, setEnd] = useState('')
// const [started, setStarted] = useState('')
// const [results, setResults] = useState([])
// const [partialResults, setPartialResults] = useState([])

// const clearState = () => {
//   setRecognized('')
//   setVolume('')
//   setError('')
//   setEnd('')
//   setStarted('')
//   setResults([])
//   setPartialResults([])
// }

// const onSpeechStart = (e) => {
//   console.log('onSpeechStart: ', e)
//   setStarted('√')
// }

// const onSpeechRecognized = (e) => {
//   console.log('onSpeechRecognized: ', e)
//   setRecognized('√')
// }

// const onSpeechEnd = (e) => {
//   console.log('onSpeechEnd: ', e)
//   setEnd('√')
// }

// const onSpeechError = (e) => {
//   console.log('onSpeechError: ', e)
//   setError(JSON.stringify(e.error))
// }

// const onSpeechResults = (e) => {
//   console.log('onSpeechResults: ', e)
//   setResults(e.value)
// }

// const onSpeechPartialResults = (e) => {
//   console.log('onSpeechPartialResults: ', e)
//   setPartialResults(e.value)
// }

// const onSpeechVolumeChanged = (e) => {
//   console.log('onSpeechVolumeChanged: ', e)
//   setVolume(e.value)
// }

// // useEffect(() => {
// //   Voice.onSpeechStart = onSpeechStart
// //   Voice.onSpeechRecognized = onSpeechRecognized
// //   Voice.onSpeechEnd = onSpeechEnd
// //   Voice.onSpeechError = onSpeechError
// //   Voice.onSpeechResults = onSpeechResults
// //   Voice.onSpeechPartialResults = onSpeechPartialResults
// //   Voice.onSpeechVolumeChanged = onSpeechVolumeChanged

// //   return () => {
// //     Voice.destroy().then(Voice.removeAllListeners)
// //   }
// // }, [])

// const startRecognizing = async () => {
//   clearState()
//   try {
//     await Voice.start('en-US')
//     console.log('called start')
//   } catch (e) {
//     console.error(e)
//   }
// }

// const stopRecognizing = async () => {
//   try {
//     await Voice.stop()
//   } catch (e) {
//     console.error(e)
//   }
// }

// const cancelRecognizing = async () => {
//   try {
//     await Voice.cancel()
//   } catch (e) {
//     console.error(e)
//   }
// }

// const destroyRecognizer = async () => {
//   try {
//     await Voice.destroy()
//   } catch (e) {
//     console.error(e)
//   }
//   clearState()
// }

// // #region Voice input end
