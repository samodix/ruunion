import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { films as seedFilms } from "@/data/films";
import { supportPacks as seedPacks } from "@/data/support-packs";
import type { Film, FilmInput } from "@/types/film";
import type { SupportPack, SupportPackInput } from "@/types/support-pack";

const storageDirectory = path.join(process.cwd(), "storage");
const filmsFile = path.join(storageDirectory, "films.json");
const packsFile = path.join(storageDirectory, "support-packs.json");

async function readCollection<T>(file: string, seed: T[]): Promise<T[]> {
  await mkdir(storageDirectory, { recursive: true });
  try {
    return JSON.parse(await readFile(file, "utf8")) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    await writeCollection(file, seed);
    return seed;
  }
}

async function writeCollection<T>(file: string, data: T[]) {
  await mkdir(storageDirectory, { recursive: true });
  const temporaryFile = `${file}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rename(temporaryFile, file);
}

export async function getFilms() {
  return readCollection<Film>(filmsFile, seedFilms);
}

export async function getFilmById(id: string) {
  return (await getFilms()).find((film) => film.id === id) ?? null;
}

export async function getFilmBySlug(slug: string) {
  return (await getFilms()).find((film) => film.slug === slug) ?? null;
}

export async function createFilm(data: FilmInput) {
  const films = await getFilms();
  const timestamp = new Date().toISOString();
  const film: Film = {
    ...data,
    id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await writeCollection(filmsFile, [...films, film]);
  return film;
}

export async function updateFilm(id: string, data: FilmInput) {
  const films = await getFilms();
  const index = films.findIndex((film) => film.id === id);
  if (index < 0) return null;
  const film: Film = {
    ...films[index],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };
  films[index] = film;
  await writeCollection(filmsFile, films);
  return film;
}

export async function deleteFilm(id: string) {
  const films = await getFilms();
  const nextFilms = films.filter((film) => film.id !== id);
  if (nextFilms.length === films.length) return false;
  await writeCollection(filmsFile, nextFilms);
  return true;
}

export async function getSupportPacks() {
  return readCollection<SupportPack>(packsFile, seedPacks);
}

export async function getSupportPackById(id: string) {
  return (await getSupportPacks()).find((pack) => pack.id === id) ?? null;
}

export async function getSupportPackBySlug(slug: string) {
  return (await getSupportPacks()).find((pack) => pack.slug === slug) ?? null;
}

export async function createSupportPack(data: SupportPackInput) {
  const packs = await getSupportPacks();
  const timestamp = new Date().toISOString();
  const pack: SupportPack = {
    ...data,
    id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await writeCollection(packsFile, [...packs, pack]);
  return pack;
}

export async function updateSupportPack(id: string, data: SupportPackInput) {
  const packs = await getSupportPacks();
  const index = packs.findIndex((pack) => pack.id === id);
  if (index < 0) return null;
  const pack: SupportPack = {
    ...packs[index],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };
  packs[index] = pack;
  await writeCollection(packsFile, packs);
  return pack;
}

export async function deleteSupportPack(id: string) {
  const packs = await getSupportPacks();
  const nextPacks = packs.filter((pack) => pack.id !== id);
  if (nextPacks.length === packs.length) return false;
  await writeCollection(packsFile, nextPacks);
  return true;
}
