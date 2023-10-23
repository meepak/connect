/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/**
 * Connect-411 Function to assign match scores to users
 */

// [START all]
// [START import]
// const { logger } = require("firebase-functions")
// const { onRequest } = require("firebase-functions/v2/https")
const functions = require("firebase-functions")
// The Firebase Admin SDK to access Firestore.
const { admin } = require("firebase-admin")
// [END import]

admin.initializeApp()
const db = admin.firestore()
const fn = functions.firestore()

// Listens for users info updated to /users/:userId
// and calculates the match score of this user against all other users
exports.calculateMatchScores = fn.onDocumentUpdated("/users/{userId}", (event) => {
  // Grab the current value of what was written to Firestore.
  const user = event.data.data()

  if (!user || !user.whoAmI) {
    return null // User type or data not available, exit
  }

  const oppositeUserType = (user.whoAmI === "founder") ? "associate" : "founder"
  const oppositeUsersRef = db.ref("/users")
      .orderByChild("whoAmI")
      .equalTo(oppositeUserType)
      // .orderByChild("updatedAt")

  // Calculate the match score of this user against all opposite users
  // and store the results in a temporary variable
  const matchScores = {}

  return oppositeUsersRef.once("value").then((snapshot) => {
    const oppositeUsers = snapshot.val()

    if (!oppositeUsers) {
      return null
    }

    Object.keys(oppositeUsers).forEach((oppositeUserId) => {
      const oppositeUser = oppositeUsers[oppositeUserId]
      const matchingScore = calculateMatchScore(user, oppositeUser)
      matchScores[oppositeUserId] = matchingScore
    })

    // Trigger the function that will update the match scores in batches
    return db.collection("matchScores").doc(user.id).set(matchScores)
  })
})

/**
 * Updates the match scores for all opposite users in batches.

 * @param {string} userId The ID of the user whose match scores to update.
 */
// exports.updateMatchScores = fn.onDocumentUpdated("/matchScores/{userId}", async (event) => {
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


// [START calculateMatchScore]
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
// [END calculateMatchScore]

// [END all]
