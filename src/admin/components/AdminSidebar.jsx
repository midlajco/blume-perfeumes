import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { name: "Users", path: "/admin/users", icon: Users },
];

function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-60 bg-[#292824] text-[#f7f2ea]">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <h1 className="text-xl tracking-[3px]">BLUME</h1>
      </div>

      <nav className="space-y-1 p-3">
        {navItems.map(({ name, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-[#e4d5c0] text-[#292824]"
                  : "text-[#d5d0c7] hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;