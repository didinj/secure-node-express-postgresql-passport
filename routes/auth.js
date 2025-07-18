import express from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport.js";
import db from "../models/index.js";
const { User } = db;
import { hashPassword, comparePassword } from "../utils/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await hashPassword(password);
  const user = await User.create({ username, password: hashed });
  res.json({ id: user.id, username: user.username });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !await comparePassword(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  res.json({ token });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, username: req.user.username });
  }
);

export default router;
