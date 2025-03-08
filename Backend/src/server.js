require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");
connectDB(); // Connect to MongoDB

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
