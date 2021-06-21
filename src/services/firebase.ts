import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtCu9mqwZ--7-hsneTjQEb_MDGbRY91lY",
  authDomain: "letmeask-76f0b.firebaseapp.com",
  databaseURL: "https://letmeask-76f0b-default-rtdb.firebaseio.com",
  projectId: "letmeask-76f0b",
  storageBucket: "letmeask-76f0b.appspot.com",
  messagingSenderId: "753379859749",
  appId: "1:753379859749:web:863657ca78cbde798c4ecc",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();
