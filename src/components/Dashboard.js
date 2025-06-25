import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import SendMoney from "./SendMoney";
import TransactionHistory from "./TransactionHistory";
import AdminPanel from "./AdminPanel";

const Dashboard = ({ user }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const userDoc = doc(db, "users", user.email);
      const snap = await getDoc(userDoc);
      if (snap.exists()) {
        setBalance(snap.data().balance);
      }
    };
    fetchBalance();
  }, [user]);

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      <h3>Your Balance: ₹{balance}</h3>
      <SendMoney user={user} />
      <TransactionHistory user={user} />
      <AdminPanel user={user} />
    </div>
  );
};

export default Dashboard;