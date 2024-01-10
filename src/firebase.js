import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAFgojbu75bfJf2wYEnvJjjFa4N1jdIAtI",
  authDomain: "project2-707d2.firebaseapp.com",
  databaseURL: "https://project2-707d2-default-rtdb.firebaseio.com",
  projectId: "project2-707d2",
  storageBucket: "project2-707d2.appspot.com",
  messagingSenderId: "588410843051",
  appId: "1:588410843051:web:4ff9e5ccaa4b67aef52cee",
  measurementId: "G-EW7FDTH4D1"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



