import api from "../api/axios";

export default function BidList({ bids, gigId, refreshBids }) {
  const handleHire = async (bidId) => {
    try {
     
      await api.patch(`/hire/${bidId}/hire`);
      alert("Freelancer hired!");
      
     
      if (refreshBids) {
        refreshBids(gigId);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error hiring");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Bids</h2>
      {bids.length === 0 && <p>No bids yet.</p>}
      {bids.map((bid) => (
        <div
          key={bid._id}
          className="border p-3 rounded mb-2 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{bid.bidderId?.name}</p>
            <p>${bid.price}</p>
            <p>{bid.message}</p>
            <p>Status: {bid.status}</p>
          </div>
          {bid.status === "pending" && (
            <button
              onClick={() => handleHire(bid._id)}
              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
            >
              Hire
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
