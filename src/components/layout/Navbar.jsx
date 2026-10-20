
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, ShoppingBag, Heart, UserRound } from "lucide-react";
import ProfileSidebar from "../Profile";

function Navbar() {
  const navigate =useNavigate();
  const [isProfileOpen,setIsProfileOpen]=useState(false)
  const handleProfileClick =()=>{
    if(!user){
      navigate("/login")
      return;
    }
    setIsProfileOpen(true)
  }

  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="absolute inset-x-0 top-0 z-50 border-b border-black/15 text-stone-900">
      <div className="mx-auto flex h-20 items-center justify-between px-5 md:px-10 lg:px-[4.5%]">

        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-medium tracking-[0.32em] md:text-2xl"
        >
          BLUME
        </Link>

        {/* Center navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-50"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-50"
          >
            Discover
          </Link>
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-50"
          >
            Our Story
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 md:gap-6">


          <span className="hidden h-7 w-px bg-black/20 sm:block" />

          <button
            onClick={handleProfileClick}
            aria-label="Open profile menu"
            className="hidden sm:block"
          >
            <UserRound size={19} strokeWidth={1.3} />
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="hidden sm:block"
          >
            <Heart size={19} strokeWidth={1.3} />
          </Link>


          <Link
            to="/cart"
            className="flex items-center gap-2"
            aria-label="Shopping bag"
          >

            <ShoppingBag size={20} strokeWidth={1.3} />
          </Link>
        </div>
      </div>
      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={() => {
          console.log("Logout will be connected next");
        }}
      />
    </nav>
  );
}

export default Navbar;
