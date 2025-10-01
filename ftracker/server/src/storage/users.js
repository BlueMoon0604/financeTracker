import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, "../../data");
const usersFile = join(dataDir, "users.json");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(usersFile);
  } catch {
    await fs.writeFile(usersFile, JSON.stringify({}, null, 2));
  }
}

export async function getUsersStore() {
  await ensureDataDir();
  const raw = await fs.readFile(usersFile, "utf-8");
  return JSON.parse(raw || "{}");
}

export async function persistUsersStore(store) {
  await ensureDataDir();
  await fs.writeFile(usersFile, JSON.stringify(store, null, 2));
}


