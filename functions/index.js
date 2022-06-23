const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });

// const functions = require("firebase-functions");
const firebase = require("firebase-admin");
firebase.initializeApp()
var firestore = firebase.firestore()

exports.injectionDateCheck = functions.pubsub
    .schedule("00 07 * * *")
    .onRun(async(context) => {
        functions.logger.info("Hello logs!");
        // const users = firestore.collection('users')
        // const user = await users.where('isPayingUser', '==', false).get()
        // user.forEach(snapshot => {
        //     snapshot.ref.update({ credits: 10 })
        // })
        return null;
    })