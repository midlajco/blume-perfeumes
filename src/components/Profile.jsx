
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  X,
  ShoppingBag,
  Heart,
  MapPin,
  UserRound,
  LogOut,
  Box,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { toast } from "sonner";


function ProfileSidebar({ isOpen, onClose, user, }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!isOpen) return null;




  const items = [
    { name: "My Orders", icon: Box, path: "/orders" },
    { name: "Wishlist", icon: Heart, path: "/wishlist" },

    { name: "Cart", icon: ShoppingBag, path: "/cart" },
  ];

  // const handleLogout = () => {
  //   const confirmLogout = window.confirm(
  //     "Are you sure you want to logout?"
  //   );

  //   if (confirmLogout) {
  //     dispatch(logout());
  //     localStorage.removeItem("userId")
  //     onClose();
  //     navigate("/")
  //   }
  // }

  
const handleLogout = () => {
  toast("Are you sure you want to logout?", {
    action: {
      label: "Logout",
      onClick: () => {
        dispatch(logout());
        localStorage.removeItem("userId");
        onClose();
        navigate("/");
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
    duration: 5000,
  });
};


  return (
    <div className="fixed inset-0 z-[100]">
      {/* Background overlay */}
      <button
        onClick={onClose}
        aria-label="Close profile sidebar"
        className="absolute inset-0 h-full w-full bg-black/50"
      />

      {/* Sidebar panel */}
      <aside className="absolute right-0 top-0 h-full w-64 max-w-[90vw] bg-[#faf6ef] p-4 text-stone-900">
        <div className="flex items-center justify-between">
          <h2 className="font-serif tracking-[0.2em]">BLUME</h2>

          <button onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.3} />
          </button>
        </div>

        {/* User information */}
        <div className="mt-6 border-b border-stone-200 pb-4">
          <p className="text-xs text-stone-500">Hello,</p>
          <h3 className="font-serif text-xl">
            {user?.name || "Guest"}
          </h3>
          <p className="text-xs text-stone-500">
            {user?.email || ""}
          </p>
        </div>

        {/* Navigation links */}
        <nav className="mt-3">
          {items.map(({ name, icon: Icon, path }, index) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`flex h-10 items-center gap-3 px-2 text-xs hover:bg-[#eee5d9] ${index === 0 ? "bg-[#eee5d9]" : ""
                }`}
            >
              <Icon size={15} strokeWidth={1.4} />
              <span className="flex-1">{name}</span>
              <span>→</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-2 border-t border-stone-200 pt-2">
          <button
            onClick={handleLogout}
            className="flex h-10 w-full items-center gap-3 px-2 text-xs hover:bg-[#eee5d9]"
          >
            <LogOut size={15} strokeWidth={1.4} />
            <span className="flex-1 text-left">Logout</span>
            <span>→</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

export default ProfileSidebar;
