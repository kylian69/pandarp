import { site } from "./site";

export type ServerStatus = {
  /** `unconfigured` tant que le code cfx.re n'est pas renseigné. */
  state: "online" | "offline" | "unconfigured";
  players: number;
  maxPlayers: number;
};

export type DiscordStatus = {
  state: "online" | "offline" | "unconfigured";
  membersOnline: number;
};

/**
 * Interroge l'annuaire FiveM côté serveur. Passer par le serveur évite le CORS
 * et permet de mutualiser une réponse en cache entre tous les visiteurs.
 */
export async function getServerStatus(): Promise<ServerStatus> {
  if (!site.cfxId) {
    return { state: "unconfigured", players: 0, maxPlayers: 0 };
  }

  try {
    const res = await fetch(
      `https://servers-frontend.fivem.net/api/servers/single/${site.cfxId}`,
      { next: { revalidate: 60 }, headers: { "User-Agent": "PandaRP-Website" } },
    );
    if (!res.ok) throw new Error(`FiveM a répondu ${res.status}`);

    const body = (await res.json()) as {
      Data?: { clients?: number; sv_maxclients?: number; svMaxclients?: number };
    };
    const data = body.Data;
    if (!data) throw new Error("Réponse FiveM sans données");

    return {
      state: "online",
      players: data.clients ?? 0,
      maxPlayers: data.sv_maxclients ?? data.svMaxclients ?? 0,
    };
  } catch {
    return { state: "offline", players: 0, maxPlayers: 0 };
  }
}

/**
 * Nombre de membres connectés au Discord. Nécessite que le widget soit activé
 * dans Paramètres du serveur > Widget.
 */
export async function getDiscordStatus(): Promise<DiscordStatus> {
  if (!site.discordGuildId) {
    return { state: "unconfigured", membersOnline: 0 };
  }

  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${site.discordGuildId}/widget.json`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) throw new Error(`Discord a répondu ${res.status}`);

    const body = (await res.json()) as { presence_count?: number };
    return { state: "online", membersOnline: body.presence_count ?? 0 };
  } catch {
    return { state: "offline", membersOnline: 0 };
  }
}
