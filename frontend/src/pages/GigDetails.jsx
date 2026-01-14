import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import BidModal from "../components/BidModal";
import BidList from "../components/BidList";

export default function GigDetails() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [showBidModal, setShowBidModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meRes = await api.get("/auth/me");
        setCurrentUserId(meRes.data.id);

        const gigRes = await api.get(`/gigs/${id}`);
        setGig(gigRes.data);

        if (meRes.data.id === gigRes.data.ownerId.toString()) {
          const bidsRes = await api.get(`/bids/${id}`);
          setBids(bidsRes.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  if (!gig)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  const isOwner = currentUserId === gig.ownerId.toString();

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto bg-white border rounded-xl p-6 shadow-sm">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {gig.title}
        </h1>

        <p className="text-gray-600 mb-4">{gig.description}</p>

        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-semibold text-gray-800">
            Budget: ₹{gig.budget}
          </span>

          {gig.status === "open" && (
            <span className="px-3 py-1 text-sm rounded-full bg-teal-100 text-teal-700">
              Open
            </span>
          )}
        </div>

        {/* Action */}
        {!isOwner && gig.status === "open" && (
          <button
            onClick={() => setShowBidModal(true)}
            className="bg-teal-500 text-white px-6 py-2 rounded font-semibold hover:bg-teal-600 transition"
          >
            Place Bid
          </button>
        )}

        {/* Owner View */}
        {isOwner && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Bids Received
            </h2>
            <BidList
              bids={bids}
              gigId={gig._id}
              refreshBids={() =>
                api.get(`/bids/${id}`).then((res) => setBids(res.data))
              }
            />
          </div>
        )}
      </div>

      {showBidModal && (
        <BidModal gigId={gig._id} close={() => setShowBidModal(false)} />
      )}
    </div>
  );
}
