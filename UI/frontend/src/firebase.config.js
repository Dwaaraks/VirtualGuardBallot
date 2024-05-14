// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYIB0RKLOlFHoEgDKgjPXz6O5Zs0pZfG8",
  authDomain: "voting-7d8b2.firebaseapp.com",
  projectId: "voting-7d8b2",
  storageBucket: "voting-7d8b2.appspot.com",
  messagingSenderId: "902855763918",
  appId: "1:902855763918:web:d3b2c87e7af0e999db6d9f",
  measurementId: "G-6FZM3GYME0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
