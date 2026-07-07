import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import type { Company, Event } from "@/lib/types";
import Calendars from "./components/Calendars/Calendars";

export default async function TaskPage() {
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
    <div>
      <Calendars companies={companies} events={events} />
    </div>
  );
}
