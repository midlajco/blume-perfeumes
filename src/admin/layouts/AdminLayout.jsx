import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f7f2ea]">
      {sidebarOpen && <AdminSidebar />}

      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-0"
        }`}
      >
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />

        <main className="min-h-[calc(100vh-4rem)] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;