import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, "../../data");

function fileFor(email) {
  const safe = email.replace(/[^a-zA-Z0-9_.-]/g, "_");
  return join(dataDir, `tx_${safe}.json`);
}

async function ensureDataDir(email) {
  await fs.mkdir(dataDir, { recursive: true });
  const f = fileFor(email);
  try {
    await fs.access(f);
  } catch {
    await fs.writeFile(f, JSON.stringify([], null, 2));
  }
}

export async function getTransactionsStore(email) {
  await ensureDataDir(email);
  const raw = await fs.readFile(fileFor(email), "utf-8");
  return JSON.parse(raw || "[]");
}

export async function persistTransactionsStore(email, store) {
  await ensureDataDir(email);
  await fs.writeFile(fileFor(email), JSON.stringify(store, null, 2));
}


