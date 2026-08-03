"use client";

import { useEffect, useState } from "react";
import type { DiscordStatus, ServerStatus } from "@/lib/live";

type Props = {
  initialServer: ServerStatus;
  initialDiscord: DiscordStatus;
  /** `ink` sur fond sombre, `paper` sur fond clair. */
  tone?: "ink" | "paper";
};

/**
 * Télémétrie du serveur, traitée comme un instrument plutôt que comme une
 * statistique décorative. Les valeurs initiales viennent du rendu serveur —
 * elles sont donc dans le HTML — puis se rafraîchissent en arrière-plan.
 */
export default function LivePanel({
  initialServer,
  initialDiscord,
  tone = "ink",
}: Props) {
  const [server, setServer] = useState(initialServer);
  const [discord, setDiscord] = useState(initialDiscord);

  useEffect(() => {
    // Rien à rafraîchir tant que les identifiants ne sont pas configurés.
    if (initialServer.state === "unconfigured") return;

    const refresh = async () => {
      try {
        const [s, d] = await Promise.all([
          fetch("/api/server-status").then((r) => r.json()),
          fetch("/api/discord").then((r) => r.json()),
        ]);
        setServer(s);
        setDiscord(d);
      } catch {
        // Une actualisation ratée laisse simplement la dernière valeur connue.
      }
    };

    const id = setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, [initialServer.state]);

  const onDark = tone === "ink";
  const label = onDark ? "text-paper/45" : "text-smoke";
  const value = onDark ? "text-paper" : "text-ink";
  const rule = onDark ? "border-paper/15" : "border-haze";

  return (
    <dl className={`font-mono border-t ${rule}`}>
      <Row rule={rule}>
        <dt className={`eyebrow ${label}`}>Serveur</dt>
        <dd className={`flex items-center gap-2 text-sm tabular-nums ${value}`}>
          {server.state === "online" ? (
            <>
              <Dot online />
              <span>
                <strong className="font-semibold">{server.players}</strong>
                <span className={label}> / {server.maxPlayers}</span>
              </span>
              <span className={`text-xs ${label}`}>joueurs</span>
            </>
          ) : (
            <>
              <Dot />
              <span className={`text-xs ${label}`}>
                {server.state === "unconfigured"
                  ? "ouverture imminente"
                  : "hors ligne"}
              </span>
            </>
          )}
        </dd>
      </Row>

      <Row rule={rule}>
        <dt className={`eyebrow ${label}`}>Discord</dt>
        <dd className={`flex items-center gap-2 text-sm tabular-nums ${value}`}>
          {discord.state === "online" ? (
            <>
              <Dot online />
              <strong className="font-semibold">{discord.membersOnline}</strong>
              <span className={`text-xs ${label}`}>connectés</span>
            </>
          ) : (
            <>
              <Dot />
              <span className={`text-xs ${label}`}>
                {discord.state === "unconfigured" ? "bientôt" : "indisponible"}
              </span>
            </>
          )}
        </dd>
      </Row>

      <Row rule={rule}>
        <dt className={`eyebrow ${label}`}>Build</dt>
        <dd className={`text-sm ${value}`}>
          <span className="font-semibold">Enhanced</span>
          <span className={`text-xs ${label}`}> — GTA V remasterisé</span>
        </dd>
      </Row>

      <Row rule={rule}>
        <dt className={`eyebrow ${label}`}>Accès</dt>
        <dd className={`text-sm ${value}`}>
          <span className="font-semibold">Libre</span>
          <span className={`text-xs ${label}`}> — sans whitelist</span>
        </dd>
      </Row>

      <Row rule={rule} last>
        <dt className={`eyebrow ${label}`}>Langue</dt>
        <dd className={`text-sm ${value}`}>
          <span className="font-semibold">Français</span>
        </dd>
      </Row>
    </dl>
  );
}

function Row({
  children,
  rule,
  last = false,
}: {
  children: React.ReactNode;
  rule: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${
        last ? "" : `border-b ${rule}`
      }`}
    >
      {children}
    </div>
  );
}

function Dot({ online = false }: { online?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
        online ? "bg-bamboo" : "bg-smoke"
      }`}
      style={
        online
          ? { boxShadow: "0 0 0 3px color-mix(in srgb, #2F6B4F 25%, transparent)" }
          : undefined
      }
    />
  );
}
