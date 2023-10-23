/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */


// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions")
const { onDocumentUpdated } = require("firebase-functions/v2/firestore")

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")


initializeApp()

/*
* TODO: 1. If user updates this part of their profile too often,
           do not trigger the update for every udpate, probably throttle for every 30 mins or so
        2. Probably putting userID as field name isn't a great idea,
           This doesn't give mechanism to track, potential match -> request sent -> connected...
/potential_matches
  /$user_id_of_this_matches
    /user_id_of_potential_match
        /match_score
        /profile_viewed
        /check_later
        /not_interested
*
*/
// Listens for users info updated to /users/:userId
// and calculates the match score of this user against all other users
exports.calculateMatchScores = onDocumentUpdated("/users/{userId}", (event) => {
// Grab the current value of what was written to Firestore.

  // Log the response
  logger.log("Hello! I am goint to update the match scores for user:", event.params.userId)
  const user = event.data.after.data()

  if (!user || !user.whoAmI) {
    return null // User type or data not available, exit
  }

  const oppositeUserType = (user.whoAmI === "founder") ? "associate" : "founder"

  logger.log("Search for user type: ", oppositeUserType)


  // Calculate the match score of this user against all opposite users
  // and store the results in a temporary variable

  const matchScoresPromise = getFirestore()
      .collection("/users")
      .where("whoAmI", "==", oppositeUserType)
      // .orderBy("updatedAt", "desc") // To be enabled later
      .get()
      .then((querySnapshot) => {
        const matchScores = []
        querySnapshot.forEach((doc) => {
          // logger.log(`Found document at ${doc.ref.path}`)
          const oppositeUser = doc.data()
          const matchingScore = calculateMatchScore(user, oppositeUser) // Calculate the matching score here
          matchScores[oppositeUser.id] = matchingScore
        })

        return { ...matchScores }
      })
      .catch((error) => {
        logger.error("Error getting matching users:", error)
      })

  if (matchScoresPromise === null) {
    return null
  }

  return matchScoresPromise
      .then((matchScores) => {
        let matchScoresJson

        try {
          matchScoresJson = JSON.parse(JSON.stringify(matchScores))
        } catch (error) {
          // If matchScores is not a valid JSON object, log an error and return null
          const message = { error, matchScores, matchScoresJson }
          logger.error("matchScores is not a valid JSON object:", message)
          return null
        }

        const matchScoresRef = getFirestore()
            .collection("matchScores")
            .doc(user.id)

        return getFirestore()
            .batch()
            .set(matchScoresRef, matchScoresJson)
            .commit()
      })
      .catch((error) => {
        logger.error("Error saving match scores:", error)
      })
})


/**
 * Updates the match scores for all opposite users in batches.

 * @param {string} userId The ID of the user whose match scores to update.
 */
// exports.updateMatchScores = onDocumentUpdated("/matchScores/{userId}", async (event) => {
//   // extract the user ID from the event params
//   const { userId } = event.params
//   // Get the match scores for this user
//   const matchScoresRef = db.collection("matchScores").doc(userId)
//   const matchScores = await matchScoresRef.get().then((document) => document.data())

//   // Update the match scores for all opposite users in batches
//   const batch = db.batch()

//   Object.keys(matchScores).forEach((oppositeUserId) => {
//     batch.update(`/matchScores/${oppositeUserId}/${userId}`, matchScores[oppositeUserId])
//   })

//   await batch.commit()
// })

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
  // Compare currentUser with oppositeUsers and calculate the score
  // For example, compare industries, businessStage, and other preferences
  return score
}
