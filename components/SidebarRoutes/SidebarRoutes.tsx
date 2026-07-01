"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SidebarItem from "../SidebarItem/SidebarItem";
import {
  dataGeneralSidebar,
  dataSupportSidebar,
  dataToolsSidebar,
} from "./SidebarRoutes.data";

export default function SidebarRoutes() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-3 md:p-6">
          <p>GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />

        <div className="p-2 md:p-6">
          <p>TOOLS</p>
          {dataToolsSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />

        <div className="p-2 md:p-6">
          <p>SUPPORT</p>
          {dataSupportSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <div>
          <div className="text-center p-6">
            <Button variant="outline" className="w-full">
              Upgrade Plan
            </Button>
          </div>

          <Separator />

          <footer className="mt-3 p-3 text-center">
            {currentYear}. All rights reserved
          </footer>

          <div></div>
        </div>
      </div>
    </div>
  );
}
