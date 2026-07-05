import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { films as seedFilms } from "@/data/films";
import { supportPacks as seedSupportPacks } from "@/data/support-packs";
import type { Film } from "@/types/film";
import type { SupportPack } from "@/types/support-pack";

const storageDirectory = path.join(process.cwd(), "storage");

async function readMockCollection<T>(fileName: string, fallback: T[]) {
  try {
    return JSON.parse(
      await readFile(path.join(storageDirectory, fileName), "utf8"),
    ) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return fallback;
  }
}

/** Source publique temporaire, en lecture seule, jusqu'à la connexion WordPress. */
export function getMockFilms() {
  return readMockCollection<Film>("films.json", seedFilms);
}

/** Source publique temporaire, en lecture seule, jusqu'à la connexion WooCommerce. */
export function getMockSupportPacks() {
  return readMockCollection<SupportPack>(
    "support-packs.json",
    seedSupportPacks,
  );
}
