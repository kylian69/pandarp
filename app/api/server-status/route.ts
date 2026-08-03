import { NextResponse } from "next/server";
import { getServerStatus } from "@/lib/live";

/** Consommé par le composant client qui rafraîchit le compteur de joueurs. */
export async function GET() {
  const status = await getServerStatus();
  return NextResponse.json(status, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}
