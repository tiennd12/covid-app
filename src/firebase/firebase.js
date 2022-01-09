// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYJGZH9IGwRjOdlm13ZVlLP-k1waTZfDs",
    authDomain: "covid-app-5fc4f.firebaseapp.com",
    projectId: "covid-app-5fc4f",
    storageBucket: "covid-app-5fc4f.appspot.com",
    messagingSenderId: "506845253830",
    appId: "1:506845253830:web:c932dd81914459c0ee87c7",
    measurementId: "G-D3NBTDPDC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services

const db = getFirestore()
const auth = getAuth();
auth.languageCode = 'en';

// collection ref
const colRef = collection(db, "Users")
const loginRef = collection(db, "login")
const dataRef = collection(db, "userData")

// get collection data
const queryGetUserInfoByEmail = (email) => query(dataRef, where("email", "==", email))

export { app, db, colRef, loginRef, dataRef, auth, queryGetUserInfoByEmail };