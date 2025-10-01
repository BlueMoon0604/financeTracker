import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getUsersStore, persistUsersStore } from "../storage/users.js";

const router = Router();

function createToken(payload) {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "email and password required" });
  const users = await getUsersStore();
  if (users[email]) return res.status(409).json({ message: "User already exists" });
  const hash = await bcrypt.hash(password, 10);
  users[email] = { name: name || email.split("@")[0], passwordHash: hash };
  await persistUsersStore(users);
  const token = createToken({ sub: email, name: users[email].name });
  res.json({ token, user: { email, name: users[email].name } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  const users = await getUsersStore();
  const user = users[email];
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = createToken({ sub: email, name: user.name });
  res.json({ token, user: { email, name: user.name } });
});

export default router;


