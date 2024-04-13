import express from "express";
import authRoutes from "./authRoutes";
import sellerRouter from "./sellerRoutes";
import { validateAccessToken } from "../middleware/validateToken";

const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/seller", validateAccessToken, sellerRouter)

export default rootRouter;
