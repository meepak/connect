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

// Listens for users info updated to /users/:userId
// and calculates the match score of this user against all other users
exports.calculateMatchScores =
  onDocumentUpdated("/users/{userId}", async (event) => {
    const throttleSeconds = 60 // TODO revise this period!!!
    const user = event.data.after.data()
    const timestamp = Timestamp.fromDate(new Date())

    if (!user || !user.whoAmI) {
      return // User type or data not available, exit
    }

    try {
      const potentialMatchRef = getFirestore()
          .collection("potential_matches")
          .doc(user.id)

      // get current function tracking info for this user
      const trackFunctionTriggerRef = getFirestore()
          .collection("track_function_triggers")
          .doc(user.id)

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
        if (lastTriggered <= throttleSeconds) {
        // Throttle the function.
          const throttleMessage =
        "Skipping calculate match scores function due to throttling"
          logger.info(throttleMessage, user.id, lastTriggered)
          return
        }
      }

      // Update the last trigger time.
      trackFunctionTriggerRef.update({ calculateMatchScore: timestamp })
      const startMessage =
    "Hello! I am going to update the potential matches for user:"
      logger.info(startMessage, user.id)

      const potentialMatchUserType =
      (user.whoAmI === "founder") ? "associate" : "founder"

      // Calculate the match score of this user against all opposite users
      // and store the results in a temporary variable
      const querySnapshot = await getFirestore()
          .collection("/users")
          .where("whoAmI", "==", potentialMatchUserType)
          // .orderBy("updatedAt", "desc") // To be enabled later
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

      await getFirestore()
          .batch()
          .set(potentialMatchRef, { ...potentialMatches })
          .commit() // update for current user

      // update for corresponding users in bulk
      const batch = getFirestore().batch()
      Object.keys(potentialMatches).forEach((otherUserId) => {
        const potMatchForOtherUser = []
        potMatchForOtherUser[user.id] = potentialMatches[otherUserId]
        const potentialMatchForOtherUserRef = getFirestore()
            .collection("potential_matches")
            .doc(otherUserId)
        batch.set(potentialMatchForOtherUserRef,
            { ...potMatchForOtherUser }, { merge: true })
      })
      await batch.commit()

      logger.info("I am done saving potential matches for user ", user.id)
    } catch (error) {
      logger.error("Error in calculateMatchScores.", error, user.id)
    }
  })
