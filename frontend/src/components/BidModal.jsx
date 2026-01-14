import { useState } from "react";
import api from "../api/axios";

export default function BidModal({ gigId, close }) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/bids", { gigId, message, price });
      close();
    } catch (err) {
      alert(err.response?.data?.message || "Error placing bid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg border"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Place a Bid</h2>
          <button
            type="button"
            onClick={close}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Proposal Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none resize-none"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Bid Amount (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none"
            required
          />
        </div>

        {/* Actions */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded font-semibold text-white transition ${
            loading
              ? "bg-teal-300 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit Bid"}
        </button>

        <button
          type="button"
          onClick={close}
          className="mt-3 w-full py-2 rounded border text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
