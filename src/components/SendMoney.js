import React, { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMoney = ({ user }) => {
  const [toEmail, setToEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const sendMoney = async (e) => {
    e.preventDefault();
    if (!toEmail || !amount || Number(amount) <= 0) return;

    const fromDocRef = doc(db, "users", user.email);
    const toDocRef = doc(db, "users", toEmail);

    const fromSnap = await getDoc(fromDocRef);
    const toSnap = await getDoc(toDocRef);

    if (!toSnap.exists()) {
      setMessage("Recipient not found!");
      return;
    }

    if (fromSnap.data().balance < Number(amount)) {
      setMessage("Insufficient balance!");
      return;
    }

    // Deduct from sender
    await updateDoc(fromDocRef, { balance: fromSnap.data().balance - Number(amount) });
    // Add to receiver
    await updateDoc(toDocRef, { balance: toSnap.data().balance + Number(amount) });

    // Save transaction
    await addDoc(collection(db, "transactions"), {
      from: user.email,
      to: toEmail,
      amount: Number(amount),
      time: serverTimestamp(),
    });

    setMessage("Money sent!");
  };

  return (
    <div>
      <h3>Send Money</h3>
      <form onSubmit={sendMoney}>
        <input placeholder="Recipient Gmail" value={toEmail} onChange={(e) => setToEmail(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default SendMoney;