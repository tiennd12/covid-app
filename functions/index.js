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
// const { db } = require("../src/firebase/firebase");
firebase.initializeApp();
var firestore = firebase.firestore();
const d = new Date();
d.setDate(d.getDate() + 2);
const timedDate = d.toISOString().slice(0, 10);
const c = new Date();
const currentDate = c.toString();

exports.injectionDateCheck1 = functions
    .region("asia-southeast1")
    .pubsub.schedule("00 07 * * *")
    .timeZone("Asia/Ho_Chi_Minh")
    .onRun(async(context) => {
        functions.logger.info("Hello logs1!", currentDate);
        const users = firestore.collection("injectionData");
        const user = await users.where("appointmentDate", "==", timedDate).get();
        const mail = firestore.collection("mail");
        user.forEach((doc) => {
            functions.logger.info("Hello logs2!", doc.data().email, timedDate);
            const setDocument = async(db) => {
                const data = {
                    to: doc.data().email,
                    message: {
                        text: "Test message",
                        subject: "This is an automated email",
                    },
                };
                await db.doc().set(data);
            };
            setDocument(mail);
        });
        return null;
    });