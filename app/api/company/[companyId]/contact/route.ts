import { db } from "@/lib/db";
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

    const contacts = await db.contact.findMany({
      where: { companyId },
      orderBy: { createAt: "desc" },
    });

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

    const company = await db.company.findUnique({
      where: { id: companyId, userId },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    const contact = await db.contact.create({
      data: {
        companyId,
        ...data,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log("[CONTACT_POST]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
