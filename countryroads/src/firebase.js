import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDDNuEY2_-o1st2t2lqDEfmJOsKrRJ_iYM",
  authDomain: "driveways-887ac.firebaseapp.com",
  projectId: "driveways-887ac",
  storageBucket: "driveways-887ac.appspot.com",
  messagingSenderId: "243889726602",
  appId: "1:243889726602:web:a78dcb8eadea85d0c07973",
  measurementId: "G-DKV5S85NXE"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }