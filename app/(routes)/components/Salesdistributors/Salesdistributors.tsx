import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { BarChart } from "lucide-react";
import GraphicSucribers from "../GraphicSucribers/GraphicSucribers";

export default function Salesdistributors() {
  return (
    <div className="shadow-sm bg-background rounded-lg p-5">
      <div className="flex gap-x-2 items-center">
        <CustomIcon icon={BarChart} />
        <p className="text-xl">Sales distribution</p>
      </div>
      <GraphicSucribers />
    </div>
  );
}
