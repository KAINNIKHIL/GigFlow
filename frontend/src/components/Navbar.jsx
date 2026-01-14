import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Bell } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
  api.get("/notifications")
    .then(res => setNotifications(res.data))
    .catch(console.log);
}, []);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true
    });

    api.get("/auth/me")
      .then(({ data }) => {
        if (data.user?.id) {
          socket.emit("join", data.user.id);
        }
      })
      .catch(console.log);

    socket.on("notification", (notif) => {
  setNotifications(prev => [notif, ...prev]);
});



    return () => socket.disconnect();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/");
  };

  const markAllRead = async () => {
  await api.patch("/notifications/read-all");
  setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
};


  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/gigs" className="text-2xl font-bold text-teal-600">
        GigFlow
      </Link>

      {/* Right Actions */}
      <div className="flex items-center gap-6 relative">
        
        {/* Notification Bell */}
        <button
          onClick={() => {
            setShowDropdown(!showDropdown);
            markAllRead();
          }}
          className="relative"
        >
          <Bell className="w-6 h-6 text-gray-700" />

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-14 top-10 w-72 bg-white border rounded shadow-lg z-50">
            <div className="p-3 font-semibold border-b">
              Notifications
            </div>

            {notifications.length === 0 ? (
              <p className="p-3 text-sm text-gray-500">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
  key={n._id}
  onClick={() => navigate(`/gigs/${n.gigId}`)}
  className={`p-3 text-sm border-b cursor-pointer ${!n.isRead ? "bg-gray-100" : ""}`}
>
  {n.message}
</div>

              ))
            )}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-teal-500 text-white px-4 py-2 rounded font-semibold hover:bg-teal-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
