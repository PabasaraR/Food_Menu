import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUxJD4SfH-uDSTytrPjxWABxVzbU5WK6M",
  authDomain: "menu-d4436.firebaseapp.com",
  projectId: "menu-d4436",
  storageBucket: "menu-d4436.appspot.com",
  messagingSenderId: "92222274551",
  appId: "1:92222274551:web:38dbfd35ef54b284abccf2",
  measurementId: "G-DJPXV73KML",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
