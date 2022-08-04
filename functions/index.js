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
const currentDate = c.toISOString().slice(0, 10);

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

exports.injectionDataCheck = functions
    .region("asia-southeast1")
    .pubsub.schedule("00 07 * * *")
    .timeZone("Asia/Ho_Chi_Minh")
    .onRun(async(context) => {
        const users = firestore.collection("injectionData");
        const collectedData = firestore.collection("localStatData").get();
        //vaccination stat
        const group0 = await users
            .where("numberOfInjections", "==", "Chưa tiêm")
            .get();
        const group1 = await users.where("numberOfInjections", "==", "1 mũi").get();
        const group2 = await users.where("numberOfInjections", "==", "2 mũi").get();
        const group3 = await users.where("numberOfInjections", "==", "3 mũi").get();
        //
        //infection stat
        const infected = await users.where("isCurrentlyInfected", "==", true).get();
        const notInfected = await users.where("isCurrentlyInfected", "==", false).get();

        //
        const fetchArray = (await collectedData).docs.map((doc) => doc.data());
        let vaccinationStat = fetchArray[0].overview;
        let infectionStat = fetchArray[0].infectionStat;
        let userNotVaccinated = [];
        let userVaccinatedOnce = [];
        let userVaccinatedTwice = [];
        let userVaccinatedThreeTimes = [];
        group0.forEach(async(user) => {
            userNotVaccinated.push(user.data());
        });
        group1.forEach(async(user) => {
            userVaccinatedOnce.push(user.data());
        });
        group2.forEach(async(user) => {
            userVaccinatedTwice.push(user.data());
        });
        group3.forEach(async(user) => {
            userVaccinatedThreeTimes.push(user.data());
        });
        //infection stat
        let infectedCount = []
        let notInfectedCount = []
        infected.forEach(async(user) => {
            infectedCount.push(user.data())
        });
        notInfected.forEach(async(user) => {
            notInfectedCount.push(user.data())
        });

        const newData = {
            date: currentDate,
            userNotVaccinated: userNotVaccinated.length,
            userVaccinatedOnce: userVaccinatedOnce.length,
            userVaccinatedTwice: userVaccinatedTwice.length,
            userVaccinatedThreeTimes: userVaccinatedThreeTimes.length,
        };

        const infectionData = {
            date: currentDate,
            userInfected: infectedCount.length,
            userNotInfected: notInfectedCount.length,
            totalUser: infectedCount.length + notInfectedCount.length

        }

        if (vaccinationStat.length === 5) {
            vaccinationStat.shift();
            vaccinationStat.push(newData);
        } else {
            vaccinationStat.push(newData);
        }

        if (infectionStat.length === 5) {
            infectionStat.shift();
            infectionStat.push(infectionData);
        } else {
            infectionStat.push(infectionData);
        }

        const data = {
            overview: vaccinationStat,
            infectionStat: infectionStat,
        };



        await firestore.collection("localStatData").doc("data").set(data);

        functions.logger.info(
            userNotVaccinated,
            userNotVaccinated.length,
            fetchArray[0].overview,
            data
        );
        return null;
    });

// exports.infectionDataCheck = functions
// .region("asia-southeast1")
// .pubsub.schedule("00 07 * * *")
// .timeZone("Asia/Ho_Chi_Minh")
// .onRun(async(context) => {
//     const users = firestore.collection("injectionData");
//     const vaccinated = await users.where("vaccinated", "==", "true").get();
//     const notVaccinated = await users.where("vaccinated", "==", "false").get();
//     let vaccinatedCount = []
//     let notVaccinatedCount = []
//     vaccinated.forEach(async (user) => {
//         vaccinatedCount.push(user.data())
//     });
//     notVaccinated.forEach(async(user) => {
//         notVaccinatedCount.push(user.data())
//     });
// })