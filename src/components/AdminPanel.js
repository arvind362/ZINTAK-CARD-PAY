import React, { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ADMIN_EMAIL = "a5859606162@gmail.com";

const AdminPanel = ({ user }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  if (user.email !== ADMIN_EMAIL) return null;

  const updateBalance = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      setMessage("User not found!");
      return;
    }
    await updateDoc(userRef, { balance: Number(amount) });
    setMessage("Balance updated!");
  };

  return (
    <div>
      <h3>Admin Panel</h3>
      <form onSubmit={updateBalance}>
        <input placeholder="User Gmail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="number" placeholder="New Balance" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Update Balance</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default AdminPanel;
