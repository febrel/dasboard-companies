import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";
import { Input } from "@base-ui/react";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";
import { ToggleTheme } from "../ToggleTheme/ToggleTheme";

export default function Navbar() {
  return (
    <div className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>

      <div className="relative  p-2">
        <Input placeholder="Search" className="rounded-lg border-2 p-1" />

        <Search strokeWidth={0.5} className="absolute top-3 right-4" />
      </div>

      <div className="flex gap-x-2 items-center">
        <p>ToogleTheme</p>
        <ToggleTheme />
        <UserButton />
      </div>
    </div>
  );
}
