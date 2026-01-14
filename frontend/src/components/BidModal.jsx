import { useState } from "react";
import api from "../api/axios";

export default function BidModal({ gigId, close }) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bids", { gigId, message, price });
      alert("Bid placed!");
      close();
    } catch (err) {
      alert(err.response?.data?.message || "Error placing bid");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Place a Bid</h2>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit Bid
        </button>
        <button
          type="button"
          onClick={close}
          className="mt-2 w-full border py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
