"use client";

import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";
import { Percent } from "lucide-react";
import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { totalSuscribers } from "./TotalSuscribers.data";

export default function TotalSuscribers() {
  return (
    <div
      className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full 
    md:w-96 hover:shadow-lg transition"
    >
      <div className="flex gap-x-2 items-center mb-4">
        <CustomIcon icon={Percent} />
        <p className="text-xl">Total suscribers</p>
      </div>

      <div className="w-full h-[200px] p-5">
        <ResponsiveContainer aspect={1} maxHeight={200}>
          <PieChart>
            <Pie
              dataKey="value"
              data={totalSuscribers}
              outerRadius={80}
              labelLine={false}
            ></Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
