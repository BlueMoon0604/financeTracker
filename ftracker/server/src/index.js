import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import authRouter from "./routes/auth.js";
import txRouter from "./routes/transactions.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/transactions", txRouter);

// Serve static JSON storage directory for troubleshooting (dev only)
if ((process.env.NODE_ENV || "development") === "development") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  app.use("/data", express.static(join(__dirname, "../data")));
}

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});


