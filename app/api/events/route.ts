import { queryOne } from "@/lib/db";
import type { Event } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title, companyId, start, allDay, timeFormat } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await queryOne<Event>(
      `INSERT INTO "Event" (title, "companyId", "start", "allDay", "timeFormat")
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, companyId, new Date(start), allDay ?? false, timeFormat ?? "12"]
    );

    return NextResponse.json(event);
  } catch (error) {
    console.log("[EVENT_POST]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
