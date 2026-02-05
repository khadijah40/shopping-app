// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth");
const fashionChatRoutes = require("./routes/fashionChat");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://shopping-app-chi-seven.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());

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

app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working!",
    timestamp: new Date(),
  });
});

// Start server locally (not on Vercel)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
