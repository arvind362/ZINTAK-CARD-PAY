import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);

    // Create user in db if not exists
    const userDoc = doc(db, "users", result.user.email);
    const userSnap = await getDoc(userDoc);
    if (!userSnap.exists()) {
      await setDoc(userDoc, {
        email: result.user.email,
        name: result.user.displayName,
        balance: 0,
      });
    }
  };

  return (
    <div>
      <h2>ZINTAK CARD PAY</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;