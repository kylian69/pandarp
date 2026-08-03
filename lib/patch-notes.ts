import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const NOTES_DIR = path.join(process.cwd(), "content", "patch-notes");

export type PatchNote = {
  /** Numéro de version, tel qu'annoncé aux joueurs (ex. « 0.9.0 »). */
  version: string;
  date: string;
  title: string;
  /** Catégories du lot : Ajout, Correctif, Équilibrage… */
  tags: string[];
  /** Identifiant d'ancre, pour pointer une version précise depuis Discord. */
  anchor: string;
  html: string;
};

/**
 * « 0.9.0 » → « v0-9-0 ». Les points ne sont pas des caractères d'ancre
 * fiables : ils obligent à échapper le sélecteur en CSS et en JavaScript.
 */
function toAnchor(version: string) {
  return `v${version.replace(/\./g, "-")}`;
}

/**
 * Compare deux numéros de version segment par segment, en numérique.
 * Un tri alphabétique placerait « 0.10.0 » avant « 0.9.0 ».
 */
function compareVersions(a: string, b: string) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pb[i] ?? 0) - (pa[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/** Toutes les notes de version, de la plus récente à la plus ancienne. */
export async function getPatchNotes(): Promise<PatchNote[]> {
  if (!fs.existsSync(NOTES_DIR)) return [];

  const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith(".md"));

  const notes = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const version = String(data.version ?? file.replace(/\.md$/, ""));

      const processed = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(content);

      return {
        version,
        date: String(data.date ?? ""),
        title: String(data.title ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        anchor: toAnchor(version),
        html: String(processed),
      };
    }),
  );

  return notes.sort((a, b) => compareVersions(a.version, b.version));
}

/** Date de la dernière mise à jour publiée, pour le plan du site. */
export async function getLatestPatchDate(): Promise<string | null> {
  const notes = await getPatchNotes();
  return notes[0]?.date ?? null;
}
