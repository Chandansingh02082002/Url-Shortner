import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import linksRoutes from "./routes/links.js";
import { redirect } from "./controllers/linksController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Healthcheck
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// API
app.use("/api/links", linksRoutes);

// Redirect logic (must be last)
app.get("/:code", redirect);

app.listen(process.env.PORT, () => {
  console.log("Backend running on port", process.env.PORT);
});
