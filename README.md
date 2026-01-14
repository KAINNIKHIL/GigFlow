GigFlow – Freelancing Platform (Real-Time Notifications)

GigFlow is a freelancing marketplace where clients post gigs and freelancers bid on them.
The platform supports real-time notifications using Socket.IO and React Context API for global state management.

Features

🔐 User Authentication (Login / Register)

📄 Create & Browse Gigs

💰 Bid on Gigs

🔔 Real-Time Notifications (New bids, updates)

🧠 Global User & Notification State (Context API)

📡 Socket.IO based live updates

🎨 Clean UI (White + Teal theme)

🛠 Tech Stack
Frontend

React

React Router

Axios

Tailwind CSS

Socket.IO Client

Context API

Backend

Node.js

Express.js

MongoDB + Mongoose

Socket.IO

JWT / Cookie-based Auth



src/
│
├── api/
│   └── axios.js
│
├── context/
│   └── UserContext.jsx   # User + Notification global state
│
├── components/
│   └── Navbar.jsx        # Notification bell & dropdown
│
├── pages/
│   ├── Gigs.jsx
│   ├── GigDetails.jsx
│   ├── CreateGig.jsx
│   └── Login.jsx
│
└── App.jsx


Future Improvements

✅ Notification types (bid accepted, gig closed)

🔕 Mark single notification as read

📱 Mobile responsive UI

📨 Email notifications

🟢 Online status indicator

Backend Setup
cd backend
npm install
npx nodemon src/server.js

Frontend Setup
cd frontend
npm install
npm run dev