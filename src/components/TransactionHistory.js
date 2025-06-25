import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const TransactionHistory = ({ user }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTx = async () => {
      const q1 = query(
        collection(db, "transactions"),
        where("from", "==", user.email),
        orderBy("time", "desc")
      );
      const q2 = query(
        collection(db, "transactions"),
        where("to", "==", user.email),
        orderBy("time", "desc")
      );
      let txs = [];
      const snap1 = await getDocs(q1);
      const snap2 = await getDocs(q2);
      snap1.forEach((doc) => txs.push({ id: doc.id, ...doc.data(), type: "Sent" }));
      snap2.forEach((doc) => txs.push({ id: doc.id, ...doc.data(), type: "Received" }));
      setTransactions(txs.sort((a, b) => (b.time?.seconds || 0) - (a.time?.seconds || 0)));
    };
    fetchTx();
  }, [user]);

  return (
    <div>
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {tx.type === "Sent" ? `To: ${tx.to}` : `From: ${tx.from}`} | Amount: {tx.amount} | {tx.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;