import CardSummary from "./components/CardSummary/CardSummary";
import { BookOpen, BookOpenCheck, UserRound, Waypoints } from "lucide-react";

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
    </div>
  );
}
