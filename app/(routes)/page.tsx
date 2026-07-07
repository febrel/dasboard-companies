import CardSummary from "./components/CardSummary/CardSummary";
import { BookOpen, BookOpenCheck, UserRound, Waypoints } from "lucide-react";
import LastCustomers from "./components/LastCustomers/LastCustomers";
import SalesDistributors from "./components/SalesDistributors/SalesDistributors";
import TotalSuscribers from "./components/TotalSuscribers/TotalSuscribers";
import ListIntegrations from "./components/ListIntegrations/ListIntegrations";

export const dataCardsSummary = [
  {
    icon: UserRound,
    total: "12.450",
    average: 15,
    title: "Compaines created",
    tooltipText: "See all of the companies created",
  },

  {
    icon: Waypoints,
    total: "86.5%",
    average: 80,
    title: "Total revenue",
    tooltipText: "See all of the summary",
  },

  {
    icon: BookOpen,
    total: "363,95$",
    average: 30,
    title: "Bounce rate",
    tooltipText: "See all of the bounce rate",
  },
];

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Dasboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        {dataCardsSummary.map(
          ({ icon, total, average, title, tooltipText }, index) => (
            <CardSummary
              key={index}
              icon={icon}
              total={total}
              average={average}
              title={title}
              tooltipText={tooltipText}
            />
          ),
        )}
      </div>

      <div className="grid grid-cols-1 mt-12 xl:grid-cols-2 md:gap-x-10">
        <LastCustomers />
        <SalesDistributors />
      </div>

      <div className="flex-col md:gap-x-10 xl:flex xl:flex-row gap-y-4 md:gap-y-0 mt-12 md:mb-10 justify-center">
        <TotalSuscribers />
        <ListIntegrations />
      </div>
    </div>
  );
}
