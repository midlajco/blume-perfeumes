
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBag, Heart, UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProfileSidebar from "../Profile";
import { getCart } from "../../services/CartService";
import { getWishList } from "../../services/WishlistService";

function Navbar() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsProfileOpen(true);
  };

  const { data: cart } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user?.id,
  });

  const { data: wishlist } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishList(user.id),
    enabled: !!user?.id,
  });

  const cartCount = cart?.items?.length || 0;
  const wishlistCount = wishlist?.items?.length || 0;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/15 bg-[#151311] text-[#c5c0ba]">
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



          <Link to="/wishlist" className="relative hidden sm:block">
            <Heart size={19} strokeWidth={1.3} />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 z-50 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative flex items-center gap-2">
            <ShoppingBag size={20} strokeWidth={1.3} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 z-50 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>




          {/* <Link
            to="/cart"
            className="flex items-center gap-2"
            aria-label="Shopping bag"
          >

            <ShoppingBag size={20} strokeWidth={1.3} />
          </Link> */}
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
