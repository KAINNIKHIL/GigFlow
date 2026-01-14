import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      socket.emit("join", res.data.user.id);
      navigate("/gigs");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Log in to Gigflow
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-400 outline-none"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-400 outline-none pr-16"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-sm text-teal-600 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded font-semibold text-white transition ${
            loading
              ? "bg-teal-300 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
