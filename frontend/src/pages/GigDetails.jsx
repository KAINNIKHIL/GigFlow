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

  if (!gig) return <p>Loading...</p>;

  const isOwner = currentUserId === gig.ownerId.toString();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{gig.title}</h1>
      <p className="mb-2">{gig.description}</p>
      <p className="mb-4">Budget: ${gig.budget}</p>

      {!isOwner && gig.status === "open" && (
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => setShowBidModal(true)}
        >
          Place Bid
        </button>
      )}

      {isOwner && (
        <BidList
          bids={bids}
          gigId={gig._id}
          refreshBids={() =>
            api.get(`/bids/${id}`).then(res => setBids(res.data))
          }
        />
      )}

      {showBidModal && (
        <BidModal gigId={gig._id} close={() => setShowBidModal(false)} />
      )}
    </div>
  );
}
