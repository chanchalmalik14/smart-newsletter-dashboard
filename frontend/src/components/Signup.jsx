import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // ✅ inside component

  const handleSubmit = async () => {
    if (!email) return;

    try {
      await axios.post("http://localhost:5000/signup", { email });
      alert("Subscribed successfully 🎉");

      navigate("/dashboard"); // ✅ redirect
    } catch (err) {
  console.log(err);

  if (err.response) {
    alert(err.response.data.message);
  } else {
    alert("Server not reachable");
  }
}
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}