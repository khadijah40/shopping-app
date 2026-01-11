// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth");
const fashionChatRoutes = require("./routes/fashionChat");

// Load environment variables

const app = express();

// Middleware
app.use(cors()); // Allows frontend to make requests
app.use(express.json()); // Parses JSON request bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/ai", fashionChatRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Fashion App Backend is running!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
