import { queryOne } from "@/lib/db";
import type { Company } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FormEditCompany from "../components/FormEditCompany/FormEditCompany";
import ButtonDeleteCompany from "../components/ButtonDeleteCompany/ButtonDeleteCompany";

export default async function CompanyIdPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const { userId } = await auth();

  if (!userId) redirect("/");

  const company = await queryOne<Company>(
    `SELECT * FROM "Company" WHERE id = $1 AND "userId" = $2`,
    [companyId, userId]
  );

  if (!company) redirect("/companies");

  return (
    <div className="p-4">
      <FormEditCompany company={company} />
      <div className="flex justify-end mt-4">
        <ButtonDeleteCompany companyId={company.id} />
      </div>
    </div>
  );
}
