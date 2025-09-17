import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDB } from "./db";
import router from "./routes";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Welcome
app.get("/", (_, res) => {
  res.json({ msg: "Welcome to Grade 12 Backend 🚀" });
});

// API routes
app.use("/api", router);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Test DB connection
testDB();