import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSideBar />

      <div className="admin-main">
        <AdminNavbar />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;