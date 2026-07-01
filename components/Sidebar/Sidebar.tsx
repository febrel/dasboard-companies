import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";
import Logo from "../Logo/Logo";

export default function Sidebar() {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col border">
        <Logo />
        <SidebarRoutes />
      </div>
    </div>
  );
}
