import "dotenv/config";
import express from "express";
import cors from "cors";
import api from "./routes";
import { assertDbConnection } from "./db";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/api", api);

const port = Number(process.env.PORT || 8000);

(async () => {
  try {
    await assertDbConnection();
    console.log("Database connected");
    app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
})();
