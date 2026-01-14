import api from "../api/axios";

export default function BidList({ bids, gigId, refreshBids }) {
  const handleHire = async (bidId) => {
    try {
      await api.patch(`/hire/${bidId}/hire`);
      refreshBids?.(gigId);
    } catch (err) {
      alert(err.response?.data?.message || "Error hiring freelancer");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Bids Received
      </h2>

      {bids.length === 0 && (
        <p className="text-gray-500">No bids yet.</p>
      )}

      <div className="space-y-4">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="border rounded-xl p-4 shadow-sm flex justify-between items-start"
          >
            {/* Bid Info */}
            <div>
              <p className="font-semibold text-gray-800">
                {bid.bidderId?.name || "Freelancer"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {bid.message}
              </p>

              <p className="mt-2 font-semibold text-teal-600">
                ₹{bid.price}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                  bid.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {bid.status}
              </span>
            </div>

            {/* Action */}
            {bid.status === "pending" && (
              <button
                onClick={() => handleHire(bid._id)}
                className="bg-teal-500 text-white px-4 py-2 rounded font-semibold hover:bg-teal-600 transition"
              >
                Hire
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
