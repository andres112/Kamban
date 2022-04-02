import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore"; //collection, getDocs, addDoc, deleteDoc, updateDoc, setDoc, doc
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"; // signInWithPopup, signInWithRedirect  // createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Ar1-1rLoQvBqYTUQllAJbbckD4KLEw8",
  authDomain: "kamban-be184.firebaseapp.com",
  projectId: "kamban-be184",
  storageBucket: "kamban-be184.appspot.com",
  messagingSenderId: "181241737653",
  appId: "1:181241737653:web:48377267532698524b69fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); // singleton for db
const auth = getAuth(); // singleton for auth
const provider = new GoogleAuthProvider(); // singleton for GoogleAuthProvider
const timestamp = serverTimestamp(); // singleton for timestamp

const storage = getStorage(app); // singleton for storage

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
        unsubscribe();
      },
      reject
    );
  });
};

export { db, auth, provider, timestamp, currentUser, storage };
