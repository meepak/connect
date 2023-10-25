/* eslint-disable import/no-unresolved */


// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions")
const { onDocumentUpdated } = require("firebase-functions/v2/firestore")

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app")
const { getFirestore, Timestamp } = require("firebase-admin/firestore")

initializeApp()

/**
 * Calculate the match score of currentUser with user
 *
 * @param {admin.auth.UsersRecord} currentUser the current user
 * @param {admin.auth.UsersRecord} user user to be match against
 * @return {number} Match score of currentUser with user
 */
function calculateMatchScore(currentUser, user) {
  // Implement your scoring logic here
  const score = 100
  // Compare currentUser with potentialMatchUsers and calculate the score
  // For example, compare industries, businessStage, and other preferences
  return score
}

/**
 * Throttle the firebase function execution
 *
 * @param {user.id} userId the current user id
 * @param {Timestamp} timestamp current timestamp
 * @return {boolean} true if the function should be throttled
 */
async function isThrottled(userId, timestamp) {
  const THROTTLE_SECONDS = 60 // TODO revise this period!!!
  // get current function tracking info for this user
  const trackFunctionTriggerRef = getFirestore()
      .collection("track_function_triggers")
      .doc(userId)

  // Get the last trigger time.
  let lastTriggerTime = null
  await trackFunctionTriggerRef.get().then((doc) => {
    if (doc.exists && doc.data().calculateMatchScore) {
      lastTriggerTime = doc.data().calculateMatchScore
    } else {
      trackFunctionTriggerRef.set({ calculateMatchScore: timestamp })
    }
  })

  // Check if we need to throttle.
  if (lastTriggerTime) {
    const lastTriggered = timestamp - lastTriggerTime
    if (lastTriggered <= THROTTLE_SECONDS) {
      // Throttle the function.
      const throttleMessage =
      "Skipping calculate match scores function due to throttling"
      logger.info(throttleMessage, userId, lastTriggered)
      return true
    }
  }

  // Update the last trigger time.
  await trackFunctionTriggerRef.update({ calculateMatchScore: timestamp })
  return false
}

/**
 *
 * @param {user} user the current user
 * @param {Timestamp} timestamp current timestamp
 * @return {Array} potential matches array
 */
async function getPotentialMatches(user, timestamp) {
  const potentialMatchUserType =
  (user.whoAmI === "founder") ? "associate" : "founder"

  const querySnapshot = await getFirestore()
      .collection("/users")
      .where("whoAmI", "==", potentialMatchUserType)
      // The field must be present for orderBy to work
      // .orderBy("updatedAt", "desc")
      .get()

  const potentialMatches = []

  querySnapshot.forEach((doc) => {
    const potentialMatchUser = doc.data()
    const matchingScore = calculateMatchScore(user, potentialMatchUser)
    // TODO: skip users who have low match scores
    const potentialMatch = {
      "matchScore": matchingScore,
      "profileViewed": false,
      "checkLater": false,
      "notInterested": false,
      "createdAt": timestamp,
    }
    potentialMatches[potentialMatchUser.id] = potentialMatch
  })
  return potentialMatches
}

/**
 * Save potential matches to database
 * @param {user.id} userId the current user id
 * @param {Array} potentialMatches potential matches to be saved
 */
async function saveToDatabase(userId, potentialMatches) {
  const potentialMatchRef = getFirestore()
      .collection("potential_matches")
      .doc(userId)

  await getFirestore()
      .batch()
      .set(potentialMatchRef, { ...potentialMatches })
      .commit() // update for current user

  // update for corresponding users in bulk
  const batch = getFirestore().batch()
  Object.keys(potentialMatches).forEach((otherUserId) => {
    const potMatchForOtherUser = []
    potMatchForOtherUser[userId] = potentialMatches[otherUserId]
    const potentialMatchForOtherUserRef = getFirestore()
        .collection("potential_matches")
        .doc(otherUserId)
    batch.set(potentialMatchForOtherUserRef,
        { ...potMatchForOtherUser }, { merge: true })
  })
  await batch.commit()
}

// Listens for users info updated to /users/:userId
// and calculates the match score of this user against all other users
exports.calculateMatchScores =
  onDocumentUpdated("/users/{userId}", async (event) => {
    // TODO implement bath size pagination
    // so that we only fetch batch size users and
    // process them and insert into db,
    // then only we move on to next batch.
    // Idea is user will have something to look at immediately
    // const BATCH_SIZE = 100

    const user = event.data.after.data()

    // TODO compare before and after to see if the change
    // was significant enough to impact match scores

    const timestamp = Timestamp.fromDate(new Date())

    if (!user || !user.whoAmI) {
      return // User type or data not available, exit
    }

    try {
      const throttled = await isThrottled(user.id, timestamp)
      if (throttled) {
        return // function is throttled for this user
      }

      const startMessage =
        "Hello! I am going to update the potential matches for user:"
      logger.info(startMessage, user.id)

      const potentialMatches = await getPotentialMatches(user, timestamp)

      await saveToDatabase(user.id, potentialMatches).then(() => {
        logger.info("I am done saving potential matches for user ", user.id)
      })
    } catch (error) {
      logger.error("Error in calculateMatchScores.", error, user.id)
    }
  })
