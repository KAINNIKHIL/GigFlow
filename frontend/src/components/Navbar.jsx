import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:5000", { withCredentials: true });

    // Fetch logged-in user
    api.get("/auth/me")
      .then(({ data }) => {
        if (data.user?.id) {
          socket.emit("join", data.user.id);
        }
      })
      .catch(console.log);

    // Listen for bid notifications
    socket.on("new-bid", (bid) => {
      alert(`New bid on your gig! $${bid.price} from ${bid.bidderId.name}`);
      // Optionally: update gig details/bids automatically
    });

    return () => socket.disconnect();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">GigFlow</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
