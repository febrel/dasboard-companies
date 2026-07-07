import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { query } from "@/lib/db";
import type { Company, Event } from "@/lib/types";
import CompaniesChart from "./CompaniesChart";

export default async function PageAnalytics() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const companies = await query<Company>(
    `SELECT * FROM "Company" WHERE "userId" = $1 ORDER BY "createAt" DESC`,
    [userId]
  );

  const companiesIds = companies.map((c) => c.id);

  const events = await query<Event>(
    `SELECT * FROM "Event" WHERE "companyId" = ANY($1::text[]) ORDER BY "createAt" DESC`,
    [companiesIds]
  );

  return (
    <div className="p-4 rounded-lg shadow-md bg-background">
      <h2 className="mb-4 text-2xl">Analytics page</h2>

      <div>
        <CompaniesChart companies={companies} events={events} />
      </div>
    </div>
  );
}
