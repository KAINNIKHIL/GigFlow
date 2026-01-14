import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/gigs", { title, description, budget });
      navigate("/gigs");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Create a Gig
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Gig Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Budget (₹)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
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
            {loading ? "Creating..." : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
}
