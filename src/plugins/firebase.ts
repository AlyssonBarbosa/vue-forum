import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/config/firebase";
import { getAuth } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
console.log(firebaseConfig);
const db = getFirestore(firebase);

const auth = getAuth();

export { db, auth };
