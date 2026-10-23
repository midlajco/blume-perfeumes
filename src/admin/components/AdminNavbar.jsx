import { Bell, Menu, ChevronDown } from "lucide-react";

function AdminNavbar({ onToggleSidebar }) {
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

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="text-[#454139] hover:text-black"
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 text-sm text-[#292824]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4d5c0]">
            A
          </span>
          <span>Admin</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;