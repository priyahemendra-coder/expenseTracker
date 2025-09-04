import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

// Mock Users
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" },
];

// Fake Auth
const login = (username, password) => {
  return users.find((u) => u.username === username && u.password === password);
};

const Dashboard = ({ role, expenses, addExpense }) => {
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard ({role})</h1>

      {role === "user" && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Expense Description"
            className="border p-2 mr-2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 mr-2"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
          />
          <button
            onClick={() => {
              addExpense({ desc, amt: parseFloat(amt), user: "user1" });
              setDesc("");
              setAmt("");
            }}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Add
          </button>
        </div>
      )}

      <h2 className="font-semibold mb-2">Expenses</h2>
      <table className="border w-full">
        <thead>
          <tr>
            <th className="border px-2">User</th>
            <th className="border px-2">Description</th>
            <th className="border px-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .filter((e) => role === "admin" || e.user === "user1")
            .map((e, idx) => (
              <tr key={idx}>
                <td className="border px-2">{e.user}</td>
                <td className="border px-2">{e.desc}</td>
                <td className="border px-2">₹{e.amt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={() => {
            const u = login(username, password);
            if (u) setUser(u);
            else alert("Invalid credentials");
          }}
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([
    { user: "user1", desc: "Lunch", amt: 200 },
    { user: "user1", desc: "Taxi", amt: 350 },
  ]);

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path="*" element={<Login setUser={setUser} />} />
        ) : (
          <Route
            path="*"
            element={
              <Dashboard
                role={user.role}
                expenses={expenses}
                addExpense={(e) => setExpenses([...expenses, e])}
              />
            }
          />
        )}
      </Routes>
    </Router>
  );
}
