import { queryOne } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { userId } = await auth();
    const { eventId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await queryOne<{
      id: string;
      companyId: string;
      companyUserId: string;
    }>(
      `SELECT e.id, e."companyId", c."userId" AS "companyUserId"
       FROM "Event" e
       JOIN "Company" c ON c.id = e."companyId"
       WHERE e.id = $1`,
      [eventId]
    );

    if (!event || event.companyUserId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    await queryOne(`DELETE FROM "Event" WHERE id = $1`, [eventId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[EVENT_DELETE]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
