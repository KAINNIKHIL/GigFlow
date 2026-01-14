import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [search]);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Open Gigs</h1>

        <Link
          to="/create-gig"
          className="mt-3 md:mt-0 inline-block bg-teal-500 text-white px-4 py-2 rounded font-semibold hover:bg-teal-600 transition"
        >
          + Create Gig
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search gigs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2 border rounded focus:ring-2 focus:ring-teal-400 outline-none"
      />

      {/* Gigs Grid */}
      {gigs.length === 0 ? (
        <p className="text-gray-500 text-center">No gigs found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {gig.title}
              </h2>

              <p className="mt-2 text-gray-600">
                Budget: <span className="font-semibold">₹{gig.budget}</span>
              </p>

              <button
                onClick={() => navigate(`/gigs/${gig._id}`)}
                className="mt-4 w-full bg-teal-500 text-white py-2 rounded font-semibold hover:bg-teal-600 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
