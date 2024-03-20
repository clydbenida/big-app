import express from "express";
import dotenv from "dotenv";
import rootRouter from "./src/routes";
import { gracefulShutdown, testConnection } from "./src/config/db";

dotenv.config();

const app = express();

app.use(express.json());

// API Routes
app.use("/api", rootRouter);

// Listen for termination signals
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await testConnection();
  console.log(`Listening on PORT: ${PORT}`);
});
