import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <div className="hidden w-72 flex-col bg-muted md:flex">
        <Sidebar />
      </div>
      <main className="flex flex-1 flex-col max-w-screen-2xl mx-auto overflow-y-auto py-2">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
