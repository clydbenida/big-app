import express from "express";
import authRoutes from "./authRoutes";

const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);

export default rootRouter;
