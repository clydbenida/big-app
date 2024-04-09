import express, { Request, Response } from "express";
import { validateAccessToken } from "../middleware/validateToken";

const sellerRouter = express.Router();

sellerRouter.get('/', validateAccessToken, (req: Request, res: Response) => {
  res.send("Successfully connected seller route!")
})

export default sellerRouter;
