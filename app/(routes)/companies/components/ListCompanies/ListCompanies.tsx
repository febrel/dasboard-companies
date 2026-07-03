import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { CustomerTable } from "@/app/(routes)/components/LastCustomers/CustomerTable";
import { columns } from "./Columns";

export default async function ListCompanies() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: {
      userId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

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
