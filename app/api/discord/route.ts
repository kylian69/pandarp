import { NextResponse } from "next/server";
import { getDiscordStatus } from "@/lib/live";

export async function GET() {
  const status = await getDiscordStatus();
  return NextResponse.json(status, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
