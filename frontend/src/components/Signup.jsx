import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success | error

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      setStatus("error");
      setMessage("Please enter an email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://127.0.0.1:5000/signup", { email });

      setStatus("success");
      setMessage("Subscribed successfully 🎉");

      setEmail("");

      // redirect after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.log(err);

      setStatus("error");
      setMessage(err.response?.data?.message || "Server not reachable");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Subscribe"}
        </button>

        {/* ✅ Message UI */}
        {message && (
          <p
            className={`mt-4 text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}