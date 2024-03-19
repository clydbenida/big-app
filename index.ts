import express from "express";
import dotenv from "dotenv";
import rootRouter from "./src/routes";

dotenv.config();

const app = express();

app.use(express.json());

// API Routes
app.use("/api", rootRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
