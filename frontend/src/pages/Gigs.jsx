import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Wrap async inside the effect
    const fetchGigs = async () => {
      try {
        const res = await api.get("/gigs", {
          params: search ? { search } : {}
        });
        setGigs(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGigs();
  }, [search]); // only runs when search changes

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Open Gigs</h1>

      <input
        type="text"
        placeholder="Search gigs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gigs.map((gig) => (
          <div key={gig._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{gig.title}</h2>
            <p className="mt-2">Budget: ${gig.budget}</p>
            <button
              onClick={() => navigate(`/gigs/${gig._id}`)}
              className="mt-3 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <Link
  to="/create-gig"
  className="inline-block mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
  + Create Gig
</Link>
    </div>
  );
}
