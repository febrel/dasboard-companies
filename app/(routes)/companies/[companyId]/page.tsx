import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FormEditCompany from "../components/FormEditCompany/FormEditCompany";

export default async function CompanyIdPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const { userId } = await auth();

  if (!userId) redirect("/");

  const company = await db.company.findUnique({
    where: { id: companyId, userId },
  });

  if (!company) redirect("/companies");

  return (
    <div className="p-6">
      <FormEditCompany company={company} />
      <div>Company Information</div>
      <div>Footer company</div>
    </div>
  );
}
