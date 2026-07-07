import { queryOne } from "@/lib/db";
import type { Company } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { userId } = await auth();
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

    if (company.profileImage) {
      const fileKey = company.profileImage.split("/").pop();
      if (fileKey) {
        const utapi = new UTApi();
        await utapi.deleteFiles(fileKey);
      }
    }

    await queryOne(
      `DELETE FROM "Company" WHERE id = $1 AND "userId" = $2`,
      [companyId, userId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[COMPANY_DELETE]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const allowedFields = [
      "name",
      "description",
      "profileImage",
      "cif",
      "phone",
      "country",
      "website",
    ];

    const setClauses: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        setClauses.push(`"${field}" = $${paramIndex}`);
        values.push(data[field]);
        paramIndex++;
      }
    }

    if (setClauses.length === 0) {
      return new NextResponse("No valid fields to update", { status: 400 });
    }

    values.push(companyId, userId);
    const sql = `UPDATE "Company" SET ${setClauses.join(", ")} WHERE id = $${paramIndex} AND "userId" = $${paramIndex + 1} RETURNING *`;

    const company = await queryOne<Company>(sql, values);

    return NextResponse.json(company);
  } catch (error) {
    console.log("[COMPANY_PATCH]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
