import { query, queryOne } from "@/lib/db";
import type { Company, Contact } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { userId } = await auth();
    const { companyId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const contacts = await query<Contact>(
      `SELECT * FROM "Contact" WHERE "companyId" = $1 ORDER BY "createAt" DESC`,
      [companyId]
    );

    return NextResponse.json(contacts);
  } catch (error) {
    console.log("[CONTACT_GET]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { userId } = await auth();
    const data = await req.json();
    const { companyId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const company = await queryOne<Company>(
      `SELECT * FROM "Company" WHERE id = $1 AND "userId" = $2`,
      [companyId, userId]
    );

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    const contact = await queryOne<Contact>(
      `INSERT INTO "Contact" ("companyId", name, role, email, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [companyId, data.name, data.role, data.email, data.phone]
    );

    return NextResponse.json(contact);
  } catch (error) {
    console.log("[CONTACT_POST]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
