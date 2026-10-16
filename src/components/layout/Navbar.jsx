
import { Link } from "react-router-dom";
import { UserRound, ShoppingBag, Heart } from "lucide-react";

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 z-50 w-full border-b border-white/30 bg-blue-500 text-white">
      <div className="flex h-20 items-center justify-between px-6 md:px-12">

        {/* Brand */}
        <Link to="/" className="text-xl">
          Blume
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/shop">Shop</Link>
          <Link to="/">Categories</Link>
          <Link to="/">About Us</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Link to="/" aria-label="Profile">
            <UserRound size={24} />
          </Link>

          <Link to="/wishlist" aria-label="Wishlist">
            <Heart size={24} />
          </Link>

          <Link to="/cart" aria-label="Cart">
            <ShoppingBag size={24} />
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
