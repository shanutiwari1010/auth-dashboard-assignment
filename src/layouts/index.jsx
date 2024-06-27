import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <div className="hidden w-72 flex-col bg-muted md:flex">
        {/* Sidebar here */}
      </div>
      <main className="flex flex-1 flex-col max-w-screen-2xl mx-auto overflow-y-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
