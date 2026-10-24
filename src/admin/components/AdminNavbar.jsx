import { Bell, Menu, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminNavbar({ onToggleSidebar }) {
  const user =useSelector((state)=>state.auth.user)
  const navigate =useNavigate();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#e8e1d7] bg-[#fbf8f2] px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="rounded-md p-2 text-[#454139] hover:bg-[#eee7dc]"
        aria-label="Toggle sidebar"
      >
        <Menu size={21} />
      </button>

      <div className="flex items-center gap-2 pr-5">
       

       
          <span className="flex h-9 w-7 items-center justify-center rounded-full bg-[#e4d5c0]">
            {user?.name[0]}
          </span>
          <span>{user?.name}</span>
         
       
      </div>
    </header>
  );
}

export default AdminNavbar;