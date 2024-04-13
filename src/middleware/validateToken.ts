import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { extractAccessToken } from "../helpers/utils";

dotenv.config();

export function validateAccessToken (req: Request, res: Response, next: NextFunction) {
  try { 
    const accessToken: string = extractAccessToken(req);
    jwt.verify(accessToken, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Invalid Access Token" })
  }
}
