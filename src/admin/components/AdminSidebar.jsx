import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from '../../redux/authSlice';

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { name: "Users", path: "/admin/users", icon: Users },
];

function AdminSidebar() {

  const dispatch =useDispatch();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-60 bg-[#292824] text-[#f7f2ea]">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <h1 className="text-xl tracking-[3px]">BLUME</h1>
      </div>

      <nav className="flex h-[calc(100%-4rem)] flex-col space-y-1 p-3">
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

  <div className="mt-auto border-t border-white/10 pt-3">
    <button
      onClick={() => {
        dispatch(logout());
        localStorage.removeItem("userId");
      }}
      className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm text-[#d5d0c7] transition hover:bg-red-500/10 hover:text-red-300"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  </div>
</nav>
    </aside>
  );
}

export default AdminSidebar;