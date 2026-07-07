import { queryOne } from "@/lib/db";
import type { Company } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const company = await queryOne<Company>(
      `INSERT INTO "Company" ("userId", name, description, "profileImage", cif, phone, country, website)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        userId,
        data.name,
        data.description ?? null,
        data.profileImage,
        data.cif,
        data.phone,
        data.country,
        data.website,
      ]
    );

    return NextResponse.json(company);
  } catch (error) {
    console.log("[COMPANY]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
