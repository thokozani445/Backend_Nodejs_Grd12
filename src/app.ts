import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.json({ msg: "🎓 Grade12 Backend running 🚀" }));
app.use("/api", router);

export default app;