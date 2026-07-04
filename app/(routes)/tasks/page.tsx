import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Calendars from "./components/Calendars/Calendars";

export default async function TaskPage() {
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

  const companiesIds = companies.map((c) => c.id);

  const events = await db.event.findMany({
    where: {
      companyId: { in: companiesIds },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <div>
      <Calendars companies={companies} events={events} />
    </div>
  );
}
