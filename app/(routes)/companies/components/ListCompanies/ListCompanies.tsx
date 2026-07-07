import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { query } from "@/lib/db";
import type { Company } from "@/lib/types";
import { CustomerTable } from "@/app/(routes)/components/LastCustomers/CustomerTable";
import { columns } from "./Columns";

export default async function ListCompanies() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const companies = await query<Company>(
    `SELECT * FROM "Company" WHERE "userId" = $1 ORDER BY "createAt" DESC`,
    [userId]
  );

  return (
    <div className="p-4">
      <CustomerTable
        columns={columns}
        data={companies}
        placeholder="Search companies..."
        pageSize={5}
      />
    </div>
  );
}
