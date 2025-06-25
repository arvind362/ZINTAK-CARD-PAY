import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDunc9TKq7xglt3GsCMaUOjEmofURc7I3I",
  authDomain: "zintak-card-pay-371eb.firebaseapp.com",
  projectId: "zintak-card-pay-371eb",
  storageBucket: "zintak-card-pay-371eb.appspot.com",
  messagingSenderId: "957358205169",
  appId: "1:957358205169:web:81ae0941ff1d8a7b972150",
  measurementId: "G-EQ1F381XR4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);