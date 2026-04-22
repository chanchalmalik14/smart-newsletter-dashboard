import { useState } from "react";
import axios from "axios";

export default function AddUser({ refresh }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) return;

    try {
      await axios.post("http://127.0.0.1:5000/signup", { email });
      setEmail("");
      refresh(); // refresh users list
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex gap-2">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}