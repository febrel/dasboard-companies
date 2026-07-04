import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title, companyId, start, allDay, timeFormat } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await db.event.create({
      data: {
        title,
        companyId,
        start: new Date(start),
        allDay: allDay ?? false,
        timeFormat: timeFormat ?? "12",
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.log("[EVENT_POST]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
