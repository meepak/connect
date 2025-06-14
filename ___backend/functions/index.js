/* eslint-disable import/no-unresolved */


// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions")
const { onDocumentUpdated } = require("firebase-functions/v2/firestore")

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app")
const { getFirestore, Timestamp } = require("firebase-admin/firestore")

initializeApp()

// TODO lets put matchscore as 100 to 0 to -100
// 100 to 0 means opossite users matching scoroe
// 0 to -100 means same type of users similarity score
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
      .collection(`/users/${userId}/track_function_triggers`)
      .doc("calculateMatchScores")

  // Get the last trigger time.
  let lastTriggerTime = null
  await trackFunctionTriggerRef.get().then((doc) => {
    if (doc.exists && doc.data().lastTriggerTime) {
      lastTriggerTime = doc.data().lastTriggerTime
    } else {
      trackFunctionTriggerRef.set({ lastTriggerTime: timestamp })
    }
  })
      .catch((error) => {
        logger.error("Error getting last trigger time", error)
        return false
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
  await trackFunctionTriggerRef.update({ lastTriggerTime: timestamp })
  return false
}

/**
 * Gets potential matches for the given user
 * @param {user} user the current user
 * @param {Timestamp} timestamp current timestamp
 * @param {number} limit limit on users to be matched
 * @param {number} offset offset from where users should be matched
 * @return {Array} potential matches array
 */
async function getPotentialMatches(user, timestamp, limit = -1, offset = -1) {
  const potentialMatchUserType =
  (user.whoAmI === "founder") ? "associate" : "founder"

  let querySnapshot = getFirestore()
      .collection("/users")
      .where("whoAmI", "==", potentialMatchUserType)
      // The field must be present for orderBy to work
      // .orderBy("updatedAt", "desc")

  if (limit > 0) {
    querySnapshot = querySnapshot.limit(limit)
  }
  if (offset > 0) {
    querySnapshot = querySnapshot.offset(offset)
  }
  querySnapshot = await querySnapshot.get()

  const potentialMatches = []

  querySnapshot.forEach((doc) => {
    const potentialMatchUser = doc.data()
    const matchingScore = calculateMatchScore(user, potentialMatchUser)
    // TODO: skip users who have low match scores
    const potentialMatch = {
      "matchScore": matchingScore,
      "viewedAt": null,
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
 * we are using potential_matches subcollection in users collection
 * @param {user.id} userId the current user id
 * @param {Array} potentialMatches potential matches to be saved
 */
async function saveToDatabase(userId, potentialMatches) {
  const potentialMatchesRef = getFirestore()
      .collection("users")
      .doc(userId)
      .collection("potential_matches")

  const batch = getFirestore().batch()
  Object.keys(potentialMatches).forEach((otherUserId) => {
    const potentialMatchRef = potentialMatchesRef.doc(otherUserId)
    const matchData = potentialMatches[otherUserId]
    // updating current user
    batch.set(potentialMatchRef, { ...matchData }, { merge: true })
    // updating corresponding user
    // ****************IMPORTANT NOTE***************
    // TODO What if my user type changed and
    // I need to remove my match from existing user of my new type
    // ****************IMPORTANT NOTE***************
    const otherUserRef = getFirestore()
        .collection("users")
        .doc(otherUserId)
        .collection("potential_matches")
        .doc(userId)
    batch.set(otherUserRef, { ...matchData }, { merge: true })
  })

  await batch.commit()
}

/**
 * Recursive function to get potential matches and
 * save it in dataabase in batch sizes
 * @param {user} user the current user
 * @param {Timestamp} timestamp current timestamp
 * @param {number} limit limit on users to be matched
 * @param {number} offset offset from where users should be matched
 * @return {Array} potential matches array
 */
async function savePotentialMatches(user, timestamp, limit = -1, offset = -1) {
  await getPotentialMatches(user, timestamp, limit, offset)
      .then(async (potentialMatches) => {
        if (Object.keys(potentialMatches).length > 0) {
          // logger.info("Saving potential matches", potentialMatches)
          await saveToDatabase(user.id, potentialMatches)
              .then(async () => {
                logger.info("Batch processed..")
                // Recursively call the function
                // to save the next batch of matches
                if (limit > -1 && offset > -1) {
                  await savePotentialMatches(
                      user,
                      timestamp,
                      limit,
                      offset + limit,
                  )
                }
              })
              .catch((error) => {
                throw error
              })
        }
      })
      .catch((error) => {
        logger.error("Error in savePotentialMatches", error)
      })
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
    const BATCH_SIZE = 100

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

      // Start the recursive function
      await savePotentialMatches(user, timestamp, BATCH_SIZE, 0)

      logger.info("I am done saving potential matches for user ", user.id)
    } catch (error) {
      logger.error("Error in calculateMatchScores.", error, user.id)
    }
  })
