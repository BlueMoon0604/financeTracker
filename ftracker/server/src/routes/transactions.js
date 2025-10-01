import { Router } from "express";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { getTransactionsStore, persistTransactionsStore } from "../storage/transactions.js";

const router = Router();

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    req.user = { email: payload.sub, name: payload.name };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.use(requireAuth);

router.get("/", async (req, res) => {
  const { email } = req.user;
  const store = await getTransactionsStore(email);
  res.json(store);
});

router.post("/", async (req, res) => {
  const { email } = req.user;
  const store = await getTransactionsStore(email);
  const { description, amount, category, date } = req.body || {};
  if (!description || typeof amount !== "number" || !category || !date) {
    return res.status(400).json({ message: "Invalid payload" });
  }
  const newTx = { id: nanoid(), description, amount, category, date };
  store.push(newTx);
  await persistTransactionsStore(email, store);
  res.status(201).json(newTx);
});

router.put("/:id", async (req, res) => {
  const { email } = req.user;
  const store = await getTransactionsStore(email);
  const idx = store.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  const update = req.body || {};
  store[idx] = { ...store[idx], ...update, id: store[idx].id };
  await persistTransactionsStore(email, store);
  res.json(store[idx]);
});

router.delete("/:id", async (req, res) => {
  const { email } = req.user;
  const store = await getTransactionsStore(email);
  const idx = store.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  const [removed] = store.splice(idx, 1);
  await persistTransactionsStore(email, store);
  res.json(removed);
});

export default router;


