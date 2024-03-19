import express from "express";

const authRoutes = express.Router();

authRoutes.use("/", (req, res) => {
  res.send("This is auth route");
});

export default authRoutes;
